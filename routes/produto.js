var express = require('express');
var router = express.Router();

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
                console.log("cadastrou o produto");
                var inputImagem = {
                    linkImagem: input.imagem
                };
                var idProdutoRetorno = rows.insertId;
                query = connection.query("INSERT INTO imagens SET ? ", inputImagem, function (err, rows) {
                    if (err) {
                        res.json({ status: 'ERRO', data: + err });
                    }
                    else {
                        console.log("cadastrou a imagem");
                        var inputImagemProduto = {
                            produtos_id_produto: idProdutoRetorno,
                            imagens_linkImagem: input.imagem
                        };
                        query = connection.query("INSERT INTO imagens_has_produtos SET ? ", inputImagemProduto, function (err, rows) {
                            if (err) {
                                res.json({ status: 'ERRO', data: + err });
                            }
                            else {
                                console.log("cadastrou a imagem com produto");
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
                console.log(outPut);

                connection.query('SELECT imagens_linkImagem FROM imagens_has_produtos WHERE produtos_id_produto = ' + outPut.produtos[0].id_produto + ' OR produtos_id_produto = ' + outPut.produtos[1].id_produto + ' OR produtos_id_produto = ' + outPut.produtos[2].id_produto + ' ', function (err, rows) {

                    if (err) {
                        res.json({ status: 'ERRO', data: err });
                    }
                    else {
                        console.log("Resposta da consulta SQL");
                        console.log(rows);
                        var imagens = {
                            imagem: rows
                        };

                        var final = {
                            dadosProdutos: outPut,
                            dadosImagem: imagens
                        }
                        console.log(final);
                        res.json({ status: 'OK', data: final });
                    }
                });
            }
        });
    });
});





module.exports = router;