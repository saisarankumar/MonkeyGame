//create variables to sprites
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var banana, foodGroup;
var gameOver, gameOverImage;
var resetButton, resetButtonImage;

//create survival time for monkey
var survivalTime = 0;
//create gameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;
//create score and chances
var score = 0;
var chances = 3;


function preload(){
  
  //load animation for monkey
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
 
  //load images for banana and obstacle
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  //load other animations
  gameOverImage = loadImage("game over.png");
  
  resetButtonImage = loadImage("ResetImage.png");
  
}



function setup() {
  
  //create a sprite
  monkey = createSprite(60, 335, 20, 20);
  //add animation for monkey
  monkey.addAnimation("moving", monkey_running);
  //set scale for monkey
  monkey.scale = 0.1;
  
  //create sprite for ground
  ground = createSprite(400, 470, 900, 10);
  //give velocity of ground in horizontal direction
  ground.velocityX = -4;
  //reseting the ground
  ground.x = ground.width/2;
  
  //create groups for food and obstacle
  foodGroup = createGroup();
  obstacleGroup = createGroup(); 
  
  //create gameOver sprite and add image
  gameOver = createSprite(300, 200);
  gameOver.addImage(gameOverImage);
  
  //create reset button sprite and add image.scale it
  resetButton = createSprite(300, 250);
  resetButton.addImage(resetButtonImage);
  resetButton.scale = 0.1;
  //monkey.debug = true;
  //gameOver.debug = true;
  //resetButton.debug = true;
  
  //gameOver.setCollider("rectangle", 0, 0, gameOver.width, 40)
}


function draw() {

  createCanvas(650, 500);
  //clear the screen
  background("white");
  
  //to create survival time for monkey
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.round(frameCount/80);
  text("survival time:" + survivalTime, 100, 50);  
  
  //collide the monkey with ground
  monkey.collide(ground);
  
  //create text
  text("score:"+score, 400, 50);  
  text("lives:"+chances, 500, 50);
  
  // when the gameState is in play
  if(gameState === PLAY){
    //visibility of gameOver and reset button is false
    gameOver.visible = false;
    resetButton.visible = false;
    //when monkey touches the foodGroup
    if(monkey.isTouching(foodGroup)){
     //foodGroup will destroy
     foodGroup.destroyEach();
     //score will increase by 2
     score = score + 2;       
    }

    //reseting the ground
    ground.x = ground.width/2;
  
    //when space is pressed
    if(keyDown("space") && monkey.y >= 335){
     monkey.velocityY = -10;
    }
      
    //give gravity for monkey
    monkey.velocityY = monkey.velocityY + 0.8;
    
    //when monkey touches the obstacleGroup
    if(monkey.isTouching(obstacleGroup)){
      //chances will decrease by 1
      chances = chances - 1;
      obstacleGroup.destroyEach();
      
    }
    //when chances are 0
    if(chances === 0){
      //gameState is in end
      gameState = END;
    }
    
  } 
  //when gameState is in end
  else if(gameState === END){
            
    //obstacles velocity is 0
    obstacleGroup.setVelocityXEach(0);
    //set life is -1, they will not destroy
    obstacleGroup.setLifetimeEach(-1);
    //food velocity is 0
    foodGroup.setVelocityXEach(0);
    //set life is -1, they will not destroy
    foodGroup.setLifetimeEach(-1);
    //ground velocity in horizontal direction is 
    ground.velocityX = 0;
    
    //visibility is true
    gameOver.visible = true;    
    resetButton.visible = true;
 
    //when mouse is pressed on game over or reset button
    if(mousePressedOver(resetButton) || mousePressedOver(gameOver)){
      console.log("Reset");
      reset();
    }
    
  }
  
  //display sprites
  drawSprites();
  //display other functions
  food();
  obstacles();  
  
}

function reset(){
  
  //gameState is in play
  gameState = PLAY;
  //visibility is false
  gameOver.visible = false;
  resetButton.visible = false;
  
  //obstacleGroup and foodGroup will destroy
  obstacleGroup.destroyEach();
  foodGroup.destroyEach();
  
  //score is 0
  score = 0;
  //chances are 3
  chances = 3;
  //survivalTime is 0
  surviavalTime = 0;
  //frameCount is 0
  frameCount=0;
}


function food() {
  if(frameCount % 170 === 0){
    //create sprite for banana
    banana = createSprite(600,350,40,10);
    //add image for banana
    banana.addImage("banana",bananaImage);
    //random y position of monkey
    banana.y = Math.round(random(250,400));
    //set scale for banana
    banana.scale = 0.1;
    //give velocity for banana
    banana.velocityX = -3;
    //add lifetime to banana
    banana.lifetime = 200;
    //add banana in foodGroup
    foodGroup.add(banana);
  }
}

function obstacles() {
  if(frameCount % 300 === 0 ){
    //create sprite for obstacle                  
    obstacle = createSprite(600,445,10,10);
    //add image for obstacle
    obstacle.addImage(obstacleImage);
    //give velocity for obstacle
    obstacle.velocityX = -4;
    //add lifetime to obstacle
    obstacle.lifetime = 200;
    //set scale for obstacle 
    obstacle.scale = 0.1 ;
    //add obstacle in obstacleGroup
    obstacleGroup.add(obstacle);
  }
}