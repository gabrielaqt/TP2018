var express = require('express');
var router = express.Router();


router.post('/insere', function (req, res, next) {
    var inputRecebe = req.body;
    console.log(inputRecebe);
    var inputCliente = {inputRecebe.nome, input};
    
    console.log(inputCliente);
    console.log(inputEndereco);
    req.getConnection(function (err, connection) {
        var query = connection.query("INSERT INTO Cliente SET ? ", inputCliente, function (err, rows) {
            if (err)
                res.json({ status: 'ERRO', data: + err });
            else {
                var inputEndereco = {
                    id: rows.idCliente,
                    inputRecebe.input1
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