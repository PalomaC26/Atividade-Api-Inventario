const db = require('../config/db');
//toda transação
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
 
// Adiciona uma nova transação
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

//subistituição completa

const updateProductPut = (req, res) => {
    const{id} = req.params;
    const {name, description, category, price, stock, expiry_date} = req.body;
    db.query(
    'UPDATE products SET name=?, description=?, category=?, price=?, stock=?, expiry_date=? WHERE id=?',
      [name, description, category, price, stock, expiry_date, id],
    (err, results) => {
        if(err) {
            console.error('Erro ao adicionar produto', err);
            res.status(500).send('Erro ao adicionar produto');
         return;
        }
     res.send('Produto atualizado com sucesso');
    }
    );
    };

   // substituição parcial
const updateProductPatch = (req, res) => {
    const{id} = req.params;
    const fields = req.body;
    const query = [];
    const values = [];
    
    for(const[key,value] of Object.entries(fields)) {
      query.push (`${key}= ?`);
      values.push(value);
    }
     values.push(id);
    
     db.query(
      `UPDATE products SET ${(query.join(','))} WHERE ID = ?`,
       values,
       (err, results) => {
        if(err) {
            console.error('Erro ao adicionar produto', err);
            res.status(500).send('Erro ao adicionar produto');
         return;
        }
        res.send('Produto atualizado com sucesso');
    }
    );
    };

//Função para deletar 

const deleteProduct = (req,res) => {
    const{id} = req.params;
    db.query('DELETE FROM products WHERE id = ?', [id],
    (err, results) => {
      if(err) {
          console.error('Erro deletar produto', err);
          res.status(500).send('Erro ao deletar produto');
       return;
      }
      res.send('Produto Deletado com sucesso');
  }
  );
  };


module.exports = {
 getAllProducts,
 addProduct,
updateProductPut,
updateProductPatch,
deleteProduct
};