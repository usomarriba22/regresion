var order=2, n=5;

crearTabla(n,order+1);

function crearTabla(rows, cols) {
  // modificar esta funcion para que aparezcan encabezados X1, X2, X3...B
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
  crearTabla(order+1,n);
});

document.querySelector("#n").addEventListener("input", function(e) {
  n = +e.target.value;
  crearTabla(order+1,n);
});

// console.log(gauss([[1, 1, 1], [1, -1, 1], [-2, 3, 1]], [16, 10, 7]));
// devuelve 5,3,8

document.querySelector("button").addEventListener("click", function() {
  /* leer los valores de los input de la tabla
     y los vamos a introducir en una SOLA matriz de 
     n filas y n + 1 columnas */
  /* llamar a la funcion gauss usando esa unica matriz */
  var Aflat = [],
    A = [],
    B = [];
  var elementos = document.querySelectorAll("table input");

  for (var i = 0; i < elementos.length; i++) {
    var v = +elementos[i].value;
    if ((i + 1) % (n + 1) == 0) B.push(v);
    else Aflat.push(v);
  }

  for (var i = 0; i < n; i++) A.push(Aflat.slice(n * i, n * (i + 1)));

  // en lugar de escribir texto escriban html y den algun formato
  // cambiar el mensaje a X1 = ..., X2 = ..., X3 ... Xn = ...
  document.querySelector("#respuesta").textContent = gauss(A, B);
});
