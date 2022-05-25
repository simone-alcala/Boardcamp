import connection from './../database/db.js'

export async function validateNewCategory (req,res,next){
  try {
    const { name } = req.body;

    if ( typeof(name)!=='string' || name.trim() === '' ) return res.sendStatus(400);

    const categories = await connection.query(
      'SELECT id, name FROM categories WHERE name = $1', [name.toUpperCase()]
    );

    if (categories.rowCount > 0) return res.sendStatus(409);

    res.locals.newCategory =  name.toUpperCase();
    next();

  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}