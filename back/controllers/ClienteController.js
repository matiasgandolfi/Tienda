'use strict'

const Cliente = require('../models/clientes');
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../helpers/jwt')

const registro_cliente = async function(req, res){
    //Recibe el body del post
    const data = req.body;
    let clientes_arr = [];

        //.find() encuentra un dato
    clientes_arr = await Cliente.find({email:data.email})





    //Registra el post
    if(clientes_arr.length == 0){

        //const reg = await Cliente.create(data);

        //Bcrypt
        if(data.password){
            bcrypt.hash(data.passowrd,null,null, async function(err, hash){
                if(hash){
                    data.password = hash;
                    //Registrar el cliente
                    const reg = await Cliente.create(data);
                    res.status(200).send({data:true});
                }else{
                    res.status(200).send({message:'ErrorServer', data:undefined})
                }
            })
        }else{
            res.status(200).send({message:'No hay una contraseña', data:undefined})
        }
    
    }else{
        res.status(200).send({message:'El correo ya existe en la DB', data:undefined})
    }

    
}


const login_cliente = async function(req, res){
    let data = req.body;
    let cliente_arr = [];

    cliente_arr = await Cliente.find({email:data.email});

    if(cliente_arr.length == 0){
        res.status(200).send({message: 'No se encontro el correo', data: undefined})
    }else{
        //Login
        let user = cliente_arr[0];

        bcrypt.compare(data.passowrd, user.passowrd, async function(error, check){
            if(check){
                res.status(200).send({message:'La contraseña no coincide'})
            }else{
                res.status(200).send({message:({
                    data:user,
                    token: jwt.createToken(user)
                }), data:undefined})
            }
        });
        //console.log(user);
        //res.status(200).send({data:user});
    }

    //res.status(200).send({data:data});
}

module.exports = {
    registro_cliente,
    login_cliente
}