const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const txtNombre = document.getElementById("Name");
const txtNumber = document.getElementById("Number");
const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

// Bandera, al ser true permite agregar los datos a la tabla
let isValid = true; 

// Las siguientes variables inicializan en 0
let contador = 0;
let precio = 0;
let costoTotal = 0;
let totalEnProductos = 0;

let datos = new Array (); // Pueden ser [] o escribir new Array();

function validarCantidad(){
    // Condiciones para aceptar la cantidad ingresada
    if (txtNumber.value.length==0){ // Verifica si el campo esta vacío
        return false;
    }

    if (isNaN(txtNumber.value)){ // Verifica que sea un número
        return false;
    }

    if (Number(txtNumber.value)<=0){ // Verifica que el número sea mayor a 0
        return false;
    }
    
    return true;
} // Aquí termina la función validar la cantidad

function getPrecio(){
    return Math.round((Math.random()*10000))/100;
} // Aquí termina la función para obtener el precio

// Explicación función para obtener el precio:
// 1. Math.random() = Obtiene un número aleatorio entre el 0 y 1
// 2. *100000 = Escala el número aleatorio a un rango entre 0 y 10000
// 3. Math.round () = Redondea el número
// 4. /100 = Divide el número redondeado por 100 para obtener un número con dos decimales

btnAgregar.addEventListener("click", function (event){
    event.preventDefault(); //  Se está evitando que la acción predeterminada del evento se ejecute

    // Validar campos de entrada y mostrar alertas: Utilizar antes del proceso de validación del 
    // formulario para asegurarse de que mensajes de error o estilos de borde aplicados anteriormente se borren
        txtNombre.style.border = ""; 
        txtNumber.style.border = "";
        alertValidacionesTexto.innerHTML = "";
        alertValidaciones.style.display = "none";
        isValid = true;

    // Validar el nombre del producto
    if(txtNombre.value.length<3){ // Verifica si la longitud del valor ingresado en el campo txtNombre es menor que 3 caracteres
        txtNombre.style.border = "solid red medium"; // Aplica un borde rojo al campo txtNombre para indicar que el campo tiene un error de validación
        alertValidacionesTexto.innerHTML = "El <strong>Nombre</strong> no es correcto.<br/>" // Muestra un mensaje de error en el elemento
        alertValidaciones.style.display = "block"; // Asegura que el usuario vea el mensaje
        isValid = false;
    }

    // Validar la cantidad del producto
    if(! validarCantidad()){ // Verifica si la función validarCantidad() devuelve false o un valor que evalúe como false
        txtNumber.style.border = "solid red medium";
        alertValidacionesTexto.innerHTML += "La <strong>Cantidad</strong> no es correcta.<br/>" // Añade una nueva línea de html al contenido que ya está en alertValidacionesTexto.innerHTML
        alertValidaciones.style.display = "block";
        isValid = false;
    }

    // Agregar elementos a la tabla
    if(isValid){
        contador++; // Contador aumenta en 1 
        precio = getPrecio (); // Llamar a la función para obtener un precio aleatorio
        let row = `<tr>
                    <td>${contador}</td>
                    <td>${txtNombre.value}</td>
                    <td>${txtNumber.value}</td>
                    <td>${precio}</td>
                </tr>`;
        // Contador = #, Nombre = Nombre, Number = Cantidad, Precio = Precio
        
        // Declara una variable llamada elemento 
        let elemento = {"contador": contador, 
                        "nombre": txtNombre.value,
                        "cantidad": txtNumber.value,
                        "precio": precio};

        datos.push(elemento); // Añade la variable de elemento al arreglo vacío de datos por medio de push
        localStorage.setItem("datos", JSON.stringify(datos)); // Convierte el arreglo de datos a JSON para poder almacenar en localStorage
        
        cuerpoTabla.insertAdjacentHTML("beforeend", row); // Agregar los elementos en la tabla con posición beforeend 
        costoTotal += precio*Number(txtNumber.value); //  Actualiza el costo total acumulado sumando el costo de los productos añadidos
        totalEnProductos += Number(txtNumber.value); // Actualiza el total de productos en el carrito 
        contadorProductos.innerText = contador; // Muestra el número total de productos o el resumen de productos en un elemento html
        productosTotal.innerText = totalEnProductos; // Actualiza el contenido del elemento html con el total de productos
        precioTotal.innerText = "$ " + costoTotal; // Actualiza el contenido del elemento html con el costo total, con el símbolo de $ antes
        
        // Agregar local storage (inspeccionar -> application -> local storage / session storage)
        localStorage.setItem("contador", contador);
        localStorage.setItem("totalEnProductos", totalEnProductos);
        localStorage.setItem("costoTotal", costoTotal);
        
        txtNombre.value = ""; // Reestablecer campo nombre después de agregar para facilitar añadir nuevos elementos
        txtNumber.value = ""; // Reestablecer campo cantidad después de agregar 
        txtNombre.focus(); // Manda el foco al campo nombre
    }

}); // Aquí termina el evento al botón agregar

btnClear.addEventListener("click", function (event){
    event.preventDefault(); // Se está evitando que la acción predeterminada del evento se ejecute
    
    txtNombre.value = "" // Limpiar el valor del nombre de los campos
    txtNumber.value = "" // Limpiar el valor de cantidad de los campos
   
    // Limpiar los elementos del localStorage:
    // localStorage.removeItem("contador");
    // localStorage.removeItem("costoTotal");
    // localStorage.removeItem("totalEnProductos");

    localStorage.clear(); // Limpiar el localStorage
    cuerpoTabla.innerHTML = ""; // Limpiar la tabla

    // Reiniciar las variables: contador, costoTotal, totalEnProductos (no volver a poner let porque ya están definidas)
    contador = 0;
    costoTotal = 0;
    totalEnProductos = 0;
    
    // Actualizar las variables:
    contadorProductos.innerText = contador; // Actualizar el contenido de texto del elemento contadorProductos con el valor de la variable contador
    productosTotal.innerText = totalEnProductos; // El contenido productosTotal se actualiza con el valor de totalEnProductos
    precioTotal.innerText = "$ " + costoTotal.toFixed(2); // Actualizar el contenido costoTotal
    
    alertValidacionesTexto.innerHTML = ""; //Ocultar la alerta 
    alertValidaciones.style.display = "none"; // Ocultar la alerta

    txtNombre.style.border = ""; // Quitar el borde de estilos en nombre
    txtNumber.style.border = ""; // Quitar el borde de estilos en cantidad
    txtNombre.focus(); // Manda el foco al campo nombre

}); // Aquí termina el evento al botón limpiar todo

// Evento blue es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function (event){
    txtNombre.value = txtNombre.value.trim();
});

// txtNumber.addEventListener("blur", function (event){
//     txtNumber.value = txtNumber.value.trim();
// });

// Este código se usa para ejecutar la función proporcionada una vez que la página ha terminado de cargarse:
window.addEventListener("load", function (){
    if (this.localStorage.getItem("contador") != null){ // Verificar si hay un valor almacenado en localStorage bajo la clave "contador"
        contador = Number(this.localStorage.getItem("contador")); // Obtener el valor asociado con la clave "contador",  Si existe no será null y el valor se convierte a un número usando Number(...) y se asigna a la variable contador
    }

    if (this.localStorage.getItem("totalEnProductos") != null){ // Verifica si hay un valor almacenado en localStorage bajo la clave "totalEnProductos"
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos")); // Si existe el valor se convierte a un número y se asigna a la variable totalEnProductos
    }
    
    if (this.localStorage.getItem("costoTotal") != null){ // Verifica si hay un valor almacenado en localStorage bajo la clave "costoTotal"
        costoTotal = Number(this.localStorage.getItem("costoTotal")); // Si existe el valor se convierte a un número y se asigna a la variable costoTotal
    }

    contadorProductos.innerText = contador; // Actualizar el contenido de texto del elemento con la variable contadorProductos con el valor de la variable contador
    productosTotal.innerText = totalEnProductos; // El contenido de texto del elemento con la variable productosTotal se actualiza con el valor de la variable totalEnProductos
    precioTotal.innerText = "$ " + costoTotal.toFixed(2); 
    // Este último paso actualiza el contenido de texto del elemento con la variable precioTotal para mostrar el valor de costoTotal 
    // en formato de moneda y costoTotal.toFixed(2) asegura que el número se muestre con dos decimales y el prefijo "$ " se agrega para mostrar el valor como una cantidad en pesos 

    if (this.localStorage.getItem("datos") != null){
        datos = JSON.parse(this.localStorage.getItem("datos")); // Convierte la cadena JSON almacenada en localStorage de nuevo en arreglo
    }
    
    datos.forEach(r => {
        let row = `<tr>
                        <td>${r.contador}</td>
                        <td>${r.nombre}</td>
                        <td>${r.cantidad}</td>
                        <td>${r.precio}</td>
                   </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });
    // datos.forEach(r => { ... }); Itera sobre cada objeto en el array datos
    // Dentro del bucle forEach, construye una cadena de texto (row) que representa una fila de la tabla (<tr>) con cuatro celdas (<td>) y cada celda muestra un valor del objeto r
    // cuerpoTabla.insertAdjacentHTML("beforeend", row); Inserta esta fila (row) al final del contenido de cuerpoTabla en el documento html

}); // Aquí termina el evento para almacenar en localStorage
