const fs = require('fs')
const path = require('path')
const bcrypt = require('bcrypt')

let usuarioJson = path.join('usuario.json')

module.exports = {
    cadastro:  function(req, res , next) {
        res.render('cadastro', { title: 'Express' });
    },
    guardar: function(req, res, next){
        let {name, email, password} = req.body
        let {files} = req
        let senhaC = bcrypt.hashSync(password, 10)
        let usuario = JSON.stringify({name, email, senha:senhaC, avatar: files[0].originalname})
        fs.appendFileSync(usuarioJson, usuario)
        res.render('salvo', { nome: name})
    },
    login: function (req, res) {
        res.render('login')
    },
    logarUsuario: function(req, res, next) {
        let {email, senha} = req.body
        let usuarioSalvo = fs.readFileSync(usuarioJson,{encoding:'utf-8'})
        usuarioSalvo = JSON.parse(usuarioSalvo)

        if(email != usuarioSalvo.email){
            return res.send('Usuario não cadastrado!')
        }
        if(!bcrypt.compareSync(senha, usuarioSalvo.senhaC)){
            return res.send('Senha inválida')
        }
        res.render('index', {title:usuarioSalvo.name})
    }
}