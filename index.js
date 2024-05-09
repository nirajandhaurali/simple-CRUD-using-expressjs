const express = require ("express");
const app = express();
const bodyParser=require('body-parser');
const db = require("./queries");


require('dotenv').config();
const port = process.env.port;


app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());




app.get('/',(req,res)=>{
    res.json(
        {
            info:"node js and postgress"
        }
    )
})

app.get('/users',db.getUsers)
app.post('/users',db.createUsers)
// Route to handle DELETE requests to delete a user by ID
app.delete('/users/:id', db.deleteUser);

app.put('/users/:id', db.updateUser);
app.patch('/users/:id', db.updateUser);


app.listen(port,()=>{
    console.log(`servr is running in port ${port}`);
});