var tempoInicial = $("#tempo-digitacao").text();
var campo = $('.campo-digitacao');

$(document).ready(function() {
    atualizaTamanhoFrase();
    inicializaContador();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciarJogo);

    atualizaPlacar();
    $("#usuarios").selectize({
        create: true,
        sortField: "text"
    });

    $('.tooltip').tooltipster({
        trigger: "custom"
    });
})

function atualizaTempoInicial(tempo){
    tempoInicial = tempo;
    $("#tempo-digitacao").text(tempo);
}

function atualizaTamanhoFrase() { 
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContador() {
    campo.on('input', function(){

        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\s+/).length -1;
        $("#contador-palavras").text(qtdPalavras);

        var conteudoSemEspa├žo = conteudo.replace(/\s+/g, '');
        var qtdCaracteres = conteudoSemEspa├žo.length;
        $("#contador-caracteres").text(qtdCaracteres);
    })
}

function inicializaCronometro() {
    campo.one("focus", function(){
        var tempoRestante = $("#tempo-digitacao").text();
        $("#botao-reiniciar").attr("disabled", true);
        var intervalo = setInterval(function(){
            tempoRestante --;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1){
                clearInterval(intervalo);
                finalizaJogo();
            }
        }, 1000);
    })
}

function finalizaJogo(){
    campo.attr("disabled", true);             
    $("#botao-reiniciar").attr("disabled", false);
    campo.toggleClass("campo-desativado")
    inserePlacar();
}


function inicializaMarcadores(){
     var frase = $(".frase").text();
     campo.on("input", function(){
     var digitado = campo.val();
     var comparavel = frase.substr(0, digitado.length);
     if(digitado == comparavel){
        campo.addClass("borda-verde");
        campo.removeClass("borda-vermelha");
     } else {
        campo.addClass("borda-vermelha");
        campo.removeClass("borda-verde");
     }
  })
}

function reiniciarJogo(){
    campo.attr("disabled", false);
    campo.val('');
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

