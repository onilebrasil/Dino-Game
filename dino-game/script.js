/*Criando asprincipais váriaveis*/

const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping= false
let isGameOver= false
let position = 0

/*Criando as funções de pulo*/

function handleKeyUp (event) {
  if (event.keyCode === 32) {
  if (!isJumping) {
    jump();
  } 
  }
}

function jump() {
 isJumping = true

 let upInterval = setInterval(() => {

  if (position >= 150) {
   
  clearInterval (upInterval);
  
  let downInterval = setInterval (() => {
   if (position <= 0) {

     clearInterval(downInterval);
     isJumping = false;  

   } else {
     position -= 20;
     dino.style.bottom = position + 'px'; 
   }
  }, 20);
  
 } else {
   position += 20;
   dino.style.bottom = position + 'px';  
 } 
 }, 20); 
}

/*Configurando o cacto*/

function creatCactus () {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
   if (cactusPosition < -60) {
   
   clearInterval (leftTimer);
   background.removeChild(cactus);

   } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {

    clearInterval(leftTimer);
    isGameOver = true;
    document.body.innerHTML = '<h1 class="game over">Fim de Jogo</h1>';

  } else {
     cactusPosition -= 10;
     cactus.style.left = cactusPosition + 'px';
   }
  
  }, 20);
  setTimeout (creatCactus, randomTime);
}


/*iniciando o jogo*/
creatCactus();
document.addEventListener('keyUp', handleKeyUp);
