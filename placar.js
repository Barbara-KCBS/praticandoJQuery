function inserirPlacar(){
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Barbara";
    var numPalavras = $("#contador-palavras").text();
  
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".botao-remove").click(removeLinha);

    corpoTabela.prepend(linha);
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
    $(this).parent().parent().remove();
}