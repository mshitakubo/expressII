var UsuarioController = require('../controller/UsuarioController')
var express = require('express')
var router = express.Router()
const multer = require('multer')
const path = require('path')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage })

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

/* GET home page. */
router.get('/cadastro', UsuarioController.cadastro)
router.post('/guardar',upload.any(), UsuarioController.guardar)

router.get('/login', UsuarioController.login)
router.post('/login', UsuarioController.logarUsuario)

module.exports = router;