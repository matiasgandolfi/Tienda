'use strict'

const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = Schema({
    nombre: {type: String, require: true},
    apellido: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    telefono: {type: String, require: true},
    rol: {type: String, require: true},
    dni: {type: String, require: true}
})

//Recibe el nombre del modelo y de schema
module.exports= mongoose.model('admin', AdminSchema);