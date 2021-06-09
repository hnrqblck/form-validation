const express = require('express');
const routes = express();

const views = __dirname + "/views/";

const User = {
    data:
        {
            name: 'gita'
        },
    constrollers: {
        index(req, res) {

            return res.render(views + "index", { user: User.data });
        },

        submit(req, res) {
            User.data = {
                name: req.body.name,
                lastname: req.body.lastname,
                "profile-pic": req.body["profile-pic"],
                username: req.body.username,
                cpf: req.body.cpf,
                password: req.body.password
            };
            return res.redirect('/');
        }
    }
}

routes.get('/', User.constrollers.index);
routes.post('/', User.constrollers.submit);

module.exports = routes;