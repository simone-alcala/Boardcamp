import db from './../database/db.js'

export async function validateNewRental (req,res,next){
  try {
    const { customerId,gameId,daysRented } = req.body;

    if ( isNaN(daysRented) || !(daysRented > 0) ) return res.sendStatus(400);

    const customer = await db.query('SELECT id FROM customers WHERE id = $1', [customerId]  );
    if (customer.rowCount === 0) return res.sendStatus(400); 
    
    const game = await db.query('SELECT id,"stockTotal","pricePerDay" FROM games WHERE id = $1', [gameId]  );
    if (game.rowCount === 0) return res.sendStatus(400); 
    
    const rentals = await db.query(` SELECT count(rentals.id) AS qtd FROM rentals WHERE "gameId" = $1`, [gameId]  );
    
    const qtd = game.rows[0].stockTotal - rentals.rows[0].qtd;
    
    if (qtd < 0) return res.sendStatus(400); 
    
    const rental = { customerId,gameId,daysRented: Number.parseInt(daysRented) };
    
    res.locals.game = game.rows[0];
    res.locals.rental = rental;

    next(); 
 
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
} 

export async function validateQueryRental (req,res,next){
  try {
    const { customerId } = req.query;
    const { gameId } = req.query;

    const checkExp = new RegExp(/^(\d)$/);

    if ( typeof(customerId)==='string' && checkExp.test(customerId)) 
      res.locals.customerId = Number.parseInt(customerId);

    if ( typeof(gameId)==='string' && checkExp.test(gameId)) 
      res.locals.gameId = Number.parseInt(gameId);   
 
    next(); 
 
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
} 

export async function validateIdRental (req,res,next){
  try {
    const { id } = req.params;
    const checkExp = new RegExp(/^(\d)$/);
    
    if ( typeof(id)==='string' && !checkExp.test(id)) return res.sendStatus(400); 
    
    
    const rental = await db.query('SELECT * FROM rentals where id = $1',[id]);
    
    if (rental.rowCount === 0 ) return res.sendStatus(404); 

    if (rental.rows[0].returnDate !== null) return res.sendStatus(400); 

    next(); 
 
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
} 

