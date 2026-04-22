USE downtown_donuts_data;

INSERT INTO products(product_name, price, product_type)
VALUES  ("Glazed Donut", 1.99, "donut"),
        ("Chocolate Donut", 2.49, "donut"),
        ("Maple Donut", 2.49, "donut"),
        ("Plain Donut", 0.99, "donut"),
        ("Filled Glazed Donut", 2.99, "donut"),
        ("Baker's Dozen - Glazed", 21.99, "box"),
        ("Baker's Dozen - Chocolate", 29.99, "box"),
        ("Baker's Dozen - Maple", 29.99, "box"),
        ("Baker's Dozen - Filled Glazed", 34.99, "box"),
        ("Baker's Dozen - Plain", 9.99, "box"),
        ("Baker's Dozen - Mixed", 29.99, "box"),
        ("Black Coffee", 1.99, "coffee"),
        ("Cold Brew", 1.99, "coffee"),
        ("Latte", 2.49, "coffee"),
        ("Americano", 2.49, "coffee");

INSERT INTO users(user_name, user_email, password_hash, password_salt)
VALUES  ("Admin", "admin@downtowndonuts.com", "password123", "admin"),
        ("Random User", "randomuser@downtowndonuts.com", "password123", "Random User"),
        ("Another User", "anotheruser@downtowndonuts.com", "password123", "Another User"),
        ("Clueless User", "cluelessuser@downtowndonuts.com", "password123", "Clueless User");

INSERT INTO product_reviews(user_id, product_id, rating, review_content)
VALUES  (1, 1, 5, "I love our glazed donuts! Best in the word!"),
        (1, 2, 3, "I don't really like chocolate, but because I made these, they're super good!"),
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