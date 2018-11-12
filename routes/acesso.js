var express = require('express');
var router = express.Router();

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
                    connection.query("SELECT privilegio FROM Cliente WHERE email = ?", [input.login], function (err, rows) {
                        if (rows[0].privilegio === 0) {
                            req.session.logadoCliente = true;
                            req.session.login = rows[0].login;
                            res.json({
                                status: 'OK', data: 'Cliente logado com sucesso!'
                            });
                        }
                        else{
                            res.json({
                                status: 'OK', data: 'Admin logado com sucesso!'
                            })
                        }

                    })
                    if(req.session.logadoCliente){
                        var login = document.getElementById("login");
                        login.style.display = "none";
                    }
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


module.exports = router;