import dayjs from 'dayjs';

import db from './../database/db.js'

export async function addRental(req,res){
  try {

    const { customerId,gameId,daysRented } = res.locals.rental;

    const rentDate = dayjs().format('YYYY-MM-DD');
    const originalPrice = res.locals.game.pricePerDay * daysRented ;

   await db.query(
      `INSERT INTO rentals ("customerId","gameId","daysRented","rentDate","originalPrice") 
       VALUES ($1,$2,$3,$4,$5)`, [customerId,gameId,daysRented,rentDate,originalPrice] 
    );

    res.sendStatus(201);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }
}

export async function getRentals(req,res){ 
  try {
 
    const { customerId } = res.locals;
    const { gameId } = res.locals;

    let queryRentals = `
      SELECT id,"customerId","gameId",to_char("rentDate",'YYYY-MM-DD') AS "rentDate","daysRented",
      to_char("returnDate",'YYYY-MM-DD') AS "returnDate","originalPrice","delayFee" 
      FROM rentals WHERE 1=1 `;

    if ( !isNaN(gameId)) queryRentals += ` AND "gameId"=${gameId} `;
    if ( !isNaN(customerId)) queryRentals += ` AND "customerId"=${customerId} `;
    
    const queryGames = `
      SELECT games.id,games.name,"categoryId",categories.name AS "categoryName" 
      FROM games JOIN categories ON games."categoryId" = categories.id` ;
    
    const  queryCustomers = `SELECT id,name FROM customers `;
    
    const rentals = await db.query(queryRentals);
    const games = await db.query(queryGames);
    const customers =  await db.query(queryCustomers); 

    const returnRentals = rentals.rows.map(rental => ( {
      ...rental,
      customer: customers.rows.find(customer => customer.id === rental.customerId),
      game: games.rows.find(game => game.id === rental.gameId)
    }));

    res.status(200).send(returnRentals);
    
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  } 
}

export async function endRental(req,res){
  try {

    const { id } = req.params;
    
    const rental = await db.query( `SELECT * FROM rentals WHERE id = $1`,[id] );

    const rentDate   = dayjs(rental.rows[0].rentDate).format('YYYY-MM-DD');
    const returnDate = dayjs().format('YYYY-MM-DD');

    const diffInDays = ( (new Date(returnDate) - new Date(rentDate) ) / (1000 * 60 * 60 * 24) ) - rental.rows[0].daysRented;

    let delayFee = 0;

    if ( diffInDays > 0) delayFee = diffInDays * rental.rows[0].originalPrice;

    await db.query(`UPDATE rentals 
      SET "returnDate" = $1 , "delayFee" = $2 WHERE id = $3 `,
      [returnDate,delayFee,id]);
    
    res.sendStatus(200);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }
}

export async function deleteRental(req,res){
  try {
    const { id } = req.params;
    await db.query( `DELETE FROM rentals WHERE id = $1`,[id] );
    res.sendStatus(200);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }
}
