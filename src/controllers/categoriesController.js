import db from './../database/db.js'

export async function addCategory(req,res){
  try {
    const { name } = req.body;
    await db.query(
      'INSERT INTO categories (name) VALUES ($1)', [name] 
    );
    res.sendStatus(201);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }
}

export async function getCategories(req,res){ 
  try {
    const categories = await db.query(
      'SELECT * FROM categories'
    );
    res.status(200).send(categories.rows);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }

}