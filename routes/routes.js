const express = require("express");
const mustacheExpress = require("mustache-express");
const app = express();
const router = express.Router();

var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');
var url = 'mongodb://localhost:27017/robotsdb';

let userData;
let unemployedBots;
let employedBots;

let findDocuments = function(robotsdb, callback) {
  let collection = robotsdb.collection('robotWorkers');
  collection.find({}).toArray(function(err,docs){
    userData = docs;
    // console.log(docs);
    callback(docs);

  });

}

let findUnemployed = function(robotsdb, callback) {
  let collection = robotsdb.collection('robotWorkers');
  collection.find({job: null}).toArray(function(err, docs){
    unemployedBots = docs;
    // console.log(docs);
    callback(docs);
  })
}

let employedRobots = function(robotsdb, callback) {
  let collection = robotsdb.collection('robotWorkers');
  collection.find({job: {$nin: [null]}}).toArray(function(err, docs){
    employedBots = docs;
    console.log(docs);
    callback(docs);
  })

}


router.get("/", function(req, res){


  res.render("index", {users: userData})
});

router.get("/unemployedRobots", function(req, res){
  res.render('unemployed', {unemployed: unemployedBots})
});

router.get("/employedRobots", function(req, res){
  res.render("employed", {employed: employedBots})
})

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  findDocuments(db, function() {
    db.close();
  });
  findUnemployed(db, function(){
    db.close();
  })
  employedRobots(db, function(){
    db.close();
  })
});

module.exports = router;
