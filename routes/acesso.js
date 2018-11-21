var express = require('express');
var router = express.Router();


router.get('/logado', function (req, res, next){
    if(req.session.logadoAdmin)
    {
        res.json({status: 'LogadoAdmin', data: req.session.login});
    }
    else{
        if(req.session.logadoCliente)
        {
            res.json({status: 'LogadoCliente', data: req.session.login});
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
                    connection.query("SELECT privilegio, idCliente FROM Cliente WHERE email = ?", [input.login], function (err, rows) {
                      
                        req.session.idCliente = rows[0].idCliente;
                        if (rows[0].privilegio === 0) {
                            console.log("entrou no if do cliente");
                            req.session.logadoCliente = true;
                            req.session.login = rows[0].login;
                            res.json({
                                status: 'OK', data: 'Cliente logado com sucesso!'
                            });
                        }
                        else{
                            console.log("entrou no else do admin");
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
    console.log("Aqui entrou");
    console.log(req.session.idCliente);
    req.getConnection(function (err, connection) {
        connection.query('SELECT idCliente,nome,CPF,email,senha FROM Cliente WHERE idCliente = ?',[input], function (err, rows) {
            console.log(rows[0].nome);
            console.log(rows[0].CPF);
            console.log(rows[0].email);
            console.log(rows[0].senha);
            if (err)
                res.json({ status: 'ERRO', data: err });
            else{
                var dadosPessoais = {
                    dadosP: rows
                }
            console.log("AQUUIIIIIIIIIII");
                console.log(rows);
               


                connection.query('SELECT idEndereco FROM cliente_has_endereco WHERE idCliente = ?',[input], function (err, rows) {
                    console.log("ENDERECO");
                    console.log(rows[0].idEndereco);
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
                                console.log("DADOS FINAIS");
                                console.log(dadosFinais);
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
    console.log("INPUT/ID/CPF:");
    console.log(input);
    console.log(req.query.id);
    console.log(input.CPF);
    var id = req.query.id;
    var inputCliente = 
    {
        nome: input.nome, 
        CPF: input.CPF,
        email: input.email,
        senha: input.senha
    };
    console.log("CPF ANTES DO INPUT:");
    console.log(inputCliente.CPF);
 
    req.getConnection(function (err, connection) {
        connection.query("UPDATE Cliente set ? WHERE idCliente = ? ", [inputCliente, id], function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: + err });
            else{
                connection.query('SELECT idEndereco FROM cliente_has_endereco WHERE idCliente = ?',[id], function (err, rows) {
                    console.log("Endereco:");
                    console.log(rows[0].idEndereco);
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