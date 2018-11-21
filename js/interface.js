var order=2, n=6;

//crearTabla(n,order+1);
loadSample([[0,0,1,2,0,1,2,2,1],[0,2,2,4,4,6,6,2,1],[14,21,11,12,23,23,14,6,11]]);

function crearTabla(rows, cols) {
  var esp = document.querySelector(".datainput");
  if (esp.firstChild) esp.removeChild(esp.firstChild);

  var tabla = document.createElement("table");

  for (var i = 0; i <= rows; i++) {
    var fila = document.createElement("tr");
    for (var j = 0; j <= cols; j++) {
      var celda = document.createElement("td");
      var entrada;
      if (i==0) {
        if (j>0)
          entrada = document.createTextNode(j==cols ? "Y":"X" + j);
        else
          entrada = document.createTextNode("");
      }
      else
        if (j==0)
          entrada = document.createTextNode(i)
        else
          entrada = document.createElement("input");
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


function loadSample(sample) {
  var cols = sample.length;
  var rows = sample[0].length;
  crearTabla(rows,cols);
  
  var elementos = document.querySelectorAll("table input");
  
  for (var i=0; i<cols; i++)
    for (var j=0; j<rows; j++)
      elementos[i+cols*j].value = sample[i][j];
}

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
