const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

app.use(cors());
app.use(express.json());

//Routes//
app.post('/todos', async (req, res) => {
    try{        
        const description = req.body.description;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        res.json(newTodo.rows[0]);
    }catch(e){
        console.log(`Nome: ${e.name} Erro: ${e.message}`);        
    }
})

app.get('/getalltodos', async(req, res) => {     
    try{          
        const getAllTodo = await pool.query("SELECT * FROM todo");
        res.json(getAllTodo.rows);
    }catch(e){
        console.log(`Nome: ${e.name} Erro: ${e.message}`);
    }
})

app.get('/getOneTodo/:id', async(req, res) => {     
    try{
        const id = req.params.id;
        const getOneTodo = await pool.query("SELECT description FROM todo WHERE todo_id = $1", [id]);
        res.json(getOneTodo.rows[0]);
    }catch(e){
        console.log(`Nome: ${e.name} Erro: ${e.message}`);
    }
})

app.put('/puttodo/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const description = req.body.description;        
        const updateOneTodo = await pool.query("UPDATE todo set description = $1 WHERE todo_id = $2 ", [description, id]);
        res.json('Tarefa Alterada!');
    }catch(e){
        console.log(`Nome: ${e.name} Erro: ${e.message}`);
    }
})
app.delete('/deletetodo/:id', async(req, res) => {     
    try{
        const id = req.params.id;        
        const updateOneTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
        res.json('Tarefa Removida');
    }catch(e){
        console.log(`Nome: ${e.name} Erro: ${e.message}`);
    }
})

app.listen(5000, () => {
    console.log('Servidor iniciou na porta 5000')
});


