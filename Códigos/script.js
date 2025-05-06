//Evento de load ao clicar no botão iniciar
document.addEventListener("DOMContentLoaded",function(){
    //Animação da tela de load
    const cards = document.querySelectorAll('.card');
    function embaralhar(){
        const posicoes = [120, 0, -120];
            cards.forEach((card,index) =>{
                card.style.transform = `translateX(${posicoes[index]}px)`;
            });
            setTimeout(() =>{
                cards.forEach((card) =>{
                    card.style.transform ='';
                });
            },500);
            setTimeout(embaralhar,1000);
        }
    embaralhar();
    //Evento de load
document.getElementById("iniciar").addEventListener("click",
    function(){
        //Sumi o conteúdo da tela
        document.getElementById("conteudo").style.display="none";
        //Esconder regras do jogo após inciar
        document.getElementById("regras").style.display = "none"
        //Mostra tela de carregamento
        document.getElementById("load-screen").style.display="flex";
        //Som da tela de carregamento
        document.getElementById('som-carregamento').play();
        //Tempo de carregamento das cartas//
        setTimeout(function(){
            //Função de retirar a imagem de fundo do body e da tela de load
            document.body.style.backgroundImage="none";
            document.body.style.backgroundColor="#060ab2";
            document.getElementById("load-screen").style.backgroundImage="none";
            document.getElementById("load-screen").style.backgroundColor="#060ab2";
            //Encerramentoda tela de carregamento
            document.getElementById("load-screen").style.display="none";
            document.getElementById("game").style.display="block";
            //Pause do som
            document.getElementById('som-carregamento').pause();
            document.getElementById('som-carregamento').currentTime = 0;
         }, 7000);
     });
 });
const memoria = document.querySelectorAll('.carta');

let hasFlippedCarta = false;
let lockBoard = false;
let firstCarta, secondCarta;
//Variáveis para contas acertos e erros
let acertos = 0;
let erros = 0;
//Atualizar o placar de acertos e erros
function atualizarPlacar(){
    document.getElementById("acertos").innerHTML = acertos;
    document.getElementById("erros").innerHTML = erros;
}

function flipCarta(){ 
    
    if (lockBoard) return;
    if (this === firstCarta) return;

    this.classList.add('flip');
    var som = document.createElement('audio');
    som.src='flipcard.mp3';
    som.play();
    

    if (!hasFlippedCarta) {
        hasFlippedCarta = true;
        firstCarta = this;
        return;
    }

    secondCarta = this;
    lockBoard = true;
    checkForMatch();
}
//Atualizar o placar a cada evento de acerto e erro
function checkForMatch(){
    let isMatch = firstCarta.dataset.framework === secondCarta.dataset.framework;
    if(isMatch){
        //Som de acerto
        var som = document.createElement('audio');
        som.src = 'acerto.mp3';
        som.play();
        acertos++;
        atualizarPlacar();
        disableMemoria()

    } else {
        //Som de erro
        var som = document.createElement('audio');
        som.src = 'erro.mp3';
        som.play();
        erros++;
        atualizarPlacar();
        unflipMemoria();
    }
}
function disableMemoria(){
    firstCarta.removeEventListener('click', flipCarta);
    secondCarta.removeEventListener('click', flipCarta);
    resetBoard();
    verificarVitoria();
}
function verificarVitoria(){
    let cartasViradas = document.querySelectorAll('.carta.flip');
    if(cartasViradas.length === memoria.length){
        document.body.style.backgroundImage = "url('vitoria.jpg')";
        document.body.style.backgroundSize = "cover";
        document.getElementById("game").style.display = "none";
        document.getElementById("placar").style.display = "block";
        document.getElementById("reiniciar").style.display = "block"
        var som = document.createElement('audio');
        som.src = 'Efeito Sonoro - CRIANÇAS COMEMORANDO(MP3_160K).mp3';
        som.play();
        }
    }

function unflipMemoria(){
    lockBoard = true;
    setTimeout(() =>{
        firstCarta.classList.remove('flip');
        secondCarta.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCarta, lockBoard] = [false, false];
    [firstCarta, secondCarta] = [null, null];
}

(function shuffle(){
    memoria.forEach(card =>{
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
})();

memoria.forEach(carta => carta.addEventListener('click', flipCarta));

document.getElementById("reiniciar").addEventListener("click", function(){
    //Reiniciar o jogo
    acertos = 0;
    erros = 0;
    atualizarPlacar();
    memoria.forEach(carta => carta.classList.remove("flip"));
    memoria.forEach(card =>{
        let ramdomPos = Math.floor(Math.random() * 12);
        card.style.order = ramdomPos;
    });
    //Reiniciar aparti da tela de load
    const cards = document.querySelectorAll('.card');
    function embaralhar(){
        const posicoes = [120, 0, -120];
            cards.forEach((card,index) =>{
                card.style.transform = `translateX(${posicoes[index]}px)`;
            });
            setTimeout(() =>{
                cards.forEach((card) =>{
                    card.style.transform ='';
                });
            },500);
            setTimeout(embaralhar,1000);
        }
    embaralhar();
        document.getElementById("reiniciar").style.display = "none";
        document.getElementById("placar").style.display = "none";
        document.getElementById("load-screen").style.display="flex";
        document.getElementById("load-screen").style.background = "";
        document.getElementById('som-carregamento').play();

        setTimeout(function(){
            document.getElementById("load-screen").style.display="none";
            document.getElementById("game").style.display="block";
            document.body.style.backgroundImage="none";
            document.body.style.backgroundColor="#060ab2";
            document.getElementById('som-carregamento').pause();
            document.getElementById('som-carregamento').currentTime = 0;
         }, 7000);
     });
