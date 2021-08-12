$("#botao-placar").click(mostrarPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Barbara";
    var numPalavras = $("#contador-palavras").text();
  
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remove").click(removeLinha);

    corpoTabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}
function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("html").animate(
    {
        scrollTop: posicaoPlacar+"px"
    },1000);
}

function novaLinha(usuario, palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavras = $("<td>").text(palavras);
    var colunaRemover = $("<td>");

    var link = $("<a>").addClass("botao-remove").attr("href", "#");
    var icone = $("<i>").text("delete").addClass("small").addClass("material-icons");

    link.append(icone);

    colunaRemover.append(link);

    linha.append(colunaUsuario);
    linha.append(colunaPalavras);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(event) {
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut(1000);
        setTimeout(function () {
             linha.remove();
        }, 1000)
}

function mostrarPlacar(){
    $(".placar").slideToggle(600);
    var posicaoPlacar = $(".placar").offset().top;
    $("html").animate(
    {
        scrollTop: posicaoPlacar+"px"
    },1000);
}
