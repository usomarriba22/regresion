var order=2, n=6;

crearTabla(n,order+1);
//loadSample();

function crearTabla(rows, cols) {
  // modificar esta funcion para que aparezcan encabezados  de columna X1, X2, X3...Y
  // y de fila 1, 2, 3, ... n
  var esp = document.querySelector(".datainput");
  if (esp.firstChild) esp.removeChild(esp.firstChild);

  var tabla = document.createElement("table");

  for (var i = 0; i < rows; i++) {
    var fila = document.createElement("tr");
    for (var j = 0; j < cols; j++) {
      var celda = document.createElement("td");
      var entrada = document.createElement("input");
      celda.append(entrada);
      fila.append(celda);
    }
    tabla.append(fila);
  }

  esp.append(tabla);
}

document.querySelector("#order").addEventListener("input", function(e) {
  order = +e.target.value;
  crearTabla(n,order+1);
});

document.querySelector("#n").addEventListener("input", function(e) {
  n = +e.target.value;
  crearTabla(n,order+1);
});

/*
function loadSample(sample) {
  var elementos = document.querySelectorAll("table input");
  
  for (var i=0; i < elementos.length; i++) {
    elementos[i].value = +i;
  }
}
*/

document.querySelector("button").addEventListener("click", function() {
  var data = [];
  
  var elementos = document.querySelectorAll("table input");

  for (var i = 0; i < elementos.length; i++) {
    var v = +elementos[i].value;
    if (i <= order) {
      data.push([]);
      data[i].push(v);
    }
    else
      data[i%(order+1)].push(v);
  }

  var reg = regresion(data);
  
  var results = document.querySelector("#results");
  var txt = "<h1>Resultados</h1><p>Coeficientes: " + reg[0] + "</p>";
  txt += "<p>Error estándar " + reg[1] + "</p>";
  txt += "<p>R cuadrado " + reg[2] + "</p>";
  results.innerHTML = txt;
});
