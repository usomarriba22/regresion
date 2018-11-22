function regresion(data) {
  var coefs; //es un arreglo que contiene los coeficiente del model (a0,a1,a2,....)
  var Se = 0, St = 0, yAvg = 0;// variables que me van a guardar el se ,st y la variable y
  var errorStd, Rcuad; // aqui esta el error estandar y el r cuadrado
  
  var order = data.length - 1;// order es el numero de variable independientes hay 
  var n = data[0].length;//data es un arreglo donde estan toditos los datos. n son el numero  de observaciones. 
  
  var A = [];// A es el sistema de ecuaciones que vamos a resolver
  for (var i=0; i<=order; i++) {// inicializa la matriz a desde 0 
    A.push([]);
    for (var j=0; j<=order+1; j++)
      A[i].push(0);
  }
       
  var ones = [];
  for (var i=0; i<n; i++) ones.push(1);//va a rellenar hasta n con 1
  
  var X = Array.from(data);//
  var Y = X.pop();//remueve el ultimo elemento que se puso en x
  X.unshift(ones);//agrega uno o más elementos al inicio del array, y devuelve la nueva longitud del array.
  
  for (var i=0; i<= order; i++) {//codigo para establecer los elementos de la ecuaciones normales de la regreciones multiples 
    for (var j=0; j<=i; j++) {
      var sum = 0;
      for (var l=0; l<n; l++) {//  ademas guarda las variables independientes en x1,x2 etc
        yAvg += Y[i] / n;
        sum += X[i][l] * X[j][l];
      }
      A[i][j] = sum;
      A[j][i] = sum;
    }
    sum = 0;
    for (var l=0; l<n; l++)
      sum += Y[l]*X[i][l];
    A[i][order+1] = sum;
  }
  
  coefs = gauss(A);//ejecuta el codigo  gauss de la variable a y luego pone el resultado en coefs
  
  for (var i=0; i<n; i++) {//
    Se += Math.pow(Y[i]-sumprod(point(X,i),coefs),2);
    St += Math.pow(Y[i] - yAvg, 2);
  }
  
  return [coefs, Math.sqrt(Se/(n-order-1)), 1-Se/St];
}

function point(X,pos) {// se utiliza para devolver una posicion   en especifico 
  return X.reduce(function(XatPos,currX){
    XatPos.push(currX[pos]);
    return XatPos;
  },[]);
}

function sumprod(a,b){
  return a.reduce(function(sum,x,i) {
    return sum + x*b[i];
  },0);
}

function gauss(A) {
  var n = A.length;
  var B = [];

  for (var i = 0; i < n; i++) B.push(A[i].pop());

  var X = [];
  for (var i = 0; i < n; i++) X.push(0);

  for (var k = 0; k <= n - 2; k++)
    for (var i = k + 1; i < n; i++) {
      var factor = A[i][k] / A[k][k];
      for (var j = k + 1; j < n; j++) A[i][j] -= factor * A[k][j];
      B[i] -= factor * B[k];
    }

  X[n - 1] = B[n - 1] / A[n - 1][n - 1];

  for (var i = n - 2; i >= 0; i--) {
    var sum = B[i];
    for (var j = i + 1; j < n; j++) sum -= A[i][j] * X[j];
    X[i] = sum / A[i][i];
  }
  return X;
}
