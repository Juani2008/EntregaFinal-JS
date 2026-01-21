
//productos
const producto = [
    {marca:"gan",tipo:"3x3",precio:"400", imagen:"<img  src=\"images/gan3x3.jfif\" alt=\"\">",id:1,logo: "images/gan.png"},
    {marca:"dayan",tipo:"2x2",precio:"600",imagen:"<img  src=\"images/dayan2x2.jfif\" alt=\"\">",id:2, logo: "images/moyu.png"},
    {marca:"moyu",tipo:"4x4",precio:"300",imagen:"<img  src=\"images/moyu4x4.jfif\" alt=\"\">",id:3, logo: "images/dayan.jfif"},
    {marca:"qiyi",tipo:"5x5",precio:"800",imagen:"<img  src=\"images/qiyi5x5.jfif\" alt=\"\">",id:4,logo: "images/qiyi.png"},
    
]

//carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const mostrarCarrito = () =>{
    let contenedor = document.querySelector("#contenedorCarrito");
    contenedor.innerHTML = ""
    const noRepetir = [...new Set(carrito)];
    noRepetir.forEach((prod) =>{
        const cantidadCar = carrito.filter((e) => e.id == prod.id).length
        const precioCar = parseInt(prod.precio.replace("$",""))
        const totalProd = precioCar * cantidadCar
         
        let carritoHTML = document.createElement("div")
        carritoHTML.className = "productoCarrito"
        carritoHTML.innerHTML = `
        <div class="carritoDiv>
        <p class="marcaCarrito">Marca: ${prod.marca}</p>
        <p class="cantidadCarrito">Cantidad: <strong> ${cantidadCar}</strong></p>
        <p class="precioIndividualCarrito">Precio Individual: ${precioCar}</p>
        <p class="precioTotalCarrito">Precio Total por Producto: ${totalProd}</p>
        <hr>
        </div>
        `;
        
        contenedor.appendChild(carritoHTML)
    })
    
}
mostrarCarrito();


//prodcutos en HTML
const productosHTML = () =>{
    let productos = document.querySelector(".divGeneralProductos")

    producto.forEach((prod) =>{
        let divProductos = document.createElement("div")
        divProductos.className = "divProductos"
        divProductos.innerHTML = `
        <img class="imagenProductos" ${prod.imagen}
        <div class="contenedorProductos">
            <p class="marcaProductos">${prod.marca}</p>
            <p class="tipoProductos">${prod.tipo}</p>
        </div>
        <p class="precioProductos">$${prod.precio}</p>
        <button  data-id="${prod.id}" class="botonAgregar">Agregar al carrito</button>
        <button  data-id="${prod.id}" class="botonEliminar">Eliminar del carrito</button>
        `
        productos.appendChild(divProductos)
    })
    let botonAgregar = document.querySelectorAll(".botonAgregar")

    botonAgregar.forEach((boton) =>{
        boton.addEventListener("click", (e) =>{
            let IdProducto = e.target.dataset.id;
            carrito.push(producto.find((prod) => prod.id == IdProducto))
            guardarCarrito();
            mostrarCarrito();
            
        })
        })
    let botonEliminar = document.querySelectorAll(".botonEliminar")
    botonEliminar.forEach((btn) =>{
        btn.addEventListener("click", (e) =>{
            let IdProducto = e.target.dataset.id;
            const indice = carrito.findIndex((prod) => prod.id == IdProducto)
            if (indice != -1){
                carrito.splice(indice,1)
            }
            guardarCarrito();
            mostrarCarrito()
        })
    }
    ) 
}
productosHTML()


//marcas
let marcas = document.querySelector("#marcas")
marcas.innerHTML = `
    <img class="logoMarca" src="images/gan.png" alt="gan">
    <img class="logoMarca" src="images/moyu.png" alt="moyu">
    <img class="logoMarca" src="images/dayan.jfif" alt="dayan">
    <img class="logoMarca" src="images/qiyi.png" alt="qiyi">  
`

   
   

