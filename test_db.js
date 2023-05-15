import { Fruits } from "./models/Fruit.js";

// return all records
Fruits.find({}).lean()
  .then((fruits) => {
    console.log(fruits)
  })
  .catch((err) => {
  });
