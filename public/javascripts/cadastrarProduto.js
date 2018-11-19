function validaCamposCadastroProdutos() {
    var erroNomeProduct, erroMarcaProduct, erroMarcaProduct, erroPrecoProduct, erroQtdProduct, erroEscalaProduct, erroCategoriaProduct;
    //RECUPERANDO TODOS OS DADOS DO FORMULARIO ENVIADO
    var retornoNomeProduct = document.FormularioProduto.inputNameProduct.value;
    var retornoEscalaProduct = document.FormularioProduto.inputEscalaProduct.value;
    var retornoMarcaProduct = document.FormularioProduto.inputMarcaProduct.value;
    var retornoPrecoProduct = document.FormularioProduto.inputPrecoProduct.value;
    var retornoQtdProduct = document.FormularioProduto.inputQuantidadeProduct.value;
    var retornoImageProduct = document.getElementById("inputImgProduct").files[0].name;
    var retornoCategoriaProduct = document.FormularioProduto.inputCategoriaProduct.value;
    // padrões de validação
    var padraoPreco = /[^0-9.]/;
    var padraoEscala = /[^0-9/]/;
    var controle = 0;
    var valida_Escala = retornoEscalaProduct.match(padraoEscala);
    var valida_Preco = retornoPrecoProduct.match(padraoPreco);
    
    console.log(retornoCategoriaProduct);
    
    if(retornoCategoriaProduct === "")
    {
        erroCategoriaProduct = document.getElementById("mesgErroCategoriaProduto");
        erroCategoriaProduct.innerHTML = "Carro, Moto ou Caminhao";
        controle = 1;
        return 0;
    }
    else{
        controle = 0;
    }
    if (retornoNomeProduct === "") {
        erroNomeProduct = document.getElementById("mesgErroNomeProduto");
        erroNomeProduct.innerHTML = "O produto deve ter um nome";
        controle = 1;
        return 0;
    }
    else{
        controle = 0;
    } 
    if (retornoMarcaProduct === "") {
        erroMarcaProduct = document.getElementById("mesgErroMarcaProduto");
        erroMarcaProduct.innerHTML = "O produto deve ter uma marca";
        controle = 1;
        return 0;
    }
    else{
        controle = 0;
    }
    if (retornoPrecoProduct === "" || valida_Preco) {
        erroPrecoProduct = document.getElementById("mesgErroPrecoProduto");
        erroPrecoProduct.innerHTML = "Insira o valor no formato indicado: XX.XX";
        controle = 1;
        return 0;
    }
    else {
        controle = 0;
    }
    if (retornoQtdProduct === "" || isNaN(retornoQtdProduct)) {
        erroQtdProduct = document.getElementById("mesgErroQtdProduto");
        erroQtdProduct.innerHTML = "Este campo não pode ser nulo ou conter letras";
        controle = 1;
        return 0;
    }
    else{
        controle = 0;
    }                
    if (retornoEscalaProduct === "" || valida_Escala) {
        erroEscalaProduct = document.getElementById("mesgErroEscalaProduto");
        erroEscalaProduct.innerHTML = "Insira no formato X/XX"
        controle = 1;
        return
    }
    else{
        controle = 0;
    }      
    
    if(controle == 0){
        
            var input = {
                nomeProduto: retornoNomeProduct,
                marca: retornoMarcaProduct,
                escala: retornoEscalaProduct,
                preco: retornoPrecoProduct,
                quantidade: retornoQtdProduct,
                imagem: retornoImageProduct,
                categoria: retornoCategoriaProduct          
            };
            $.ajax({
                url: '/produto/insere',
                type: 'post',
                data: input,
                error: function (dados) {
                    alert('Erro: 1' + dados.data);
                },
                success: function (dados) {
                    if (dados.status === 'ERRO') {
                        alert('Erro: 2' + dados.data);
                    }
                    else {
                        alert(dados.data);
                        window.location.href = '/cadastrarProduto.html';
                    }
                }
            });
    }
    else{
        console.log("não aceitou os dados");
        return 0;
    }
}