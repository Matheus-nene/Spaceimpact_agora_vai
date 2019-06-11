var canvas = document.getElementById('canvas_animacao');
var context = canvas.getContext('2d');

var imagens, animacao, teclado, colisor, nave, criadorInimigos;
var totalImagens = 0, carregadas = 0;
var musicaAcao;

carregarImagens();
carregarMusicas();

function carregarImagens() {

    imagens = {
        espaco: 'fundo_black.jpeg',
        estrelas: 'estrelinha1.png',
        nuvens: 'estrelinha1.png',
        nave: '75x112.png',
        ovni: '5050verde.png',
        explosao: 'explosao.png'
    };

    for (var i in imagens) {
        var img = new Image();
        img.src = 'img/' + imagens[i];
        img.onload = carregando;
        totalImagens++;

        imagens[i] = img;
    }
}

function carregando() {
    context.save();

    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);

    carregadas++;
    var tamanhoTotal = 300;
    var tamanho = carregadas / totalImagens * tamanhoTotal;
    context.fillStyle = '#171717';
    context.fillRect(100, 250, tamanho, 50);

    context.restore();

    if (carregadas == totalImagens) {
        iniciarObjetos();
    }
}

function iniciarObjetos() {

    animacao = new Animacao(context);
    teclado = new Teclado(document);
    colisor = new Colisor();
    espaco = new Fundo(context, imagens.espaco);
    estrelas = new Fundo(context, imagens.estrelas);
    nuvens = new Fundo(context, imagens.nuvens);
    nave = new Nave(context, teclado, imagens.nave, imagens.explosao);
    painel = new Painel(context, nave);

    animacao.novoSprite(espaco);
    animacao.novoSprite(estrelas);
    animacao.novoSprite(nuvens);
    animacao.novoSprite(painel);
    animacao.novoSprite(nave);

    colisor.novoSprite(nave);
    animacao.novoProcessamento(colisor);

    configuracoesIniciais();
}

function configuracoesIniciais() {

    espaco.velocidade = 60;
    estrelas.velocidade = 150;
    nuvens.velocidade = 500;

    nave.posicionar();
    nave.velocidade = 200;

    criacaoInimigos();

    nave.acabaramVidas = function () {
        animacao.desligar();
        gameOver();

    }

    colisor.aoColidir = function (o1, o2) {

        if ((o1 instanceof Tiro && o2 instanceof Ovni) || (o1 instanceof Ovni && o2 instanceof Tiro)){
            painel.pontuacao += 100;
        }
        if(painel.pontuacao == 2500){
            pauseTrocaDeFase1();
        } else if (painel.pontuacao == 5000){
            // pauseTrocaDeFase2();
        }
    }
}

console.log(aoColidir = pontuacaoTotal);


function criacaoInimigos() {
    criadorInimigos = {
        ultimoOvni: new Date().getTime(),

        processar: function () {
            var agora = new Date().getTime();
            var decorrido = agora - this.ultimoOvni;

            if (decorrido > 350) {
                novoOvni();
                this.ultimoOvni = agora;
            }
        }
    };

    animacao.novoProcessamento(criadorInimigos);
}

function novoOvni() {
    var imgOvni = imagens.ovni;
    var ovni = new Ovni(context, imgOvni, imagens.explosao);

    ovni.velocidade =
        Math.floor(300 + Math.random() * (300 - 150 + 1));
 
    ovni.x =
        Math.floor(Math.random() *
            (canvas.width - imgOvni.width + 1));

    ovni.y = -imgOvni.height;

    animacao.novoSprite(ovni);
    colisor.novoSprite(ovni);
}

function pausarJogo() {
    if (animacao.ligado) {
        animacao.desligar();
        ativarTiro(false);
        context.save();
        context.fillStyle = 'white';
        context.strokeStyle = 'black';
        context.font = '50px Baloo Bhai';
        context.fillText("Pausado", 160, 200);
        context.strokeText("Pausado", 160, 200);
        context.restore();
    }
    else {
        criadorInimigos.ultimoOvni = new Date().getTime();
        animacao.ligar();
        ativarTiro(true);
    }
}
function pauseTrocaDeFase1(){
    if(animacao.ligado){
        animacao.desligar();
        ativarTiro(false);
        context.save();
        context.fillStyle = 'white';
        context.strokeStyle = 'red';
        context.font = '50px Baloo Bhai';
        context.fillText("Segunda Fase", 90, 200);
        context.restore();
        mostrarLinkSegundaFase();

    }
    else{
        criadorInimigos.ultimoOvni = new Date().getTime();
        animacao.ligar();
        ativarTiro(true);
    }
}

function pauseTrocaDeFase2(){
    if(animacao.ligado){
        animacao.desligar();
        ativarTiro(false);
        context.save();
        context.fillStyle = 'white';
        context.strokeStyle = 'red';
        context.font = '50px Baloo Bhai';
        context.fillText("Terceira Fase", 90, 200);
        context.restore();
    }
    else{
        criadorInimigos.ultimoOvni = new Date().getTime();
        animacao.ligar();
        ativarTiro(true);
    }
}

function ativarTiro(ativar) {
    if (ativar) {
        teclado.disparou(ESPACO, function () {
            nave.atirar();
        });
    }
    else
        teclado.disparou(ESPACO, null);
}

function carregarMusicas() {
    musicaAcao = new Audio();
    musicaAcao.src = 'snd/musica-acao03.mp3';
    musicaAcao.load();
    musicaAcao.volume = 0.8;
    musicaAcao.loop = true;
}
function mostrarLinkSegundaFase(){
    document.getElementById('link_segundafase').style.display = 'block';
}

function mostrarLinkMenu(){
    document.getElementById('link_menu').style.display = 'block';
}

function mostrarLinkJogar() {
    document.getElementById('link_jogar').style.display = 'block';
}

function iniciarJogo() {
    
    criadorInimigos.ultimoOvni = new Date().getTime();

    ativarTiro(true);

    teclado.disparou(PAUSE, pausarJogo);

    document.getElementById('link_jogar').style.display = 'none';
    document.getElementById('link_menu').style.display = 'none';
    document.getElementById('link_segundafase').style.display = 'none';

    painel.pontuacao = 0;
    musicaAcao.play();
    animacao.ligar();
}

// function postarPontuacao(){

//     context.save();
//     context.fillStyle = 'white';
//     context.strokeStyle = 'red';
//     context.font = '30px Baloo Bhai';
//     context.fillText("SUA PONTUACAO: " , 70, 300);
//     context.strokeText("SUA PONTUACAO: " , 70, 300);
//     context.restore();

// }

function gameOver() {

    ativarTiro(false);

    teclado.disparou(PAUSE, null);

    musicaAcao.pause();
    musicaAcao.currentTime = 0.0;

    context.drawImage(imagens.espaco, 0, 0, canvas.width, canvas.height);

    context.save();
    context.fillStyle = 'white';
    context.strokeStyle = 'red';
    context.font = '70px Baloo Bhai';
    context.fillText("GAME OVER", 40, 200);
    context.strokeText("GAME OVER", 40, 200);
    context.restore();

    // mostrarLinkJogar();
    mostrarLinkMenu();
    // postarPontuacao();

    nave.vidasExtras = 3;
    nave.posicionar();
    animacao.novoSprite(nave);
    colisor.novoSprite(nave);

    removerInimigos();

}

function removerInimigos() {
    for (var i in animacao.sprites) {
        if (animacao.sprites[i] instanceof Ovni)
            animacao.excluirSprite(animacao.sprites[i]);
    }
}