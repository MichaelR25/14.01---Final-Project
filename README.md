# CS208 Full Stack Final Project - Donut Shop Application

- Name: Michael Rangel
- GitHub: [https://github.com/MichaelR25](https://github.com/MichaelR25)
- Term: Spring 2026

## Project Description

This is my full-stack application for CS208, built with node.js. I built a web
application for a small donut shop that allows users to view and order donuts
online. The application uses Express for the backend and MariaDB (MySQL) for the
database. Please read the following instructions carefully because some of the
setup only needs to be done once.

## Install the Database

To set up the database, run the `install_db.sh` script in the setup_scripts
directory. This script will install MariaDB and start the server running. You
only need to run this script once per Codespace.

```bash
./setup_scripts/install_db.sh
```

Use the following for questions that the script asks:
- Enter current password for root (enter for none): enter
- Switch to unix_socket authentication [Y/n] n
- Change the root password? [Y/n] Y
- Set the password to 12345
- Remove anonymous users? [Y/n] Y
- Disallow root login remotely? [Y/n] Y
- Remove test database and access to it? [Y/n] Y
- Reload privilege tables now? [Y/n] Y

Test to make sure the db is running:

```bash
sudo service mariadb status
```

## Create the Database Tables

Create the initial tables by running the following command:

```bash
sudo mysql -u root -p < ./setup_scripts/create_initial_tables.sql
```

## Create initial data 

Create the initial data for the database by running the following command:
```bash
sudo mysql -u root -p < ./setup_scripts/initial_data.sql
```

## Install Dependencies

Install the required dependencies using npm:

```bash
npm install
```

## Run the Application

Start the application using the following command:

```bash
npm start
```

## Access the Application

On Codespaces, you can access the application by forwarding port 3000. Open the
forwarded port in your browser to view the application.

## Make sure the Database is installed and Running

If you encounter issues with the database, you can check the status of the
MariaDB service using the command below. If the service is not running, you can
start it with `sudo service mariadb start`. If the mariadb service is not
installed, you can run the `install_db.sh` script again to reinstall it.

## Design Choices

1.  In my initial design doc for the homepage, I wanted to have the logo in the middle. However, styling the logo to remain in the middle was 
    extremely tedious and annoying, so I decided to move it to the left of the screen. For accessability and style reasons, I had it replace the home button,
    and the image itself links to the home page. The gave me a nav bar with 4 even buttons/links that scale nicely. 
2.  Another thing I wanted to implement was a proper login system. However, upon researching and finding out everything I needed to do, I decided that a simple username and
    userID system would be better due to the time constraint. I plan to revisit this over the summer and try to implement a good proper login system with password hashing and 
    salting.
3.  I decided each product page should have its own reviews seperate from the store reviews. Thanks to me deciding on this very early on, it made the implementation very easy.
    I made a review pug layout that I was able to use for the product pages and for the store reviews, and it just took checking the id parameter to figure out which table to 
    query.
4.  Lastly, I followed every design guideline provided, using the given hex values, and importing the Montserrat font for all of the text

## Edge cases

Using the error handler found in the app.js file, I was able to pass in error codes and messages that are used for the error page.
Whenever one of my routes encountered an error, such as not being able to communicate to the database, having a bad sql statement, or
an invalid route, the proper error is thrown and the error.pug view is displayed. It communicates the error code, the reason for the error,
and displays links for the user that would help them recover from the error.

Additionally, to prevent invalid data being entered into the database, the database has constraints on some columns, and default values.
For any text submitted to the database, every string is first checked on the client side. All text is first trimmed using the .trim() function, 
then the text is checked for length to ensure all text is an appropriate size for the database. If that passes, it's checked once more on the server for
white space and for length, before finally being inserted into the database. Any text submitted is automatically escaped due to my queries all using 
parameters for inserts and selects, which hopefully prevents all sql injection attacks. 

I did attempt to sql inject my page but failed, so it should work for basic attacks. I also tried to do an XSS attack by submitting <script> tags with some
simple js, and it also did not work due to all the text being escaped before being submitted to the database. Once again, this is just prevention for simple 
attacks. I have no way of knowing how succeptible the page is to more advanced sql injections or XSS attacks until it happens/ I test it myself.

Lastly, to prevent multiple posts by double clicking, the submit button is disabled once it's clicked, and re-enabled if the post fails.


## Challenges and what I learned

1.  While not a super hard challenge, I had to get used to using async functions. I wrote 4 helper async functions that made specific queries to the database.
    This was more tedious than hard in my opinion. Due to some of the functions explicitly returning Promise objects, whenever I called one of those functions, 
    I had to wrap my code in a try/catch just in case the Promise returns a reject. Not only that, knowing when to use await was a bit of a struggle since my 
    function updateProductAverage was a function I did not need to wait for to finish before moving on. 
2.  One of my biggest challenges was learning how to properly sanitize and post data to a table. For writing my queries, I first opened a 
    mysql command line using the `mysql -u root -p downtown_donuts_data` command on a normal bash terminal. This CLI allowed me to test queries 
    before using them in my server code, just in case they broke something or my syntax was wrong. Once I got my queries down, I then put them 
    in my router code, paramterized the query, and fed in the proper queries. I wish I could say it was as easy as that, but very often I was struggling
    with getting the proper parameters from the url, or from a different table in the database. I ended up writing helper async functions that allowed me to 
    fetch data, such as the user_id of a user_name, in order to be able to post data. 

## Resources used

https://fonts.google.com/specimen/Montserrat - Used to get the font needed for the brand guidelines (Montserrat)

https://www.youtube.com/watch?v=fGYQJAlLD68 - Used to learn how to post data to the database using the fetch api

https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status#client_error_responses - Used as a reminder for error codes

https://addons.mozilla.org/en-US/firefox/addon/wave-accessibility-tool/ - Extension used to check the accessibillity of my page

I also used google's Gemini Pro Model to learn how to write safer code, to catch typos, and to help debug.
I did not use any code generate by gemini and solely used it as a tool for debugging and catching human error.