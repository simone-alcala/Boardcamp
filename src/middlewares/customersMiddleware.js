import connection from './../database/db.js'
import dayjs from 'dayjs';

export async function validateBody (req,res,next){
  try {
    
    const { name, phone, cpf, birthday } = req.body;

    const checkDate = new RegExp (/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/);

    if ( typeof(name)!=='string' || name.trim() === '' ) 
      return res.sendStatus(400);

    if ( !(typeof(cpf)==='string' && cpf.length === 11 && isFinite(cpf)) ) 
      return res.sendStatus(400);
      
    if ( !(typeof(phone)==='string' && (phone.length === 10 || phone.length === 11)) ) 
      return res.sendStatus(400);

    if ( !(typeof(birthday) === 'string' && checkDate.test(birthday) && 
          dayjs(birthday).format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD') ) )
       return res.sendStatus(400);
       
    const customers = await connection.query(
      'SELECT * FROM customers WHERE cpf = $1', [cpf]
    );
    
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