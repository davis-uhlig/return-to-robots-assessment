const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
// const userData = require("./data.js");

const routes = require('./routes/routes.js');



app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(express.static('public'))
console.log(__dirname);
app.use(routes);





app.listen(3000, function(){
  console.log("App is running on localhost:3000");
});


// app.listen(87017, function(){
//   console.log("app is running on localhost:287017");
// })
