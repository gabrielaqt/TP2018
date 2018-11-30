var express = require('express');
var router = express.Router();

router.post('/deleta', function (req, res, next) {
    var id = req.query.id;
    req.getConnection(function (err, connection) {
        connection.query("SELECT imagens_linkImagem FROM imagens_has_produtos WHERE produtos_id_produto = " + id, function (err, rows) {
            if (err) {
                res.json({ status: 'ERRO', data: + err });
            }
            else {
                var input = {
                    nomeImagem: rows[0].imagens_linkImagem
                };
                connection.query("DELETE FROM imagens_has_produtos WHERE produtos_id_produto = " + id, function (err, rows) {
                    if (err) {
                        res.json({ status: 'ERRO', data: + err });
                    }
                    else {
                        connection.query('DELETE FROM imagens WHERE linkImagem = ?', [input.nomeImagem], function (err, rows) {
                            if (err) {
                                res.json({ status: 'ERRO', data: + err });
                            }
                            else {
                                connection.query("DELETE FROM produtos WHERE id_produto = " + id, function (err, rows) {
                                    if (err) {
                                        res.json({ status: 'ERRO', data: +err });
                                    }
                                    else {
                                        res.json({ status: 'OK', data: "Produto excluído com sucesso!" });
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
        if (err) {
            res.json({ status: 'ERRO', data: err });
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
        connection.query('SELECT * FROM produtos, imagens_has_produtos WHERE produtos_id_produto = id_produto ORDER BY quantidade DESC LIMIT 3', function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: err });
            else {
                res.json({ status: 'OK', data: rows });
            }
        });
    });
});





router.get('/especifico', function (req, res, next) {
    var cat = req.query.categoria;
    var marca1 = req.query.marca;
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM produtos, imagens_has_produtos WHERE categoria = ? AND marca = ? AND id_produto = produtos_id_produto', [cat, marca1], function (err, rows) {
            if (err) {
                res.json({ status: 'ERRO', data: err });
            }
            else {
                res.json({ status: 'OK', data: rows });
            }
        });
    });
});

router.get('/listaCompra', function (req, res, next) {
    var ids = req.query.ids;
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM produtos, imagens_has_produtos WHERE id_produto = produtos_id_produto AND id_produto IN  ' + "(" + ' ' + ids + ' ' + ")" + '', function (err, rows) {
            if (err) {
                res.json({ status: 'ERRO', data: err });
            }
            else {
                res.json({ status: 'OK', data: rows });
            }
        });
    });
});

router.post('/atualizaEstoque', function (req, res, next) {

    var input = req.body;
    console.log("INPUT:");
    console.log(input);
    var inputDados = {
        id_produto: input.id,
        quantidade: input.qtd

    };


    req.getConnection(function (err, connection) {
        var count = 1;
        connection.query('SELECT quantidade,preco FROM produtos WHERE id_produto IN ' + "(" + ' ' + inputDados.id_produto + ' ' + ")" + '', function (err, rows) {
            console.log(rows);

            if (err) {
                res.json({ status: 'ERRO', data: err });
            }
            else {
                var i;
                var ok = 0;
                var ok2 = 0;
                var arrayQTD = new Array();
                var arrayCompraQNT = new Array();
                var arrayID = new Array();
                var arrayQntCompra = new Array();
                arrayID = inputDados.id_produto.split(",");
                arrayQTD = inputDados.quantidade.split(",");
                for (var i = 0; i < arrayQTD.length; i++) {
                    arrayCompraQNT[i] = arrayQTD[i];
                    arrayQntCompra[i] = rows[i].quantidade;
                    arrayQTD[i] = rows[i].quantidade - arrayQTD[i];
                }
                var arrayPreco = new Array();


                for (var i = 0; i < arrayQTD.length; i++) {
                    arrayPreco[i] = rows[i].preco;


                }


                console.log(arrayQTD, arrayID, arrayPreco, arrayCompraQNT, arrayQntCompra);
                for (var i = 0; i < arrayQTD.length; i++) {
                    var resultadoPreco = 0;
                    console.log(arrayQTD[i], arrayID[i], arrayPreco[i]);
                    connection.query('UPDATE produtos SET quantidade = ? WHERE id_produto = ?', [arrayQTD[i], arrayID[i]], function (err, rows) {
                        if (err) {
                            console.log(err);
                            res.json({ status: 'ERRO', data: err });
                        }
                        else {

                            ok++;
                            if (ok === arrayQTD.length) {

                                connection.query('SELECT idEndereco FROM cliente_has_endereco WHERE idCliente = ?', [req.session.idCliente], function (err, rows) {
                                    console.log("aqui ok:");
                                    var idClienteSession = req.session.idCliente;

                                    if (err) {
                                        console.log(err);
                                        res.json({ status: 'ERRO', data: err });
                                    }
                                    else {
                                        var idEndRetorno = rows[0].idEndereco;

                                        var inputNotaFiscal = {
                                            idCliente: idClienteSession,
                                            idEndereco: idEndRetorno
                                        };
                                        connection.query('INSERT INTO notafiscal SET ?', inputNotaFiscal, function (err, rows) {
                                            if (err) {
                                                console.log(err);
                                                res.json({ status: 'ERRO', data: + err });

                                            }
                                            else {
                                                var idVendaRetorno = rows.insertId;
                                                console.log(idVendaRetorno);
                                                console.log("SUCESSO DO INPUT");
                                                console.log(rows);


                                                for (k = 0; k < arrayQTD.length; k++) {
                                                    resultadoPreco = (arrayPreco[k] * arrayCompraQNT[k])

                                                    var inputTabelaHas = {
                                                        notafiscal_cod_venda: idVendaRetorno,
                                                        produtos_id_produto: arrayID[k],
                                                        quantidade: arrayCompraQNT[k],
                                                        preco: arrayPreco[k],
                                                        valorFinal: resultadoPreco


                                                    };
                                                    console.log(inputTabelaHas);
                                                    connection.query('INSERT INTO notafiscal_has_produtos SET ?', inputTabelaHas, function (err, rows) {
                                                        if (err) {
                                                            console.log(err);
                                                            res.json({ status: 'ERRO', data: err });

                                                        }
                                                        else {
                                                            ok2++;
                                                            if (ok2 == arrayQTD.length) {

                                                                res.json({ status: 'OK', data: "ok" });
                                                            }
                                                        }
                                                    });
                                                }









                                            }
                                        });




                                    }
                                });
                            }
                        }
                    });
                }

            }
        })
    })
})

router.get('/pesquisarProdutos', function (req, res, next) {
    var palavraPesquisa = req.query.pesquisa;
    console.log("ROTA :", palavraPesquisa);
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM produtos,imagens_has_produtos WHERE id_produto = produtos_id_produto AND (nomeProduto LIKE "%' + palavraPesquisa + '%" OR marca LIKE "%' + palavraPesquisa + '%" OR categoria LIKE "%' + palavraPesquisa + '%")', function (err, rows) {
            if (err) {
                console.log(err);
                res.json({ status: "ERRO", data: + err });
            }
            else {
                console.log(rows);
                res.json({ status: "ok", data: rows });
            }
        });

    });
});

router.get('/historico', function(req,res,next){
    console.log("ENTROU NA ROTA ");
    req.getConnection(function (err, connection) {
        connection.query('SELECT notafiscal_has_produtos.quantidade,notafiscal_has_produtos.preco,nomeProduto,notafiscal_cod_venda  FROM notafiscal,notafiscal_has_produtos,produtos WHERE produtos_id_produto = id_produto AND cod_venda = notafiscal_cod_venda AND idCliente = ?',[req.session.idCliente],function(err,rows){
            
                if (err) {
                    console.log(err);
                    res.json({ status: "ERRO", data: + err });
                }
                else {
                    console.log(rows);
                    res.json({ status: "ok", data: rows });
                }
        });
    });
});

module.exports = router;