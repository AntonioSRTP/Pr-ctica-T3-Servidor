var fs = require('fs');
var path = require('path');
var express = require("express");
var llamar = express();

llamar.use("/dni", function(peticion, respuesta) {

      if (peticion.query.num) {

            var respuestaFinal = "";
            var dni = peticion.query.num;

            var cadena="TRWAGMYFPDXBNJZSQVHLCKET";
            var posicion = dni%23;
            var letra = cadena.substring(posicion,posicion+1);

            respuestaFinal += ("Cuando se escriba a dirección URL anterior con el parámetro num (por ejemplo, 127.0.0.3:8083/dni?num=12345678), escribe por pantalla el DNI completo, con la letra que corresponda.<br><br>");
            respuestaFinal += (dni + " " + letra);
            respuesta.send(respuestaFinal);

      } else {
            fs.readFile('instrucciones.html', function(err, dato) {
                  respuesta.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
                  respuesta.write(dato);
                  respuesta.end();
            });
    }
})

llamar.use("/escribir", function(peticion, respuesta) {

      let carpeta = "Copia";
      let documento = "holaMundo.txt";
      let contenido = "Antonio Sánchez Romero";

      var mkdirSync = function (path)
      {
            try {fs.mkdirSync(path);}
            catch(e)
            { if ( e.code != 'EEXIST' ) throw e;}
      }
            
      mkdirSync(path.join("./" + carpeta));

      fs.appendFile("Copia/" + documento, contenido, function(err) {
            if (err)
            {throw err;}
            console.log("Se ha creado correctamente la CARPETA " + carpeta + " con el DOCUMENTO " + documento);
      })
      
});

llamar.listen(8083, '127.0.0.3', function() {
    console.log('Servidor ejecutándose en http://127.0.0.3:8083');
});