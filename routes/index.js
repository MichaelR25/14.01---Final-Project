var express = require('express');
var router = express.Router();

/* Gets the top 5 menu items and the landing page*/
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

/* 
 * Gets product data based on the id from the database, and sends the data with the 
 * product pug view
*/
router.get('/products/:id', function(req, res, next){
  const id = parseInt(req.params.id);
  try {
    req.db.query('SELECT * FROM products WHERE product_id = ?;', [id], (err, productResults) => {
      if (err) {
        console.error('Error fetching from database:', err);
        return res.status(500).send('Error fetching from database');
      }
      req.db.query('SELECT * FROM product_reviews AS p JOIN users ON p.user_id = users.user_id  WHERE p.product_id = ?;', [id], (err, reviewResults) => {
        if (err) {
          console.error('Error fetching from database:', err);
          return res.status(500).send('Error fetching from database');
        }
        res.render('product', { 
          title: 'Downtown Donuts',
          product: productResults[0],
          reviews: reviewResults});
        });
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* Gets all the products from the menu and dispalys them on the menu page */
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

/* Gets the about page */
router.get('/about', function(req, res, next){
    res.render('about', { title: 'Downtown Donuts'});
});

/* Gets the reviews specifically for the store and responds with the store_reviews page*/
router.get('/reviews', function(req, res, next){
  let offset = 5;
  try {
    req.db.query('SELECT * FROM shop_reviews AS p JOIN users ON p.user_id = users.user_id LIMIT 5 OFFSET 0;', [offset], (err, results) => {
      if (err) {
        console.error('Error fetching store reviews:', err);
        return res.status(500).send('Error fetching store reviews');
      }
      res.render('store_reviews', { title: 'Downtown Donuts', reviews: results});
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* Posts the sent user review after sanitizing the data*/
router.post('/api/post-review', async function(req, res) {
  const {userName, id, rating, reviewText} = req.body;
  const user_id = await getUserId(req.db, userName);

  let query = "";
  let values = [];

  if(userName.length <= 0) {
    return res.status()
  }

  // Determine if the review is being posted to the product or to the store
  if(id) {
    query = 'INSERT INTO product_reviews VALUES (DEFAULT, ?, ?, ?, DEFAULT, ?);';
    values = [user_id, id, rating, reviewText]        
  } else {
    query = 'INSERT INTO shop_reviews VALUES (DEFAULT, ?, ?, DEFAULT, ?);';
    values = [user_id, rating, reviewText]
  }

  try {
    req.db.query(query, values, (err, results) => {
      if (err) {
        console.error('Error adding store reviews:', err);
        return res.status(500).send('Error fetching store reviews');
      }
      res.json({message: "Review Posted Successfully!"});
      updateAverage(req.db, id);
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

async function getUserId(db, userName) {
  return new Promise(function(resolve, reject) {
    db.query('SELECT user_id FROM users WHERE user_name = ?', [userName], async (err, results) => {
      if(err) {
        reject(err);
      }  
      if (results.length == 0) {
          console.error('User not found! Creating User:...');
          resolve(await createUser(db, userName));
      } else {
        console.log("User Found!")
        resolve(results[0].user_id)
      }
    });
  });
}

async function createUser(db, userName) {
  return new Promise(function(resolve, reject) {
    db.query('INSERT INTO users(user_name) VALUES (?)', [userName], (err, results) => {
      if (err) {
        console.error("Failed to create user!")
        reject(err);
      }
      resolve(results.insertId);
    });
  });
}

async function updateAverage(db, id) {
  const query = `
    UPDATE products p 
    INNER JOIN (
      SELECT product_id, AVG(rating) AS average
      FROM product_reviews
      WHERE product_id = ?) r 
      ON p.product_id = r.product_id
      SET p.average_rating = r.average;
  `;
  
  db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Failed to update averages!")
      } 
  });
}

module.exports = router;