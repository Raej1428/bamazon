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

connection.connect(function (err) {
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
            message: "Would you like to [View] our inventory or [Buy]?",
            choices: ["View", "Buy", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, either call the buy or the view functions
            if (answer.vieworbuy === "View") {
                viewItems();
            }
            else if (answer.vieworbuy === "Buy") {
                buyItems();
            } else {
                connection.end();
            }
        });
}

function viewItems() {

    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        // Log all results of the SELECT statement
        console.log("Here are the goods for purchase:\n");
        console.log(res);
    });
    buyItems();
}

function buyItems() {
    // query the database for available goods and qty's
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // once you have the list of goods, prompt the user for which they'd like to buy
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].pname);
                        }
                        return choiceArray;
                    },
                    message: "What would you like to buy?"
                },
                {
                    name: "qty",
                    type: "input",
                    message: "How many would you like to buy?"
                }

            ]).then(function (answer) {
                // get the information of the chosen selection
                var selection;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].pname === answer.choice) {
                        selection = results[i];
                        console.log("There were  " + selection.stock + " in stock.");
                    }
                } if (selection.stock >= parseInt(answer.qty)) {

                    var updateStock = parseInt(selection.stock - answer.qty);
                    console.log("Now only " + updateStock + " are in stock for the next lucky buyer!");
                    // if in stock, update db, let the user know, and start over
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock: updateStock
                            },
                            {
                                pname: selection.pname
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log(selection.pname + " is on its way!");
                            start();
                        });
                }
                else {
                    // not enough stock please start over
                    console.log("Not enough in stock for purchase.");
                    start();
                }
            });
    });
}


