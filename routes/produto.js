var express = require('express');
var router = express.Router();

router.post('/deleta', function (req, res, next) {
    var id = req.query.id;
    req.getConnection(function (err, connection) {
        connection.query("SELECT imagens_linkImagem FROM imagens_has_produtos WHERE produtos_id_produto = " +id, function (err, rows) {
            if (err){
                console.log('SELECT DO IMAGEM', err);
                res.json({ status: 'ERRO', data: + err });
            }
            else{
                var input = {
                    nomeImagem: rows[0].imagens_linkImagem
                };
                connection.query("DELETE FROM imagens_has_produtos WHERE produtos_id_produto = " +id, function (err, rows){
                    if(err){
                        console.log('DELETE DA CHAVE ESTRANGEIRA', err);
                        res.json({status: 'ERRO', data: + err});
                    }
                    else{
                        console.log("NOME DA IMAGEM QUE RETORNOU", input.nomeImagem);
                        connection.query('DELETE FROM imagens WHERE linkImagem = ?', [input.nomeImagem], function (err, rows){
                            if(err){
                                console.log('DELETE DA IMAGEM', err);
                                res.json({status: 'ERRO', data: + err});
                            }
                            else{
                                connection.query("DELETE FROM produtos WHERE id_produto = " +id, function(err ,rows){
                                    if(err)
                                    {
                                        console.log('DELETE DO PRODUTO', err);
                                        res.json({status: 'ERRO', data: +err});
                                    }
                                    else{
                                        res.json({status: 'OK', data: "Produto excluído com sucesso!"});
                                    }
                                })
                            }
                        })
                    }
                })

            }
            
        });
    });
});

router.get('/pesquisa', function (req, res, next) {
    req.getConnection(function (err, connection) {
        connection.query("SELECT * FROM produtos ", function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: + err });
            res.json({ status: 'OK', data: rows });
        });
        if(err){
            res.json({status: 'ERRO', data: err});
        }
    });
});


router.post('/insere', function (req, res, next) {
    var input = req.body;
    var inputProduto = {
        nomeProduto: input.nomeProduto,
        marca: input.marca,
        escala: input.escala,
        preco: input.preco,
        quantidade: input.quantidade,
        categoria: input.categoria
    };
    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO produtos SET ? ", inputProduto, function (err, rows) {
            if (err) {
                res.json({ status: 'ERRO', data: + err });
            }
            else {
                var inputImagem = {
                    linkImagem: input.imagem
                };
                var idProdutoRetorno = rows.insertId;
                query = connection.query("INSERT INTO imagens SET ? ", inputImagem, function (err, rows) {
                    if (err) {
                        res.json({ status: 'ERRO', data: + err });
                    }
                    else {
                        var inputImagemProduto = {
                            produtos_id_produto: idProdutoRetorno,
                            imagens_linkImagem: input.imagem
                        };
                        query = connection.query("INSERT INTO imagens_has_produtos SET ? ", inputImagemProduto, function (err, rows) {
                            if (err) {
                                res.json({ status: 'ERRO', data: + err });
                            }
                            else {
                                res.json({ status: 'OK', data: 'Cadastro incluido com sucesso!' });
                            }
                        });
                    }
                });

            }

        });
    });
});

router.get('/lista', function (req, res, next) {
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM produtos ORDER BY quantidade DESC LIMIT 3', function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: err });
            else {
                var outPut = {
                    produtos: rows
                };

                connection.query('SELECT imagens_linkImagem FROM imagens_has_produtos WHERE produtos_id_produto = ' + outPut.produtos[0].id_produto + ' OR produtos_id_produto = ' + outPut.produtos[1].id_produto + ' OR produtos_id_produto = ' + outPut.produtos[2].id_produto + ' ', function (err, rows) {

                    if (err) {
                        res.json({ status: 'ERRO', data: err });
                    }
                    else {
                        var imagens = {
                            imagem: rows
                        };

                        var final = {
                            dadosProdutos: outPut,
                            dadosImagem: imagens
                        }
                        res.json({ status: 'OK', data: final });
                    }
                });
            }
        });
    });
});





router.get('/especifico', function (req, res, next) {
    var cat = req.query.categoria;
    var marca1 = req.query.marca;
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM produtos, imagens_has_produtos WHERE categoria = ? AND marca = ? AND id_produto = produtos_id_produto', [cat, marca1],function (err, rows) {
            if (err){
                res.json({ status: 'ERRO', data: err });
            }
            else{
                res.json({ status: 'OK', data: rows });
            }   
        });
    });
});




module.exports = router;