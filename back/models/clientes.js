'use strict'

const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const ClienteSchema = Schema({
    nombre: {type: String, require: true},
    apellido: {type: String, require: true},
    pais: {type: String, require: false},
    email: {type: String, require: true},
    password: {type: String, require: true},
    perfil: {type: String, default: 'perfil.png', require: true},
    telefono: {type: String, require: false},
    genero: {type: String, require: false},
    f_nacimiento: {type: String, require: false},
    dni: {type: String, require: false}
})

//Recibe el nombre del modelo y de schema
module.exports= mongoose.model('cliente', ClienteSchema);