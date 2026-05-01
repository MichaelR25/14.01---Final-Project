var express = require('express');
var router = express.Router();

/* Gets the top 5 menu items and the landing page*/
router.get('/', function(req, res){
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
router.get('/products/:id', async function(req, res){
  const limit = 5;
  let currentPage = parseInt(req.query.page) || 1;
  const id = parseInt(req.params.id);
  const offset = (currentPage - 1) * limit;
  let pageCount = Math.ceil((await getReviewCount(req.db, id) / limit)); 
  try {
    req.db.query('SELECT * FROM products WHERE product_id = ?;', [id], (err, productResults) => {
      if (err) {
        console.error('Error fetching from database:', err);
        return res.status(500).send('Error fetching from database');
      }
      req.db.query('SELECT * FROM product_reviews AS p JOIN users ON p.user_id = users.user_id  WHERE p.product_id = ? ORDER BY review_date DESC LIMIT ? OFFSET ?;', [id, limit, offset], (err, reviewResults) => {
        if (err) {
          console.error('Error fetching from database:', err);
          return res.status(500).send('Error fetching from database');
        }
        res.render('product', { 
          title: 'Downtown Donuts',
          product: productResults[0],
          reviews: reviewResults,
          current_page: currentPage, 
          next_page: currentPage + 1, 
          previous_page: currentPage - 1,
          max_pages: pageCount});
          
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
router.get('/about', function(req, res){
    res.render('about', { title: 'Downtown Donuts'});
});

/* Gets the reviews specifically for the store and responds with the store_reviews page*/
router.get('/reviews', async function(req, res){
  let currentPage = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (currentPage - 1) * limit;
  let pageCount = Math.ceil((await getReviewCount(req.db, null) / limit)); 
  console.log(pageCount);
  try {
    req.db.query('SELECT * FROM shop_reviews AS p JOIN users ON p.user_id = users.user_id ORDER BY review_date DESC LIMIT ? OFFSET ?;', [limit, offset], (err, results) => {
      if (err) {
        console.error('Error fetching store reviews:', err);
        return res.status(500).send('Error fetching store reviews');
      }
      res.render('store_reviews', { title: 'Downtown Donuts',
                                    reviews: results,
                                    current_page: currentPage, 
                                    next_page: currentPage + 1, 
                                    previous_page: currentPage - 1,
                                    max_pages: pageCount}); 
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
      console.log("Review Posted Successfully for product: " + id);
      res.json({message: "Review Posted Successfully!"});
      updateProductAverage(req.db, id);
    });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).send('Error fetching items');
  }
});

/* Helper method to get the user_id of a given user_name
 * If the user_name is not found, a new user is created
 * returns the id of the user if found, otherwise the id of the new user
*/
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

/** Helper method to create a new user
 * returns 
 * 
 * @param {*} db 
 * @param {*} userName 
 * @returns a Promise Object containing the id of the new user
 */
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

/** Helper method to update the average rating of a product
 * 
 * @param {object} db 
 * @param {int} id 
 */
async function updateProductAverage(db, id) {
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

/** Helper method to make a database request to get the number of reviews of a given page
 * 
 * @param {object} db - A database connection
 * @param {int} id - A product_id, or null for shop_reviews
 * @returns a Promise obect containing the number of reviews found
 */
async function getReviewCount(db, id) {
  let query = '';
  let data = []
  // If a product id is given, search the product_reviews table
  // Otherwise, search the shop_reviews table
  if(id) {
    query = 'SELECT COUNT(*) AS max FROM product_reviews WHERE product_id = ?';
    data = [id];
  } else {
    query = 'SELECT COUNT(*) AS max FROM shop_reviews';
  }
  return new Promise(function(resolve, reject) {
    db.query(query, data, (err, results) => {
      if (err) {
        reject(err);
      }
      resolve(results[0].max);
    });
  }); 
}

module.exports = router;