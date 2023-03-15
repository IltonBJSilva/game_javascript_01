const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
let gameOver = false; // variável para indicar se o jogo já acabou ou não


const jump =()  => {


        mario.classList.add('jump');
        mario.src = 'images/mario_jump.png'; // altera a imagem para o Mario pulando
        mario.style.width = '56px';
    


    setTimeout(() => {
        mario.classList.remove('jump');

        if (!gameOver) // não permite alterar a imagem se o jogo já acabou
        {
        mario.src = 'images/mario.gif'; // volta a imagem para o Mario correndo
        mario.style.width = '120px';
        }


    }, 500);

}

// código para detectar a colisão com o cano
const checkCollision = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');



    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {

        // Animation Pipe
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;
        
        // Mario caiu em cima do cano
        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`;

        mario.src = 'images/game-over.png';

        mario.style.width = '75px';
        mario.style.marginLeft = '50px';
        clearInterval(checkCollision);
        gameOver = true; // marca o jogo como acabado

        document.removeEventListener('keydown', jump); // remove o evento de salto
        }




    }, 10);

document.addEventListener('keydown', jump);