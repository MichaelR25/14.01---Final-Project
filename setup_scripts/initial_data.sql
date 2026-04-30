USE downtown_donuts_data;

INSERT INTO products(product_name, price, product_type, product_description)
VALUES  ("Classic Glazed", 2.50, "donut", "Our legendary original - light, fluffy, and perfectly glazed"),
        ("Maple Bacon Bar", 3.75, "donut_bar", "Rich maple glaze topped with crispy applewood bacon"),
        ("Boston Cream", 3.50, "donut", "Bavarian cream filling, dark chocolate ganache topping"),
        ("Blueberry Cake", 3.25, "donut", "Dense cake donut bursting with fresh blueberries" ),
        ("Cinnamon Sugar Twist", 2.75, "donut", "Hand-twisted and tossed in cinnamon sugar"),
        ("Strawberry Frosted", 3.00, "donut", "Vanilla donut with strawberry glaze and rainbow sprinkles"),
        ("Chocolate Old Fashioned", 3.25, "donut", "Sour cream donut with rich chocolate glaze"),
        ("Lemon Poppy Seed", 3.50, "donut", "Bright lemon glaze with poppy seed crunch"),
        ("Dulce de Leche", 3.75, "donut", "Caramel cream filled, drizzled with dulce de leche"),
        ("PB & J", 3.75, "donut", "Peanut butter glaze with raspberry jam filling"),
        ("Baker's Dozen - Classic Glazed", 25.00, "box", "13 of our famous Classic Glazed donuts! Each one handcrafted in house every morning just for you!"),
        ("Baker's Dozen - Maple Bacon Bars", 37.50, "box", "13 of our famous Maple Bacon Bars! Each one handcrafted in house every morning just for you!"),
        ("Baker's Dozen - Boston Cream", 35.00, "box", "13 of our famous Boston Cream donuts! Each one handcrafted in house every morning just for you!."),
        ("Baker's Dozen - Blueberry Cake", 32.50, "box", "13 of our famous Blueberry Cake donuts! Each one handcrafted in house every morning just for you!."),
        ("Baker's Dozen - Cinnamon Sugar Twist",  27.50, "box", "13 of our famous Cinnamon Sugar Twists! Each one handcrafted in house every morning just for you!."),
        ("Baker's Dozen - Strawberry Frosted", 30.00, "box", "13 of our famous Strawberry Frosted donuts! Each one handcrafted in house every morning just for you!."),
        ("Baker's Dozen - Chocolate Old Fashioned",  32.50, "box", "13 of our famous Chocolate Old Fashioned donuts! Each one handcrafted in house every morning just for you!"),
        ("Baker's Dozen - Lemon Poppy Seed", 35.00, "box", "13 of our famous Lemon Poppy Seed donuts! Each one handcrafted in house every morning just for you!."),
        ("Baker's Dozen - Dulce de Leche", 37.50, "box", "13 of our famous Dulce de Leche donuts! Each one handcrafted in house every morning just for you!."),
        ("Baker's Dozen - PB & J", 37.50, "box", "13 of our famous PB & J donuts! Each one handcrafted in house every morning just for you!."),
        ("Baker's Dozen - Mixed", 29.99, "box", "13 of our glazed donuts! Box includes 3 Clasic Glazed, Chocolate Old Fashioned, Maple Bacon Bar, Strawberry Frosted, and one additional donut of your choice! Each one handcrafted in house every morning just for you!"),
        ("Dozen Glazed Donut Holes", 7.99, "donut_holes", "12 Glazed donut holes!"),
        ("Dozen Chocolate Donut Holes", 7.99, "donut_holes", "12 Chocolate donut holes!"),
        ("Dozen Cinnamon Sugar Donut Holes", 7.99, "donut_holes", "12 Cinnamon Sugar donut holes!"),
        ("Half Dozen Glazed Donut Holes", 4.50, "donut_holes", "6 Glazed donut holes!"),
        ("Half Dozen Chocolate Donut Holes", 4.50, "donut_holes", "6 Chocolate donut holes!"),
        ("Half Dozen Cinnamon Sugar Donut Holes", 4.50, "donut_holes", "6 Cinnamon Sugar donut holes!"),
        ("Drip Coffee", 2.75, "coffee", "House blend or single origin"),
        ("Cold Brew", 4.00, "coffee", "Slow-steeped 18 hours, smooth and bold"),
        ("Espresso", 3.00, "coffee", "Double shot pulled to order"),
        ("Americano", 3.75, "coffee", "Our famous americano, with freshly ground espresso everytime! Brewed in house everyday just for you!"),
        ("Latte", 4.75, "coffee", "Our famous latte, made with the freshest of milk and coffee! Brewed in house everyday just for you!"),
        ("Cappuccino", 4.75, "coffee", "Equal parts espresso, steamed milk, foam"),
        ("Mocha", 5.25, "coffee", "Espresso, chocolate, steamed milk, whipped cream"),
        ("Vanilla Chai Latte", 5.00, "coffee", "Spiced chai with vanilla and steamed milk"),
        ("Fresh Squeezed OJ", 3.50, "other_drinks", "Freshly squeezed oranges from our local farmers!"),
        ("Hot Chocolate", 3.75, "other_drinks", ""),
        ("Iced Tea (Sweet / Unsweet)", 2.50, "other_drinks", ""),
        ("Lemonade", 2.75, "other_drinks", ""),
        ("Milk (Whole, Chocolate, Strawberry)", 2.00, "other_drinks", ""),
        ("Apple Cider (Seasonal)", 3.50, "other_drinks", ""),
        ("Egg & Cheese Croissant", 5.50, "breakfast", ""),
        ("Bacon Breakfast Sandwich", 6.25, "breakfast", ""),
        ("Avocado Toast", 5.75, "breakfast", ""),
        ("Yogurt Parfait", 4.50, "breakfast", "");

INSERT INTO users(user_name)
VALUES  ("Admin"),
        ("Random User"),
        ("Another User"),
        ("Clueless User");

INSERT INTO product_reviews(user_id, product_id, rating, review_content)
VALUES  (1, 1, 5, "I love our glazed donuts! Best in the word!"),
        (1, 2, 4, "A good ol maple bacon donut, what isn't there to love about it?"),
        (1, 7, 3, "I don't really like chocolate, but because I made these, they're super good!"),
        (1, 9, 5, "I absolutely love a good caramel cream filling, so combining that with a donut drizzled with dulce de leche, this is by far my favorite donut in the whole wide world!!"),
        (2, 1, 5, "I've been to many donut shops in my lifetime, but none come close to how good these are!"),
        (2, 11, 5, "I always buy this box whenever I drive by the store. My whole family loves 'em!"),
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
