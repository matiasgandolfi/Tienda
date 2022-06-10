'use strict'

const jwt = require('jwt-simple');
const moment = require('moment');
const secret = 'juan'

exports.createToken = function(user){
    let payload = {
        sub: user._id,
        nombres: user.nombres,
        apellidos: user.apellidos,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().add(7,'days').unix()
    }

    return jwt.encode(payload,secret);
}