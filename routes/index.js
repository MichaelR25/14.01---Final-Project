var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next){
  try {
    req.db.query('SELECT * FROM products ORDER BY average_rating DESC LIMIT 5;', (err, results) => {
      if (err) {
        console.error('Error fetching products:', err);
        return res.status(500).send('Error fetching products');
      }
      res.render('index', { title: 'Downtown Donuts', featuredProducts: results});
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/products/:id', function(req, res, next){
  try {
    req.db.query('SELECT * FROM products WHERE product_id = ? ;', (err, results) => {
      if (err) {
        console.error('Error fetching from database:', err);
        return res.status(500).send('Error fetching from database');
      }
      res.render('product', { title: 'Downtown Donuts'});
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/menu', function(req, res, next){
  try {
    req.db.query('SELECT * FROM products;', (err, results) => {
      if (err) {
        console.error('Error fetching from database:', err);
        return res.status(500).send('Error fetching from database');
      }
      res.render('menu', { title: 'Downtown Donuts', featuredProducts: results});
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/about', function(req, res, next){
  try {
    req.db.query('SELECT * FROM products;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      res.render('about', { title: 'Downtown Donuts'});
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

router.get('/reviews', function(req, res, next){
  try {
    req.db.query('SELECT * FROM products;', (err, results) => {
      if (err) {
        console.error('Error fetching todos:', err);
        return res.status(500).send('Error fetching todos');
      }
      res.render('store_reviews', { title: 'Downtown Donuts'});
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});



module.exports = router;