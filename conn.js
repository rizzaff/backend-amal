//env
require('dotenv/config')

const mysql = require('mysql');

const con = mysql.createConnection({
  // host : process.env.DB_HOST || 'localhost',
  // user : process.env.DB_USER || 'root',
  // password : process.env.DB_PASSWORD || '',
  // database : process.env.DB_NAME || 'amal'
  
  //deploy
  // host : 'sql12.freemysqlhosting.net',
  // user : 'sql12326992',
  // password : 'dZQTES4dHs',
  // database : 'sql12326992',
  // port : '3306'

    //deploy remotemysql
  host : 'remotemysql.com',
  user : 'mkDYOUXUH4',
  password : 'JOsnCvxivZ',
  database : 'mkDYOUXUH4',
  // port : '3306'

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
