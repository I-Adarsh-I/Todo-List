var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
const PORT = 8080;
const mysql = require('mysql');

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'todo'
})

conn.connect((err) => {
    if(err) throw err;
    console.log('Connected!');
})

app.get('/task', async(req,res) => {
    conn.query(`SELECT * FROM todo_list`, (err,result) => {
        if(err) throw err; 
        res.send(result);
    })
})

const jsonParser = bodyParser.json();

app.post('/task', jsonParser, async(req,res) => {
    const { task_name } = req.body;

    conn.query(`INSERT INTO todo_list
                SET Task_name = ? `, [task_name], (err, res) => {
                    if(err){
                        console.error(err);
                    }
                    console.log('result is: ', res);
                })
    
    res.send('Task added successfully')
    
})

app.delete('/task/:id', (req,res) => {
    const id = req.params.id
    conn.query("DELETE FROM todo_list WHERE Task_id =?",[id], (err,result) => {
        if(err){
            console.error(err)
        }
        return res.json('Task deleted successfully!')
    })
})

app.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT}`);
})