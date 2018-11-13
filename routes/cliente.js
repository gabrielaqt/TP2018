var express = require('express');
var router = express.Router();


router.post('/insere', function (req, res, next) {
    var input = req.body;
    var inputCliente = 
    {
        nome: input.nome, 
        CPF: input.CPF,
        email: input.email,
        senha: input.senha,
        privilegio: input.privilegio
    };
    
    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO Cliente SET ? ", inputCliente, function (err, rows) {
            if (err){
                res.json({ status: 'ERRO', data: + err });
            }
            else {
                var inputEndereco =
                {
                    rua: input.rua,
                    cep: input.cep,
                    cidade: input.cidade,
                    estado: input.estado
               };
               
                var idClienteRetorno = rows.insertId;
                query = connection.query("INSERT INTO endereco SET ? " , inputEndereco, function (err, rows) {
                    
                        if (err) {
                            res.json({ status: 'ERRO', data: + err });

                        }
                        else{
                            var idEnderecoRetorno = rows.insertId;
                            var inputClienteEnderecoId = {
                                idCliente: idClienteRetorno,
                                idEndereco: idEnderecoRetorno
                            }
                            query = connection.query("INSERT INTO cliente_has_endereco SET ? ", inputClienteEnderecoId, function (err, rows){
                                if(err){
                                    res.json({status: 'ERRO', data: + err});
                                }
                                else{
                                    res.json({ status: 'OK', data: 'Cadastro incluido com sucesso!' });
                                }
                            })
                            
                        }

                    });

                //res.json({ status: 'OK', data: 'Incluído com sucesso!' });

            }
        });
    });
});




module.exports = router;