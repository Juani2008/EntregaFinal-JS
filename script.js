//usuario datos y registro
let usuario =  [];

    //swettalert2 registro
setTimeout(() => {

    swal.fire({
        title: "Bienvenido a mi tienda de cubos rubik",
        text: "Deseas registrarte?",
        showDenyButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
    }).then((result)=>{
        if (result.isConfirmed){
            Swal.fire({
            title: "Ingresa tu nombre",
            input: "text",
            inputLabel: "Tu nombre",
            inputPlaceholder: "Tu nombre"
            }).then((result) => {
                const nombre = result.value;
                if (nombre) {
                    usuario.push(nombre);
                    Swal.fire(`Te registraste como: ${nombre}`);
                    console.log(JSON.stringify(usuario));
                    
                }
            });
        }else if (result.isDenied)
            swal.fire("Continuaras como invitado", "", "sucecess")
            usuario.push("invitado");
            console.log(JSON.stringify(usuario));
    })
},2000)

// productos HTML
const producto = [
    {marca:"Gan",tipo:"3x3",precio:"400", imagen:"<img src=\"images/gan3x3.jfif\" alt=\"\">",id:1},
    {marca:"Dayan",tipo:"2x2",precio:"600",imagen:"<img src=\"images/dayan2x2.jfif\" alt=\"\">",id:2},
    {marca:"Moyu",tipo:"4x4",precio:"300",imagen:"<img src=\"images/moyu4x4.jfif\" alt=\"\">",id:3},
    {marca:"Qiyi",tipo:"5x5",precio:"800",imagen:"<img src=\"images/qiyi5x5.jfif\" alt=\"\">",id:4},
    {marca:"Qiyi",tipo:"Megaminx",precio:"1200",imagen:"<img src=\"images/megamixQIyi.jpg\" alt=\"\">",id:5},
    {marca:"Gan",tipo:"Pyraminx",precio:"700",imagen:"<img src=\"images/piraminxGan.jfif\" alt=\"\">",id:6},
    {marca:"Moyu",tipo:"Square 1",precio:"500",imagen:"<img src=\"images/square1Moyu.jfif\" alt=\"\">",id:7},
    {marca:"Dayan",tipo:"Skewb",precio:"900",imagen:"<img src=\"images/skewbDayan.jfif\" alt=\"\">",id:8},
    {marca:"Qiyi",tipo:"6x6",precio:"1500",imagen:"<img src=\"images/qiyi6x6.jfif\" alt=\"\">",id:9},
    {marca:"Moyu",tipo:"7x7",precio:"2000",imagen:"<img src=\"images/moyu7x7.jfif\" alt=\"\">",id:10},
    {marca:"Qiyi",tipo:"Mirror",precio:"1100",imagen:"<img src=\"images/qiyimirror.jfif\" alt=\"\">",id:11},
    {marca:"Dayan",tipo:"Ghost",precio:"1300",imagen:"<img src=\"images/ghostdayan.webp\" alt=\"\">",id:12},
    {marca:"Qiyi",tipo:"Windmill",precio:"1400",imagen:"<img src=\"images/windmillqiyi.jfif\" alt=\"\">",id:13},
    {marca:"Qiyi",tipo:"Dino",precio:"750",imagen:"<img src=\"images/dinoqiyi.jfif\" alt=\"\">",id:14},
    {marca:"Moyu",tipo:"Fisher",precio:"950",imagen:"<img src=\"images/fishermoyu.jfif\" alt=\"\">",id:15},
];


// carrito
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const mostrarCarrito = () =>{
    let contenedor = document.querySelector("#contenedorCarrito");
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Carrito vacío</p>";
        return;
    }
    
    carrito.forEach((prod) =>{
        const precioCar = parseInt(prod.precio);
        const totalProd = precioCar * prod.cantidad;
         
        let carritoHTML = document.createElement("div");
        carritoHTML.className = "productoCarrito";
        carritoHTML.innerHTML = `
        <div class="carritoDiv">
            <div class="infoCarrito">
                <p class="marcaCarrito">Marca: ${prod.marca}</p>
                <p class="nombreCarrito">Nombre: ${prod.tipo}</p>
            </div>
            <p class="cantidadCarrito">Cantidad: <strong>${prod.cantidad}</strong></p>
            <p class="precioIndividualCarrito">Precio Individual: $${precioCar}</p>
            <p class="precioTotalCarrito">Precio Total por Producto: $${totalProd}</p>
            <hr>
        </div>
        `;
        
        contenedor.appendChild(carritoHTML);
    });
    vaciarCarrito()
};
carrito.length > 0 && mostrarCarrito();

function calcularTotalCarrito() {
    let total = 0;
    carrito.forEach((prod)=>{
        total += parseInt(prod.precio) * prod.cantidad;
    })
    return total
}
function mostrarTotal() {
    const totalDiv = document.querySelector("#totalPrecio");

     if (carrito.length > 0) {
        const total = calcularTotalCarrito();
        totalDiv.innerHTML = `<h3 class ="totalCarrito">Total: $${total}</h3>`;
    } else {
        totalDiv.innerHTML = "";
    }
}
mostrarTotal()

function vaciarCarrito() {
    const contenedorVaciar = document.querySelector("#contenedorVaciar")
    if (carrito.length > 0){
        contenedorVaciar.innerHTML = `<button class="botonVaciarCarrito">Vaciar carrito</button>`
        document.querySelector(".botonVaciarCarrito").addEventListener("click",()=>{
            carrito = [],
            guardarCarrito(),
            mostrarCarrito()
            mostrarTotal(),
            vaciarCarrito(),
            terminarCompra()
        })
    }else{
        contenedorVaciar.innerHTML = ""
    }
    
}
vaciarCarrito()
function terminarCompra() {
    const terminarCompraDiv = document.querySelector("#terminarCompra");
    if (carrito.length > 0) {
        terminarCompraDiv.innerHTML = `<button class="terminarCompraButton">Finalizar compra</button>`
        document.querySelector(".terminarCompraButton").addEventListener("click",() =>{
            Swal.fire({
                title: "Compra realizada con éxito",
                text: `Gracias ${usuario[0]} por tu compra`,
                icon: "success"
            });
            carrito = [],
            guardarCarrito(),
            mostrarCarrito(),
            mostrarTotal(),
            vaciarCarrito(),
            terminarCompra()

        })
       
    }else{
        terminarCompraDiv.innerHTML = ``
    }
}
terminarCompra()



// Mostrar productos en HTML
const productosHTML = (lista = producto) =>{
    let productos = document.querySelector(".divGeneralProductos");
    productos.innerHTML = "";

    lista.forEach((prod) =>{
        let divProductos = document.createElement("div");
        divProductos.className = "divProductos";
        divProductos.innerHTML = `
        <img class="imagenProductos" ${prod.imagen}
        <div class="contenedorProductos">
            <p class="marcaProductos">${prod.marca}</p>
            <p class="tipoProductos">${prod.tipo}</p>
        </div>
        <p class="precioProductos">$${prod.precio}</p>
        <button data-id="${prod.id}" class="botonAgregar">Agregar al carrito</button>
        <button data-id="${prod.id}" class="botonEliminar">Eliminar del carrito</button>
        `;
        productos.appendChild(divProductos);
    });

    let botonAgregar = document.querySelectorAll(".botonAgregar");
    botonAgregar.forEach((boton) =>{
        boton.addEventListener("click", (e) =>{
            let IdProducto = e.target.dataset.id;
            agregarAlCarrito(IdProducto);
        });
    });

    let botonEliminar = document.querySelectorAll(".botonEliminar");
    botonEliminar.forEach((btn) =>{
        btn.addEventListener("click", (e) =>{
            let IdProducto = e.target.dataset.id;
            eliminarDelCarrito(IdProducto);
            
        });
    });
};

productosHTML();


// funciones carrito
function agregarAlCarrito(id) {
    const productoEncontrado = producto.find(p => p.id == id);
    const productoEnCarrito = carrito.find(p => p.id == id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({
            ...productoEncontrado,
            cantidad: 1
        });
    }
    Toastify({
            text: "Producto agregado al carrito",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, #667eea, #764ba2)",
            },
    }).showToast();
    guardarCarrito();
    mostrarCarrito();
    mostrarTotal();
    vaciarCarrito();
    terminarCompra()
}

function eliminarDelCarrito(id) {
    const productoEnCarrito = carrito.find(p => p.id == id);

    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad--;
        } else {
            carrito = carrito.filter(p => p.id != id);
        }
        Toastify({
            text: "Producto eliminado del carrito",
            duration: 3000,
            gravity: "bottom",
            position: "right",
            style: {
                background: "linear-gradient(to right, orange, red)",
            },
        }).showToast();
    }

    guardarCarrito();
    mostrarCarrito();
    mostrarTotal();
    vaciarCarrito();
    terminarCompra();
    
}


// marcas
let marcas = document.querySelector("#marcas");
marcas.innerHTML = `
    <img class="logoMarca" src="images/gan.png" alt="gan">
    <img class="logoMarca" src="images/moyu.png" alt="moyu">
    <img class="logoMarca" src="images/dayan.jfif" alt="dayan">
    <img class="logoMarca" src="images/qiyi.png" alt="qiyi">  
`;



// filtro de productos

let estadoFiltros = {
    marca: "todos",
    orden: "predeterminado"
};

const filtrosProductos = () => {
    let listaProcesada = [...producto];

    if (estadoFiltros.marca !== "todos") {
        listaProcesada = listaProcesada.filter(prod => prod.marca === estadoFiltros.marca);
    }

    if (estadoFiltros.orden === "mayor") {
        listaProcesada.sort((a, b) => parseInt(b.precio) - parseInt(a.precio));
    } else if (estadoFiltros.orden === "menor") {
        listaProcesada.sort((a, b) => parseInt(a.precio) - parseInt(b.precio));
    }
    productosHTML(listaProcesada);
};

function configurarFiltros() {
    const menuMarca = document.getElementById("filtroMarca");
    const menuPrecio = document.getElementById("filtroPrecio");
    menuMarca.addEventListener("change", (e) => {
        estadoFiltros.marca = e.target.value; 
        filtrosProductos(); 
    });

    // Evento para Precios
    menuPrecio.addEventListener("change", (e) => {
        estadoFiltros.orden = e.target.value; 
        filtrosProductos();
    });
}
configurarFiltros();



//toastify
document.querySelectorAll(".botonAgregar").forEach((boton)=>{
    boton.addEventListener("click", ()=>{
            
    })
})


