const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'sampleusers',
    password:'postgres',
    port: 5432
})

const getUsers=(req,res)=>{
    pool.query("Select * from users order by id ",(err,results)=>{
        if(err){
            throw err;
        }
        res.status(200).json(results.rows)
    });

}

const createUsers = (req, res) => {
  const { name, email } = req.body;
  pool.query(
    'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id',
    [name, email],
    (err, results) => {
      if (err) {
        
        console.error('Error executing query:', err);
        res.status(500).send('Internal Server Error');
        return;
      }
      
      res.status(201).json({ id: results.rows[0].id });
    }
  );
};


const deleteUser = (req, res) => {
    const id = parseInt(req.params.id); 
    pool.query(
        'DELETE FROM users WHERE id = $1',
        [id],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`User with ID ${id} has been deleted`);
        }
    );
};

const updateUser = (req, res) => {
    const id = parseInt(req.params.id); 
    const { name, email } = req.body; 
    pool.query(
        'UPDATE users SET name = $1, email = $2 WHERE id = $3',
        [name, email, id],
        (err, results) => {
            if (err) {
                throw err;
            }
            res.status(200).send(`User with ID ${id} has been updated`);
        }
    );
};


module.exports={
    getUsers,
    createUsers,
    deleteUser,
    updateUser
}