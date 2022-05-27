import connection from './../database/db.js'

export async function validateNewGame (req,res,next){
  try {
    const { name, stockTotal, pricePerDay, categoryId } = req.body;

    if ( typeof(name)!=='string' || name.trim() === '' ) return res.sendStatus(400);

    if ( isNaN(stockTotal) || !(stockTotal > 0) ) return res.sendStatus(400);

    if ( isNaN(pricePerDay) || !(pricePerDay > 0) ) return res.sendStatus(400);

    const category = await connection.query(
      'SELECT id FROM categories WHERE id = $1', [categoryId]
    );
    
    if (category.rowCount === 0) return res.sendStatus(400); 

    const games = await connection.query(
      'SELECT id, name FROM games WHERE UPPER(name) = $1', [name.toUpperCase()]
    );
    
    if (games.rowCount > 0) return res.sendStatus(409); 

    next(); 
 
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
} 