var express = require('express');
var router = express.Router();


router.post('/insere', function (req, res, next) {
    var input = req.body;
    console.log("INPUT NA ROTA");
    console.log(input);
    var inputCliente = 
    {
        nome: inputRecebe.nome, 
        CPF: inputRecebe.CPF,
        email: inputRecebe.email,
        senha: inputRecebe.senha,
        privilegio: inputRecebe.privilegio
    };
    console.log("INPUT CLIENTE");
    console.log(inputCliente);
    console.log("INPUT ENDEREÇO");
    console.log(inputEndereco);
    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO Cliente SET ? ", inputCliente, function (err, rows) {
            if (err){
                res.json({ status: 'ERRO', data: + err });
            }
            else {
                var inputEndereco =
                {
                    endereço: inputRecebe.endereço,
                    id_Cliente: rows.insertId,
                    CEP: inputRecebe.CEP,
                    cidade: inputRecebe.cidade,
                    estado: inputRecebe.estado
               };
                console.log("entrou no else");
                query = connection.query("INSERT INTO Cliente_has_endereço SET ? " , inputEndereco, function (err, rows) {
                        if (err) {
                            res.json({ status: 'ERRO', data: + err });

                        }
                        else
                            res.json({ status: 'OK', data: 'Endereco incluido com sucesso!' });
                    });

                res.json({ status: 'OK', data: 'Incluído com sucesso!' });

            }
        });
    });
});




module.exports = router;