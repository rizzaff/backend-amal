//env
require('dotenv/config')

const mysql = require('mysql');

const con = mysql.createConnection({
  // host : process.env.DB_HOST || 'localhost',
  // user : process.env.DB_USER || 'root',
  // password : process.env.DB_PASSWORD || '',
  // database : process.env.DB_NAME || 'amal'
  
  //deploy
  host : 'sql12.freemysqlhosting.net',
  user : 'sql12326266',
  password : 'jYEkivAZW3',
  database : 'sql12326266'

  //local
  // host : 'localhost',
  // user : 'root',
  // password : '',
  // database : 'amal3'
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;
