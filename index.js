var express = require('express');
var cors = require('cors');
var storage = require('node-persist');
var bodyParser = require('body-parser');
var app = express();
app.use(cors());
const PORT = 8080;
// storage.init();

app.get('/task', async(req,res) => {
    return res.send(await storage.values()); 
})

const jsonParser = bodyParser.json();

app.post('/task',jsonParser, async(req,res) => {
    const {task_id, task_name} = req.body;
    await storage.setItem(task_id, task_name);
    
    res.send('Task added successfully')
    
})

async function init(){
    await storage.init();
    await storage.clear();
} 

app.listen(PORT, ()=>{
    console.log(`Server started on port: ${PORT}`);
    init();
})