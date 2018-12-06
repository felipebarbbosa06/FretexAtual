const express = require('express');
const usuariosRouter = express.Router();
import admin from '../../admin';

usuariosRouter.post('/createUser', function(req, res, next){
  const usuario = {
    save: false,
    id: null
  }
  
  admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    disabled: false
  }).then(success=>{
    usuario.save = true;
    usuario.id = success.uid;
    res.status(200).send(usuario);
  }).catch(err=>{
    console.log('err',err);
    res.status(500).send({usuario, err});
  })
});

usuariosRouter.delete('/removerUsuario/:id', function(req, res, next){
  admin.auth().deleteUser(req.params.id)
  .then(function() {
    console.log("Successfully deleted user");
  })
  .catch(function(error) {
    console.log("Error deleting user:", error);
  });
});

export default usuariosRouter;
