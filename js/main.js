const btnAgregar = document.getElementById("btnAgregar");
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
let totalEnProductos =0;


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
        txtNombre.focus();
    }

}); // Aquí termina el evento agregar

// Evento blue es cuando un campo pierde el foco, se sale del campo
txtNombre.addEventListener("blur", function (event){
    txtNombre.value = txtNombre.value.trim();
});

// txtNumber.addEventListener("blur", function (event){
//     txtNumber.value = txtNumber.value.trim();
// });

window.addEventListener("load", function (){
    if (this.localStorage.getItem("contador") != null){
        contador = Number(this.localStorage.getItem("contador"));
    }

    if (this.localStorage.getItem("totalEnProductos") != null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    }
    
    if (this.localStorage.getItem("costoTotal") != null){
        costoTotal = Number(this.localStorage.getItem("costoTotal"));
    }

    contadorProductos.innerText = contador;
    productosTotal.innerText = totalEnProductos;
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);

});
