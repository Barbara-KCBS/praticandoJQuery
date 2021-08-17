$("#botao-placar").click(mostrarPlacar);
$("#botao-sync").click(sincronizaPlacar);

function inserePlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
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

function sincronizaPlacar(){
    var placar = [];
    var linhas = $("tbody>tr");
    linhas.each(function(){
        var usuario = $(this).find("td:nth-child(1)").text();
        var palavras = $(this).find("td:nth-child(2)").text();

        var score = {
            usuario: usuario,
            pontos: palavras
        };

        placar.push(score);

    });

    var dados = {
        placar: placar
    };

    $.post("http://localhost:3000/placar", dados, function(){
        console.log("salvou placar")
        $(".tooltip").tooltipster("open").tooltipster("content", "Sucesso ao sincronizar");
    }).fail(function(){
        $(".tooltip").tooltipster("open").tooltipster("content", "Falha ao sincronizar");
    }).always(function(){
        setTimeout(() => {
           $(".tooltip").tooltipster("close") 
        }, 1200);
    })
}

function atualizaPlacar(){

    $.get("http://localhost:3000/placar", function(data){
         $(data).each(function(){
             var linha = novaLinha(this.usuario, this.pontos);
             linha.find(".botao-remove").click(removeLinha);
             $("tbody").append(linha);
        }); 
    });

}