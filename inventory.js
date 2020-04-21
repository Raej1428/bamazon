var inventory = function viewLowInv() {
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
  
  module.exports = inventory;