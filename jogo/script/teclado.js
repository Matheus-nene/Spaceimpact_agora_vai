// Códigos de teclas - aqui vão todos os que forem necessários
var SETA_ESQUERDA = 37;
var SETA_ESQUERDA2 = 65;
var SETA_ACIMA = 38;
var SETA_ACIMA2 = 87;
var SETA_DIREITA = 39;
var SETA_DIREITA2 = 68;
var SETA_ABAIXO = 40;
var SETA_ABAIXO2 = 83;
var PAUSE = 80;
var ESPACO = 32;
var ENTER = 13;

function Teclado(elemento) {
   this.elemento = elemento;

   this.pressionadas = [];

   this.disparadas = [];

   this.funcoesDisparo = [];

   var teclado = this;

   elemento.addEventListener('keydown', function(evento) {
      var tecla = evento.keyCode; 
      teclado.pressionadas[tecla] = true;

      if (teclado.funcoesDisparo[tecla] && !teclado.disparadas[tecla]) {

          teclado.disparadas[tecla] = true;
          teclado.funcoesDisparo[tecla] () ;
      }
   });

   elemento.addEventListener('keyup', function(evento) {
      teclado.pressionadas[evento.keyCode] = false;
      teclado.disparadas[evento.keyCode] = false;
   });
}
Teclado.prototype = {
   pressionada: function(tecla) {
      return this.pressionadas[tecla];
   },
   disparou: function(tecla, callback) {
      this.funcoesDisparo[tecla] = callback;
   }
}
