const pictures = require('./pictures');

const handlers = {
  default : (data, cb) => {
    cb(200, {message: 'Servidor http en node. Rutas: /home ---- /pictures ---- /pictures/all ---- /pictures/delete'} );
  },

  home : (data, cb) => {
    cb(200, { error: false, message: "Este es el home del sitio", 'data': data });
  },

  pictures: pictures.pictures,

  picturesAll: pictures.all,
  
  picturesDelete: pictures.delete,

  notFound : (data, cb) => {
    cb(404, {error: true, message: "NO existe lo que estás buscando."});
  }
}

module.exports = handlers;
