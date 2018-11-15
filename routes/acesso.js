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
})
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


module.exports = router;