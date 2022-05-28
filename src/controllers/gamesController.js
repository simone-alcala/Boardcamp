import db from './../database/db.js'

export async function addGame(req,res){
  try {
    const { name,image,stockTotal,categoryId,pricePerDay } = req.body;
    await db.query(
      `INSERT INTO games (name,image,"stockTotal","categoryId","pricePerDay") 
       VALUES ($1,$2,$3,$4,$5)`, [name,image,stockTotal,categoryId,pricePerDay] 
    );
    res.sendStatus(201);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }
}

export async function getGames(req,res){ 
  try {
    let query = req.query.name;
    if ( typeof(query) === 'string' ) query = query.toUpperCase();
    else  query = '';
    
    const games = await db.query(`
      SELECT games.*, categories.name as "categoryName"
      FROM games
      JOIN categories ON games."categoryId" = categories.id 
      WHERE UPPER(games.name) LIKE $1 `,[query+'%']
    );

    res.status(200).send(games.rows);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  } 

}