DROP DATABASE IF EXISTS bamazon_DB;
CREATE database bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INTeger not null auto_increment, 
  pname VARCHAR(100) NOT NULL,
  deptname VARCHAR(100) NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER NOT NULL,
  PRIMARY KEY (item_id)
  );
  
  Insert Into products(pname, deptname, price, stock) Values ("iPad Pro Cover", "Tech Accessories", 50, 3), ("iPad Mini Cover", "Tech Accessories", 45, 2), ("iPad Pro Screen Protector", "Tech Accessories", 25, 5), ("Jigsaw Puzzle", "Board Games", 14, 1), 
  ("Uno: Toy Story Edition", "Card Games", 10, 36), ("Coconut Oolong Tea", "Loose-Leaf Tea", 75, 12), ("Boys Shoes", "Apparel", 50, 10), ("64in Television", "Televisions", 500, 2), ("Laundry Sanitizer", "Cleaning", 17, 0), ("Dog Door", "Home Improvement", 99, 6);
  
  select * from products;