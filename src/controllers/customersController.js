import dayjs from 'dayjs';

import db from './../database/db.js'

export async function addCustomer(req,res){
  try {
    const { name,phone,cpf,birthday } = req.body;
    await db.query(
      `INSERT INTO customers (name,phone,cpf,birthday) 
       VALUES ($1,$2,$3,$4)`, [name,phone,cpf,birthday] 
    );
    res.sendStatus(201);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }
}

export async function getCustomers(req,res){ 
  try {
    let query = req.query.cpf;

    if ( typeof(query) !== 'string' ) query = '' ;
    
    const customers = await db.query(`
      SELECT id, name,phone,cpf, to_char(birthday, 'YYYY-MM-DD') AS birthday FROM customers
      WHERE cpf LIKE $1 `,[query+'%']
    );

    res.status(200).send(customers.rows);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  } 
}

export async function getCustomerById(req,res){ 
  try {
    const { id } = req.params;
    
    const customer = await db.query(`
      SELECT id, name,phone,cpf, to_char(birthday, 'YYYY-MM-DD') AS birthday FROM customers
      WHERE id = $1 `, [Number.parseInt(id)]
    );

    if (customer.rowCount === 0) return res.sendStatus(404);

    res.status(200).send(customer.rows[0]);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  } 

}

export async function updateCustomer(req,res){
  try {
    const { name,phone,cpf,birthday } = req.body;
    const { id } = req.params;

    await db.query(
      `UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 
       WHERE id = $5`, [name,phone,cpf,birthday,Number.parseInt(id)] 
    );

    res.sendStatus(200);
  } catch (e) {
    console.log (e);
    res.sendStatus(500);
  }
}