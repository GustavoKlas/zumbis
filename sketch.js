var bg,bgImg;
var player, shooterImg, shooter_shooting;
var bulletsound, bullet, bullets
var zombieImg, zombie, zombies
var cc
var score = 0
var lives = 3
var gameStopped = false
function preload(){
  bulletImg = loadImage("assets/bullet1.png")
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
zombieImg = loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletsound = loadSound("assets/tiro.mp3")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  losesound = loadSound("assets/explosion.mp3")
  winsound = loadSound("assets/win.mp3")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adicionando a imagem de fundo
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  bullets = new Group();
zombies = new Group();
//criando o sprite do jogador
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.4
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)

    

}

function draw() {
  background(0); 
  console.log(mouseX, mouseY)
  
for (var i = 0; i< zombies.length;i++){
  if (zombies[i].isTouching(bullets)){
    zombies[i].destroy()  
    score = score + 50
  }
}

  //movendo o jogador para cima e para baixo e tornando o jogo compatível com dispositivos móveis usando toques
if(keyDown("UP_ARROW") && gameStopped == false){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW") && gameStopped == false){
 player.y = player.y+30
}

//solte balas e mude a imagem do atirador para a posição de tiro quando a tecla de espaço for pressionada
if(keyWentDown("space") && gameStopped == false){
 
  player.addImage(shooter_shooting)
 shoot()
}

//o jogador volta à imagem original quando pararmos de pressionar a barra de espaço
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if (score < 1000){
createZombie()
}
drawSprites();
textSize(30)
fill("white")
text("Score: " + score, 130, 50)
if (score == 1000){
  victory()
 
}
loseHealth()
}
function createZombie(){
  //criando o zumbi

if (frameCount %60 === 0 && gameStopped ==false){ 
   zombie = createSprite( random(500, 1100),random(100, 500), 50, 50  );
  zombie.addImage(zombieImg)
  zombie.scale = 0.2   
  zombie.setCollider("rectangle",0,0,300,800)
  zombie.debug = true
  zombies.add(zombie);
  zombie.velocityX = random(-1, -10)
  
}
}
function shoot(){
  
  
    bullet = createSprite(player.x , player.y, 20, 20)
    bullet.velocityX = 20
    bullet.depth = player.depth
    bullet.addImage(bulletImg)
    bullet.scale = 0.15
    bullet.lifetime = 600
    bulletsound.play();
    bullets.add(bullet);
    zombies.depth = bullets.depth
  
  
}
function victory(){

zombie.velocityX = 0
textSize(100)
text("Você ganhou!", windowWidth/2, windowHeight/2)
  winsound.play
}

function  loseHealth(){
  for (var i = 0; i< zombies.length;i++){
  if (zombies[i].x<player.x){
 lives-=1
  }
}
  if (lives <=0){
    gameOver()
  }
  }
  function gameOver(){
    zombie.velocityX = 0
    textSize(100)
    text("Você perdeu...", windowWidth/2, windowHeight/2)
    losesound.play()
    
   gameStopped = true
  }