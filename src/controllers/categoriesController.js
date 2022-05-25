import connection from './../database/db.js'

export async function addCategory(req,res){
  try {
    const { newCategory } = res.locals;
    console.log(newCategory)
    await connection.query(
      'INSERT INTO categories (name) VALUES ($1)', [newCategory] 
    );
    res.sendStatus(201);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }
}

export async function getCategories(req,res){ 
  try {
    const categories = await connection.query(
      'SELECT id, name FROM categories'
    );
    res.status(200).send(categories.rows);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }

}