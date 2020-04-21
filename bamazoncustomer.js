var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "127.0.0.1",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "MaggyOsiris1313",
    database: "bamazon_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
  });
  
  // function which prompts the user for what action they should take
  function start() {
    inquirer
      .prompt({
        name: "vieworbuy",
        type: "list",
        message: "Would you like to [View] our inventory or [Buy] an item?",
        choices: ["View", "Buy", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.vieworbuy === "View") {
          viewItems();
        }
        else if(answer.vieworbuy === "Buy") {
          buyItems();
        } else{
          connection.end();
        }
      });
  }

  function viewItems() {

    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
  
      // Log all results of the SELECT statement
      console.log("Here are the items for purchase:\n" + res);
    });
  }
  
  function buyItems() {
    // query the database for all items being auctioned
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].pname);
              }
              return choiceArray;
            },
            message: "What item would you like to buy?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
              chosenItem = results[i];
            }
          }
  
          // determine if there is inventory =
          if (chosenItem.stock < parseInt(answer.buy)) {
            // if item in stock, update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  highest_bid: answer.buy
                },
                {
                  id: chosenItem.item_id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Your iten is on its way!");
                start();
              } .catch(err)
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("Not enough items in stock for purchase.");
            start();
          }
        });
    });
  }
  