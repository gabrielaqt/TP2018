var express = require('express');
var router = express.Router();


router.get('/logado', function (req, res, next){
    if(req.session.logadoAdmin)
    {
        var input = {
            statusCliente: '',
            nomeCliente: '',
            statusAdmin: 'LogadoAdmin'
        };

        res.json({status: 'OK', data: input});
    }
    else{
        if(req.session.logadoCliente)
        {
            var input = {
                statusCliente: 'LogadoCliente',
                nomeCliente: req.session.nomeCliente
            }
            res.json({status: 'OK', data: input});
        }
        else{
            res.json({status: 'SemAcesso', data: 'Usuário precisa estar logado!'});
        }
    }
});
router.post('/login', function (req, res, next) {
    var input = req.body;
    req.getConnection(function (err, connection) {
        connection.query("SELECT * FROM Cliente WHERE email = ? AND senha = ?", [input.login, input.senha], function (err, rows) {
            if (err) {
                res.json({ status: 'ERRO', data: + err });
            }
            else {
                if (rows[0] === undefined) {
                    res.json({
                        status: 'ERRO',
                        data: 'Dados de login incorretos!'
                    });
                }
                else {
                    connection.query("SELECT privilegio, idCliente, nome FROM Cliente WHERE email = ?", [input.login], function (err, rows) {
                        req.session.nomeCliente = rows[0].nome;
                        req.session.idCliente = rows[0].idCliente;
                        if (rows[0].privilegio === 0) {
                            req.session.logadoCliente = true;
                            req.session.login = rows[0].login;
                            res.json({
                                status: 'OK', data: 'Cliente logado com sucesso!'
                            });
                        }
                        else{
                            req.session.logadoAdmin = true;
                            req.session.login = rows[0].login;
                            res.json({
                                status: 'OK', data: 'Admin logado com sucesso!'
                            })
                        }

                    })
                }
            }
        });
    });
});
router.post('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
        if (err)
            res.json({ status: 'ERRO', data: + err });
        else
            res.json({ status: 'OK', data: 'Logout com sucesso!' });
    });
});



router.get('/lista', function (req, res, next) {
    var input = req.session.idCliente;
    req.getConnection(function (err, connection) {
        connection.query('SELECT idCliente,nome,CPF,email,senha FROM Cliente WHERE idCliente = ?',[input], function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: err });
            else{
                var dadosPessoais = {
                    dadosP: rows
                }
                connection.query('SELECT idEndereco FROM cliente_has_endereco WHERE idCliente = ?',[input], function (err, rows) {
                    var retornoIdEndereco = rows[0].idEndereco;
                    if (err)
                     {   res.json({ status: 'ERRO', data: err });
                    }
                    else{
        
                        query = connection.query('SELECT rua,cidade,estado,cep FROM endereco WHERE idEndereco = ?', [retornoIdEndereco], function (err, rows){
                            if(err){
                                res.json({status: 'ERRO', data: + err});
                            }
                            else{
                                var dadosEndereco ={
                                    dadosE: rows
                                }
                                var dadosFinais ={
                                    dadosFinaisPessoais: dadosPessoais,
                                    dadosFinaisEndereco: dadosEndereco
                                }
                                res.json({ status: 'OK', data: dadosFinais });
                            }
                        })
        
                       
                     }
                });







        }
        });
        if (err)
            res.json({ status: 'ERRO', data: err });
    });
});

router.post('/altera', function (req, res, next) {
    
    var input = req.body;
    var id = req.query.id;
    var inputCliente = 
    {
        nome: input.nome, 
        CPF: input.CPF,
        email: input.email,
        senha: input.senha
    };
    req.getConnection(function (err, connection) {
        connection.query("UPDATE Cliente set ? WHERE idCliente = ? ", [inputCliente, id], function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: + err });
            else{
                connection.query('SELECT idEndereco FROM cliente_has_endereco WHERE idCliente = ?',[id], function (err, rows) {
                    var retornoIdEndereco = rows[0].idEndereco;
                    if (err)
                     {   res.json({ status: 'ERRO', data: err });
                    }
                    else{
                        var inputEndereco =
                        {
                            rua: input.rua,
                            cidade: input.cidade,
                            estado: input.estado,
                            cep: input.cep
                       };
        
                        query = connection.query("UPDATE endereco set ? WHERE idEndereco = ? ",[inputEndereco, retornoIdEndereco], function (err, rows){
                            if(err){
                                res.json({status: 'ERRO', data: + err});
                            }
                            else{
                                res.json({ status: 'OK', data: 'Alterado com sucesso!' });
                            }
                        })
        
                       
                     }
                });







            }
                
        });
    });
});


module.exports = router;