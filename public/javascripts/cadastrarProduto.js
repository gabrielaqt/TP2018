function validaCamposCadastroProdutos(){
    var erroNomeProduct, erroMarcaProduct, erroMarcaProduct, erroPrecoProduct, erroQtdProduct, erroEscalaProduct;
//RECUPERANDO TODOS OS DADOS DO FORMULARIO ENVIADO
    var retornoNomeProduct = document.FormularioProduto.inputNameProduct.value;
    var retornoEscalaProduct = document.FormularioProduto.inputEscalaProduct.value;
    var retornoMarcaProduct = document.FormularioProduto.inputMarcaProduct.value;
    var retornoPrecoProduct = document.FormularioProduto.inputPrecoProduct.value;
    var retornoQtdProduct = document.FormularioProduto.inputQuantidadeProduct.value;
    // /[^0-9.]/;
    var padraoPreco = /[^0-9.]/;
    var padraoEscala = /[^0-9/]/;
    
    var valida_Escala = retornoEscalaProduct.match(padraoEscala);
    var valida_Preco = retornoPrecoProduct.match(padraoPreco);
    console.log(retornoPrecoProduct);
//VALIDAÇÃO DO NOME -> NÃO PODE SER NULO

    if(retornoNomeProduct === ""){
        erroNomeProduct = document.getElementById("mesgErroNomeProduto");
        erroNomeProduct.innerHTML = "O produto deve ter um nome";
        return 0;
    }
    else{
       if(retornoMarcaProduct === ""){
           erroMarcaProduct = document.getElementById("mesgErroMarcaProduto");
           erroMarcaProduct.innerHTML = "O produto deve ter uma marca";
           return 0;
       }
       else{
           if(retornoPrecoProduct === "" || valida_Preco){
               erroPrecoProduct = document.getElementById("mesgErroPrecoProduto");
               erroPrecoProduct.innerHTML = "Insira o valor no formato indicado: XX.XX";
           }
           else{
               if(retornoQtdProduct === "" || isNaN(retornoQtdProduct)){
                erroQtdProduct = document.getElementById("mesgErroQtdProduto");
                erroQtdProduct.innerHTML = "Este campo não pode ser nulo ou conter letras";
               } 
               else{
                   if(retornoEscalaProduct === "" || valida_Escala)
                   {
                       erroEscalaProduct = document.getElementById("mesgErroEscalaProduto");
                       erroEscalaProduct.innerHTML = "Insira no formato X/XX"
                   }
               }
           }
           
       }
    }
}