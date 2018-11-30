$(document).ready(function(){
    $.ajax({
        url: '/produto/historico',
        dataType: 'json',
        error: function (dados) {
            alert('Erro: 333 ' + dados.data);
        },
        success: function (dados) {
            if (dados.status === 'ERRO')
                alert('Erro 111: ' + dados.data);
            else{
                exibeHistorico(dados.data);
            }
        }
    });
});


function exibeHistorico(dadosCompras){
    for(var i =0;i< dadosCompras.length;i++){
 
  var novoProduto = document.createElement("div");
  novoProduto.classList.add("col-md-4");
  novoProduto.classList.add("col-12");
  novoProduto.innerHTML = '<div class="card text-white bg-dark mb-3" style="max-width: 18rem;"><div class="card-header">Compra '+dadosCompras[i].notafiscal_cod_venda+'</div><div class="card-body"><h5 class="card-title">Valor: R$'+ dadosCompras[i].quantidade*dadosCompras[i].preco +',00</h5><p class="card-text">Produto: '+dadosCompras[i].nomeProduto+' Quantidade: '+dadosCompras[i].quantidade+' Preco/un: R$'+dadosCompras[i].preco+',00</p></div></div>'
  produtosHome.appendChild(novoProduto);

    }


    
}