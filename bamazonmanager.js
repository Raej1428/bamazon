var mysql = require("mysql");
var inquirer = require("inquirer");
var colors = require("colors");
// var inventory = require("./inventory.js");
// var sell = require("./sell.js");

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
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Find products by name!",
        "Find products by department!",
        "Find products within a specific price range!",
        "View Low Inventory!",
        "Add products to sell!"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Find products by name!":
          pNameSearch();
          break;

        case "Find products by department!":
          deptSearch();
          break;

        case "Find products within a specific price range!":
          rangeSearch();
          break;

        case "View Low Inventory!":
          viewLowInv();
          break;

        case "Add products to sell!":
          addItemSell();
          break;

        case "exit":
          connection.end();
          break;
      }
    });
}
function pNameSearch() {
  inquirer
    .prompt({
      name: "pname",
      type: "input",
      message: "What product would you like to search for?"
    })
    .then(function (answer) {
      var query = "SELECT pname,stock FROM products WHERE ?";
      connection.query(query, { pname: answer.pname }, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Products Found: " + res[i].pname + " || Qty: " + res[i].stock);
        }
        runSearch();
      });
    });
}

function deptSearch() {
  inquirer
    .prompt({
      name: "deptname",
      type: "input",
      message: "What department would you like to search in?"
    }).then(function (answer) {
      var query = "SELECT deptname,pname,stock FROM products WHERE ?";
      connection.query(query, { deptname: answer.deptname }, function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Products Found: " + res[i].pname + " || Department: " + res[i].deptname + " || Qty: " + res[i].stock);
        }
        runSearch();
      });
    })
}

function rangeSearch() {
  inquirer
    .prompt([
      {
        name: "start",
        type: "input",
        message: "Enter starting price: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "end",
        type: "input",
        message: "Enter ending price: ",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      var query = "SELECT price,stock,pname,deptname FROM products WHERE price BETWEEN ? AND ?";
      connection.query(query, [answer.start, answer.end], function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(
            "Price: " +
            res[0].price +
            " || Qty: " +
            res[0].stock +
            " || Product Name: " +
            res[0].pname +
            " || Department: " +
            res[0].deptname
          );
        }
        runSearch();
      });
    });
}
function viewLowInv() {
  console.log("here we go")
  inquirer
    .prompt({
      name: "pname",
      type: "input",
      message: "What product inventory would you like to view?"
    })
    .then(function (answer) {
      connection.query("SELECT * FROM products WHERE ?", { pname: answer.pname }, function (err, res) {
        if (err) throw err;
        console.log(
          "Product: " +
          res[0].pname +
          " || Qty: " +
          res[0].stock +
          " || Price: " +
          res[0].price +
          " || Department: " +
          res[0].deptname
        );
        runSearch();
      });
    });
}

function addItemSell() {
  console.log("here we go")
  inquirer
    .prompt({
      name: "pname",
      type: "input",
      message: "What's the name of the product you wouild like to add?"
    },
      {
        name: "deptname",
        type: "input",
        message: "What department does this product belong to?"
      },
      {
        name: "stock",
        type: "input",
        message: "How many of this item are you adding?"
      },
      {
        name: "price",
        type: "input",
        message: "How much is this item priced?"
      })
    .then(function (answer) {
      connection.query("INSERT INTO products(pname, deptname, price, stock) VALUES", { pname: answer.pname, deptname: answer.deptname, stock: answer.stock, price: answer.price }, function (err, res) {
        if (err) throw err;
        console.log(
          "Product: " +
          res[0].pname +
          " || Qty: " +
          res[0].stock +
          " || Price: " +
          res[0].price +
          " || Department: " +
          res[0].deptname
        );
        runSearch();
      });
    });
}

