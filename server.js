// load package
const express = require('express');
const mysql = require('mysql');
const bodyParser = require("body-parser");
const cors = require('cors');

const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();
app.use(cors());
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database Connection
const connection = mysql.createConnection({
    // host: '0.0.0.0'/localhost: Used to  locally run app
    host: "mysql1",
    user: "root",
    password: "admin"
  });

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
  }); 

//Creates a database called employeedb and a table called employeetable.
// The employeetable has 3 columns: id, username, and email.
// The id column is the primary key and is auto-incremented.
// The username and email columns are both varchar(100) and cannot be null.
app.get('/init', (req, res) => {
    connection.query(`CREATE DATABASE IF NOT EXISTS employeedb1`,function (error,result) {
        if (error) console.log(error) });
    //Create Table
    connection.query(`USE employeedb1`,function (error, results) {
        if (error) console.log(error);
    });
    connection.query(`CREATE TABLE IF NOT EXISTS employeeinfo 
    ( id int unsigned NOT NULL auto_increment, 
    name varchar(100)NOT NULL,
    department varchar(100) NOT NULL,
    PRIMARY KEY (id))`, function (error,result) {
        if (error) console.log(error)});
        res.send('Database and Table created!')
}); 

//Insert into Table
// Adds a new employee to the database.
app.post('/addemployee', (req,res) => {
    var name = req.body.name;
    var department = req.body.department;
    var query = `INSERT INTO employeeinfo (name, department) VALUES ("${name}", "${department}")`;
    connection.query(query, function (error,result) {
        if (error) console.log(error);
        res.send('New employee inserted');
    });
});

//Get all employees
//A GET request that returns all the employees in the employeetable.
app.get('/getemployees', (req, res) => {
    const sqlQuery = 'SELECT * FROM employeeinfo';
    connection.query(sqlQuery, function (error,result) {
        if (error) console.log(error);
        res.json({ 'employees': result});
    });
});

//Get employee by id
//A get request that takes in an id and returns the employee with that id.
app.get('/getemployee/:id', function (req, res) {
    connection.query('SELECT * FROM employeeinfo WHERE id=?',
    [req.params.id], function (error, result, fields) {
       if (error) throw error;
       res.json({ 'employees': result});
       //res.end(JSON.stringify(result));
     });
 });

 //Update employee
 app.put('/update/employee/:id', (req, res) => {
    var name = req.body.name;
    var department = req.body.department;
    const id = req.params.id;
    const sql = 'UPDATE employeeinfo SET name=?, department=? WHERE id=?';
    connection.query(sql, [name, department, id], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
//Delete employee
app.delete('/delete/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM employeeinfo WHERE id=?';
    connection.query(sql, [id], (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });  

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);