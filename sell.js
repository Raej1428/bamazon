  var sell =
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

  module.exports = sell;
  