/* get canvas and get context */
let canvas = document.querySelector('#can');
let context = canvas.getContext('2d');
//let canvas = Engine.canvas;
//let context = Engine.ctx;
/* make the background of the game */

canvas.width = 505;
canvas.height = 520;
/* The Timer of game */

let timer = document.querySelector('.time'); // Get the Dom Object to set in it the time

let playagain = document.querySelector('.playagain'); // Play Again Button 

let movies = document.querySelector('.moves');   // Get the Dom Object to set in it number of movies

let timerCounter = null;  // time counter to refer to the intervel

/* the action when click to play again button again */
playagain.onclick = function(){
    
    window.location.reload();
};

/*
 ****************************************************
  ** This class of Player **
  ** the proparties of this class **
    * player Image
    * The player in x axis (x)
    * The player in Y axis (y)
    * The player X update to Move to Right and Left
    * The player Y update to Move to Top and Bottom
  ** The class Methods **
    * Draw Player to Draw The Player 
    * Move Player to Move  The Player
  ***************************************************   
*/
class player {
    
    constructor(x , y , xupdate , yupdate , playerimg){
        
        this.playerimg = playerimg;
        this.x = x;
        this.y = y;
        this.xupdate = xupdate;
        this.yupdate = yupdate;
    }
    
    drawplayer(){
     
          context.drawImage(img,this.x , this.y);      
     }
     // move player function 
    
    moveplayer( direction ){
        
          switch(direction){
                  
              case 37:  // the left direction
                      context.clearRect(this.x,this.y,90,160);  // clear the old image 
                      this.x -= this.xupdate;  // decrease the postion of player in x axis
                      movies.textContent++;    // increase number of movies
                      if(this.x < 0){      
                          this.x +=this.xupdate; // do not move if you arrive to bounder of the game
                          movies.textContent--;  // do not increase number of movies
                      }
                      this.drawplayer();    // draw player 
                 break;
              case 39:  // the right 
                      context.clearRect(this.x,this.y,90,160);
                      this.x += this.xupdate;
                      movies.textContent++;
                        if(this.x >= 450){                  
                          this.x -=this.xupdate;
                            movies.textContent--;
                      }
                      this.drawplayer();
                 break;
              case 38:   // the up 
                      context.clearRect(this.x,this.y,90,160);
                      this.y -= this.yupdate;
                       movies.textContent++;
                      if(this.y <= -70){
                          movies.textContent--;
                          this.y +=this.yupdate;
                      }
                      if (this.y <= -65 ) {  // end the game when you win
                         clearInterval(timerCounter);   // clear interval 
                        let popup = document.querySelector('.popup');  // get popup dom object
                        let uTime = document.querySelector('.popup .u-time span'); // get u time dom object
                        let uMovies = document.querySelector('.popup .movies span'); // get u Movies dom object
                          uTime.textContent = document.querySelector('.time').textContent;  // set your time in the popup
                          uMovies.textContent = document.querySelector('.moves').textContent; // set numbe of movies to popup
                        setTimeout(function(){
                            popup.style.display='block'; // show popup 
                        },300);  

                          }
                      this.drawplayer();
                 break;
              case 40: // the down
                      context.clearRect(this.x,this.y,90,160);
                      this.y += this.yupdate;
                     movies.textContent++;
                      if(this.y > 350){
                          movies.textContent--;
                          this.y -=this.yupdate;
                      }
                      this.drawplayer();
                 break;      
          }
   }  
    
    
}

/* end of class Player */

/*
 ****************************************************
  ** This class of enemie **
  ** the proparties of this class **
    * enemey Image
    * The enemy in x axis (x)
    * The enemey in Y axis (y)
    * The enemey X update to Move to Right 
  ** The class Methods **
    * Draw enemey to Draw The enemey 
    * Move enemey to Move  The enemy
    *  player die to chek if the player die 
  ***************************************************   
*/

class enemie{
    
    constructor(x,y,xupdate){  // contructor function fo th class
        let eneimeimage = new Image();  // create object of Image
        eneimeimage.src ='images/enemy-bug.png'; // load the image of enemy
        this.enemieImage = eneimeimage;
        this.x = x;
        this.y = y;
        this.xupdate = xupdate;
        
    }
    
    darwEnemie(){
        
        context.clearRect(this.x-this.xupdate , this.y+77 , 60, 77); // claer the old image of enemey 
       
        context.drawImage(this.enemieImage, this.x, this.y);  // draw the the enenmy image
        
    }
    
    enemieMove(){
        
        this.x += this.xupdate;  // update the postion of enenmy in the x axis
        
         if (this.x > canvas.width+5 ) { // if arrive end of the canvas make the the enemy at postion -200

            this.x = -200; // make enemy at position -200
            this.xupdate = Math.floor(Math.random() * 2+5); // change the value of x update randam 
        }
       
    }
    
    diePlayer( playerobject ){
     
              // the player is crach with the enemy
            if (Math.abs(this.y - playerobject.y) <= 10 && Math.abs(this.y - playerobject.y) >= 3 && Math.abs(playerobject.x - this.x) <= 80) {
                window.location.reload();
            }
        
   }
    
}

let img = new Image();

let playerobject = new player(200,330,100, 79,img); // create object of player

img.onload = function(){
    playerobject.drawplayer(); // inital draw player image
};

img.src = 'images/char-boy.png';  // load player image
    
let count =0;
document.onkeydown = function(event){  // when press on the key board
     count++;
    if(count === 1){  // set timer at the first time only
    timerCounter = setInterval(function(){
    timer.textContent++;  // increase timer after one scand
     },1000);
    }
    playerobject.moveplayer(event.keyCode); // change the postion of player
   
};

let arrayOfEnemies = [];  // create array of enemeies
 // add all object in the array
arrayOfEnemies.push(new enemie(-100,84,5));
arrayOfEnemies.push(new enemie(-10,7,5));
arrayOfEnemies.push(new enemie(10,162,5));
arrayOfEnemies.push(new enemie(-280,7,5));
// this funtion to update and change the position of enemies
function loopmoveenemy(){
 
requestAnimationFrame(loopmoveenemy);
    
for( var i = 0 ; i < arrayOfEnemies.length ; i++ ){    
 arrayOfEnemies[i].darwEnemie();    
 arrayOfEnemies[i].enemieMove();
 arrayOfEnemies[i].diePlayer( playerobject );   // check the player is die or not  
}
    
}
loopmoveenemy();