var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed, lastFed, feedTime;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();
  console.log("Before"+foodS)
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  console.log("After"+foodS)
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  feedTheDog=createButton("Feed The Dog");
  feedTheDog.position(700,95);
  feedTheDog.mousePressed(feedDog);
  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  
  //write code to read fedtime value from the database 

  console.log("Before"+feedTime)
 feedTime = database.ref('FeedTime/')
feedTime.on("value", function(data){
  console.log("inside data"+data.val())
  feedTime=data.val(); 
})



  //write code to display text lastFed time here

 
  textSize(20)
fill("red")
 text("Last Fed: "+feedTime, 200, 200)
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  console.log("hi")
  foodS=data.val();
  console.log(foodS)
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
foodS-=1
database.ref('/').update({
  Food:foodS, FeedTime:hour()

})
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  console.log(foodS)
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
