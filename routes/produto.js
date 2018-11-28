var express = require('express');
var router = express.Router();

router.post('/deleta', function (req, res, next) {
    var id = req.query.id;
    req.getConnection(function (err, connection) {
        connection.query("SELECT imagens_linkImagem FROM imagens_has_produtos WHERE produtos_id_produto = " +id, function (err, rows) {
            if (err){
                res.json({ status: 'ERRO', data: + err });
            }
            else{
                var input = {
                    nomeImagem: rows[0].imagens_linkImagem
                };
                connection.query("DELETE FROM imagens_has_produtos WHERE produtos_id_produto = " +id, function (err, rows){
                    if(err){
                        res.json({status: 'ERRO', data: + err});
                    }
                    else{
                        connection.query('DELETE FROM imagens WHERE linkImagem = ?', [input.nomeImagem], function (err, rows){
                            if(err){
                                res.json({status: 'ERRO', data: + err});
                            }
                            else{
                                connection.query("DELETE FROM produtos WHERE id_produto = " +id, function(err ,rows){
                                    if(err)
                                    {
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
        connection.query('SELECT * FROM produtos, imagens_has_produtos WHERE produtos_id_produto = id_produto ORDER BY quantidade DESC LIMIT 3', function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: err });
            else {
                res.json({status: 'OK', data: rows});
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

router.get('/listaCompra', function (req,res,next){
    var ids = req.query.ids;
    console.log(ids);
    req.getConnection(function (err, connection){
        connection.query('SELECT * FROM produtos, imagens_has_produtos WHERE id_produto = produtos_id_produto AND id_produto IN  '+ "(" +' '+ ids +' '+ ")" +'', function (err, rows){
            if(err){
                console.log(err);
                res.json({status: 'ERRO', data: err});
            }
            else{
                res.json({status: 'OK', data: rows});
                console.log("RESULTADO DA CONSULTA:::::", rows);
            }
        });
    });    
});




module.exports = router;