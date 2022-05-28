import db from './../database/db.js'
import dayjs from 'dayjs';

export async function validateBody (req,res,next){
  try {
    
    const { name, phone, cpf, birthday } = req.body;

    const checkDate = new RegExp (/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/);
    const checkCpf = new RegExp(/^(\d{11})$/)
    const checkPhone = new RegExp(/^(\d{10})|(\d{11})$/)

    if ( typeof(name)!=='string' || name?.trim() === '' ) return res.sendStatus(400);
    if ( !(typeof(cpf)==='string' && checkCpf.test(cpf)) ) return res.sendStatus(400);      
    if ( !(typeof(cpf)==='string' && checkPhone.test(phone)) ) return res.sendStatus(400);
    if ( !(typeof(birthday)==='string' && checkDate.test(birthday) && dayjs(birthday).format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD') ) )
       return res.sendStatus(400);
       
    const customers = await db.query('SELECT * FROM customers WHERE cpf = $1', [cpf] );
    if (customers.rowCount > 0) return res.sendStatus(409); 

    next(); 
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
} 

export async function validateId (req,res,next){
  try {   
    const { id } = req.params;
    if (typeof(id)!=='string' || id?.trim() === '' ) return res.sendStatus(400); 
    next(); 
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
} 