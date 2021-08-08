//declaring global variables
var mario, marioAnim, ground, groundImg, sunImg, coinsGroup, cloudsGroup, marioCollidedImg
var enemyGroup, gameOver, gameOverImg, restart, restartImg, backgroundImg, bgImg2
var coinImg, cloudImg, coinSound
var PLAY=1
var END=0
var gameState=PLAY
var scene
var obstacle1Img,obstacle2Img,obstacle3Img
var button1, mario2, scene2
var score=0

function preload(){
    marioAnim=loadAnimation("Capture1.png","Capture3.png","Capture4.png")
    backgroundImg=loadImage("backg2.jpg")
    gameOverImg=loadImage("gameOver.png")
    restartImg=loadImage("restart.png")
    coinImg=loadImage("coin.png")
    mario_collided = loadImage("mario4.png");
    cloudImg=loadImage("cloudImg2.png")
    sunImg=loadImage("sunImg2.png")
    obstacle1Img=loadImage("obstacle1.png")
    obstacle2Img=loadImage("obstacle2.png")
    obstacle3Img=loadImage("obstacle3.png")
    bgImg2=loadImage("bg2.jpg")
}
    
function setup(){
    createCanvas(1000,600)

    scene=createSprite(900,300,width,height-100)
    scene.addImage(backgroundImg)
    scene.scale=3.7

    scene2=createSprite(500,300)
    scene2.addImage(bgImg2)
    scene2.scale=5.3
    //scene2.velocityX=-2
    //scene2.x=scene2.width/2
    scene2.visible=false

    //scene.x=scene.width/2
    sun=createSprite(900,100,20,height-100)
    sun.addImage(sunImg)
    sun.scale=0.4

    mario=createSprite(100,550,20,40)
    mario.addAnimation("Capture", marioAnim)
    mario.scale=0.91

    ground=createSprite(0,560,1200,10)
    ground.x=ground.width/2
    ground.visible=false

    coinSound=createAudio("Mario-coin-sound.mp3")

    gameOver=createSprite(500,300,10,10)
    gameOver.addImage(gameOverImg)
    gameOver.scale=0.5

    restart=createSprite(500,300,10,10)
    restart.addImage(restartImg)
    restart.scale=0.5

    button1=createButton("Move To Next Level")

    coinsGroup=new Group()
    cloudsGroup=new Group()
    obstacleGroup=new Group()
}

function draw(){
    background(62,189,255)

    if(gameState===PLAY){
        if(keyDown("space") && mario.y>=140){
            mario.velocityY=-14
        }
        scene.velocityX=-2

        ground.velocityX=-2
        //adding gravity to the mario
        mario.velocityY=mario.velocityY+0.8
        //making the infinite ground
        if(ground.x<0){
            ground.x=ground.width/2
        }
        if(scene.x<250){
            scene.x=500
        }
        
        gameOver.visible=false
        restart.visible=false

        
        

        if(mario.isTouching(obstacleGroup)){
           gameState=END
        }
    }
    if(gameState===END){
        //mario.changeAnimation("collided", mario_collided);
        //mario.scale=0.91
        mario.visible=false
        ground.velocityX=0
        scene.velocityX=0
        obstacleGroup.destroyEach()
        cloudsGroup.destroyEach()
        coinsGroup.destroyEach()
        gameState="level2"
        //cloudsGroup.setVelocityXEach(0)
        //cloudsGroup.setLifetimeEach(-1)
        //coinsGroup.setVelocityXEach(0)
        //coinsGroup.setLifetimeEach(-1)
        //obstacleGroup.setVelocityXEach(0)
        //obstacleGroup.setLifetimeEach(-1)
    }

    if(gameState==="level2"){
        if(mario.isTouching(obstacleGroup)){
            gameOver.visible=true
            gameOver.scale=1.3
            mario.destroy()
            gameState="finalEND"
            
        }
        button1.mousePressed(function(){
            //background("white")
            scene.destroy()
            scene2.visible=true
            button1.hide()
            mario.visible=true
            
        })      
    }
    score=score+Math.round(frameCount/100)
    if(gameState==="finalEND"){
        scene2.velocityX=0
            coinsGroup.setVelocityXEach(0)
            cloudsGroup.setVelocityXEach(0)
            obstacleGroup.setVelocityXEach(0)
    
            coinsGroup.destroyEach()
            cloudsGroup.destroyEach()
            obstacleGroup.destroyEach()
            score=0
    }
    
    mario.collide(ground)
    if(keyDown("space") && mario.y>=140){
        mario.velocityY=-14
    }
    ground.velocityX=-2
    //adding gravity to the mario
    mario.velocityY=mario.velocityY+0.8
    //making the infinite ground
    if(ground.x<0){
        ground.x=ground.width/2
    }
    if(gameState!="finalEND"){
        scene2.velocityX=-3
        if(scene2.x<250){
            scene2.x=600
        }
        
    }
    
    spawnObstacle()
    spawnCoins()
    spawnClouds()

            if(coinsGroup.isTouching(mario)){
                coinSound.play()
                coinSound.volume(0.3)
            }
            for(var i=0;i<coinsGroup.length;i++){
                if(mario.isTouching(coinsGroup.get(i))){
                    coinsGroup.get(i).destroy()
                }
            }
    
    drawSprites()
    fill("red")
    textSize(20)
    text("score - "+score,400,50)
}

function spawnClouds(){
    if(frameCount%160===0){
        var cloud=createSprite(600,100,30,10)
        cloud.addImage(cloudImg)
        cloud.velocityX=-2
        cloud.scale=0.5
        cloud.y=Math.round(random(50,200))
        cloud.x=Math.round(random(350,800))
        cloud.lifetime=200
        cloudsGroup.add(cloud)
    }
}

function spawnCoins(){
   if(frameCount%100===0){
       var coin=createSprite(900,300,10,10)
       coin.addImage(coinImg)
       coin.scale=0.2
       coin.velocityX=-4
       coin.y=Math.round(random(100,200))
       coinsGroup.add(coin)

   }
}

function spawnObstacle(){
    if(frameCount%80===0){
        var obstacle=createSprite(500,510,20,20)
        var rand=Math.round(random(1,3))
        switch(rand){
            case 1 : obstacle.addImage(obstacle1Img)
                    break;
            case 2 : obstacle.addImage(obstacle2Img)
                    break; 
            case 3 : obstacle.addImage(obstacle3Img)
                    break;               
        }
        obstacle.velocityX=-5
        obstacle.scale=0.4
        obstacle.x=Math.round(random(900,1000))
        obstacle.lifetime=350
        obstacleGroup.add(obstacle)
    }
}    