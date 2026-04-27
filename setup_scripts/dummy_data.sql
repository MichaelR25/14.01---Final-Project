USE downtown_donuts_data;

INSERT INTO products(product_name, price, product_type, product_description)
VALUES  ("Glazed Donut", 1.99, "donut", "Our famous glazed donut! Made in house everyday just for you!"),
        ("Chocolate Donut", 2.49, "donut", "Our famous chocoloate glazed donut! Made in house everyday just for you!"),
        ("Maple Donut", 2.49, "donut", "Our famous maple glazed donut! Made in house everyday just for you!"),
        ("Plain Donut", 0.99, "donut", "Our famous plain donut! Made in house everyday just for you!"),
        ("Filled Glazed Donut", 2.99, "donut", "Our famous, raspberry filled, glazed donut! Made in house everyday just for you!"),
        ("Baker's Dozen - Glazed", 21.99, "box", "13 of our famous glazed donuts! Each one specially crafted in house everyday just for you!"),
        ("Baker's Dozen - Chocolate", 29.99, "box", "13 of our famous chocolate glazed donuts! Each one specially crafted in house everyday just for you!"),
        ("Baker's Dozen - Maple", 29.99, "box", "13 of our famous maple glazed donuts! Each one specially crafted in house everyday just for you!"),
        ("Baker's Dozen - Filled Glazed", 34.99, "box", "13 of our famous filled glazed donuts! Each one specially crafted in house everyday just for you!"),
        ("Baker's Dozen - Plain", 9.99, "box", "13 of our famous plain donuts! Each one specially crafted in house everyday just for you!"),
        ("Baker's Dozen - Mixed", 29.99, "box", "13 of our famous donuts! Box includes 4 glazed and 3 chocolate, maple, and filled donuts! Each one specially crafted in house everyday just for you!"),
        ("Black Coffee", 1.99, "coffee", "Our famous black coffee! Brewed in house everyday just for you!"),
        ("Cold Brew", 1.99, "coffee", "Our famous cold brew! Brewed in house everyday just for you!"),
        ("Latte", 2.49, "coffee", "Our famous latte, made with the freshest of milk and coffee! Brewed in house everyday just for you!"),
        ("Americano", 2.49, "coffee", "Our famous americano, with freshly ground espresso everytime! Brewed in house everyday just for you!");

INSERT INTO users(user_name, user_email, password_hash, password_salt)
VALUES  ("Admin", "admin@downtowndonuts.com", "password123", "admin"),
        ("Random User", "randomuser@downtowndonuts.com", "password123", "Random User"),
        ("Another User", "anotheruser@downtowndonuts.com", "password123", "Another User"),
        ("Clueless User", "cluelessuser@downtowndonuts.com", "password123", "Clueless User");

INSERT INTO product_reviews(user_id, product_id, rating, review_content)
VALUES  (1, 1, 5, "I love our glazed donuts! Best in the word!"),
        (1, 2, 3, "I don't really like chocolate, but because I made these, they're super good!"),
        (1, 3, 4, "A good ol classic maple donut, what isn't there to love about it?"),
        (1, 4, 5, "I absolutely love a good raspberry filling, so combining that with my favorite glazed donut, this is by far my favorite donut in the whole wide world!!"),
        (2, 1, 5, "I've been to many donut shops in my lifetime, but none come close to how good these are!"),
        (2, 6, 5, "I always buy this box whenever I drive by the store. My whole family loves 'em!"),
        (3, 1, 2, "ive had better"),
        (3, 7, 1, "too expensive"),
        (4, 4, 4, "i love donuts"),
        (4, 11, 4, "mmm donuts...");

INSERT INTO shop_reviews(user_id, rating, review_content)
VALUES  (1, 5, "I own the shop and I think I did a pretty good job!"),
        (2, 5, "I've been supporting this place since it opened, and the quality is still the same as when it opened! I definitely recommend you check this place out!"),
        (3, 2, "honesty, i dont know what the owner is thinking. these donuts taste alright ig but its way too expensive"),
        (4, 4, "i think its pretty good");

UPDATE products p
INNER JOIN (SELECT product_id, AVG(rating) as average
FROM product_reviews
GROUP BY product_id
) r ON p.product_id = r.product_id
SET p.average_rating = r.average;
