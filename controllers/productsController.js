const db = require('../config/db');

const getAllProducts = (req, res) => {
    db.query('SELECT * FROM products', (err, results) => {
        if(err){
            console.error('Erro ao obter produtos:', err);
            res.status(500).send('Erro ao obter produtos');
            return;
        }
        res.json(results);
    });
};

const addProduct = (req, res) => {
    const {name, description, category, price, stock, expiry_date} = req.body;
    db.query(
        'INSERT INTO products (name, description, category, price, stock, expiry_date) VALUES (?,?,?,?,?,?)',
        [name, description, category, price, stock, expiry_date],
        (err, results) => {
            if (err) {
                console.error('Erro ao adicionar produtos:', err);
                res.status(500).send('Erro ao adicionar produtos');
                return;
            }
            res.status(201).send('Produtos adicionado com sucesso');
        }
    );
};






module.exports = {
 getAllProducts,
 addProduct
};