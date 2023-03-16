// Constantes
const mario = document.querySelector('.mario'); // Elemento HTML do Mario
const pipe = document.querySelector('.pipe'); // Elemento HTML do cano
const mario_jump = new Audio('mp3/mario_jump.mp3'); // som do Mario pulando
const mario_dead = new Audio('mp3/mario_dead.mp3'); // som do Mario morrendo
const mario_sound = new Audio('mp3/mario_sound.mp3'); // som do jogo do Mario 

// Let
let gameOver = false; // variável para indicar se o jogo já acabou ou não
let score = 0; // Pontuação inicial
const scoreElement = document.getElementById('score'); // Elemento HTML para exibir a pontuação
scoreElement.textContent = score; // Atualiza o elemento HTML com a pontuação inicial

// Atualiza a pontuação
function updateScore() {
    if (gameOver) {
      return; // Para a atualização da pontuação caso gameOver seja verdadeiro
    }
    
    score += 1; // Incrementa a pontuação em 1
    scoreElement.textContent = score;
  }

// Função para iniciar o cronômetro
function startTimer() {
    const timerElement = document.getElementById('timer'); // Elemento HTML para exibir o tempo
    let seconds = 0; // Contador de segundos
  
    // Cria um intervalo que será executado a cada segundo
    const timerInterval = setInterval(() => {
      if (gameOver) {
        clearInterval(timerInterval); // Para o cronômetro quando gameOver for true
        return;
      }
      
      seconds++; // Incrementa o contador de segundos
      const formattedTime = new Date(seconds * 1000).toISOString().substr(14, 5); // Formata o tempo decorrido no formato MM:SS
      timerElement.textContent = formattedTime; // Atualiza o elemento HTML com o tempo decorrido
    }, 1000); // A cada segundo
  
    return timerInterval; // Retorna o ID do intervalo para poder parar o cronômetro depois
  }

  startTimer(); // Inicia o cronômetro


// Função para pular
const jump =()  => {
        mario.classList.add('jump');
        mario.src = 'images/mario_jump.png'; // altera a imagem para o Mario pulando
        mario.style.width = '56px';
        mario_jump.play();
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
    mario_sound.play();

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
        mario_dead.play(); // toca o som do Mario morrendo
        mario_sound.pause(); // para o som do Mario correndo

        // Animation Pipe
        pipe.style.animation = 'none'; // para a animação do cano
        pipe.style.left = `${pipePosition}px`; // altera a posição do cano para a mesma do Mario
        
        // Mario caiu em cima do cano
        mario.style.animation = 'none'; // para a animação do Mario
        mario.style.bottom = `${marioPosition}px`; // altera a posição do Mario para a mesma do cano

        mario.src = 'images/game-over.png'; // altera a imagem para o Mario morrendo
        mario.style.width = '75px'; // altera a largura da imagem
        mario.style.marginLeft = '50px'; // altera a margem esquerda da imagem
        clearInterval(checkCollision); // para a verificação de colisão
        gameOver = true; // marca o jogo como acabado

        document.removeEventListener('keydown', jump); // remove o evento de salto
        }
        else{

            updateScore(); // atualiza a pontuação
        } 
    }, 10); // verifica a colisão a cada 10 milissegundos

// Evento para detectar o clique do mouse
document.addEventListener('keydown', jump); // adiciona o evento de salto