// Función para obtener y mostrar todos los productos inicialmente
const productosCarrito = document.getElementById("productosCarrito");
const precioFinal = document.getElementById("total")
const infoModal = document.getElementById("infoModal")
let IDproducto = ""
let cantidad = 1;

const getProductos = async () => {
  try {
    const res = await axios.get("http://localhost:3000/productos");
    const datos = res.data;

    datos.forEach((producto) => {
      showCards.innerHTML += `
          <div class="card ms-3 mt-3 shadow" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
            <div class="card-body">
              <h4 class="fw-bolder bahia">Bahia</h4>
             <div class="text-center">
             
             <button type="button" class="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick="detallesProducto('${producto.id}','${producto.nombre}','${producto.color}','${producto.imagen}','${producto.precio}','${producto.material}')">
  Detalles del Prodcuto
</button>
             <button class="btn btn-warning" onClick="agregarProductoAlCarrito('${producto.id}','${producto.nombre}','${producto.color}','${producto.imagen}','${producto.precio}')">Agregar al Carrito</button>
             </div>
            </div>
          </div>
        `;
    });
  } catch (error) {
    console.error("Error al obtener productos:", error);
  }
};
// Variable para almacenar la cantidad inicial
const detallesProducto = (id, nombre, color, imagen, precio, material) => {
  infoModal.innerHTML = `
  <div class="card" style="width: 18rem;">
   <img src="${imagen}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${nombre}</h5>
    <p class="card-text">${material}</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">${color}</li>
    <li class="list-group-item">${precio}</li>
    <li class="list-group-item">A third item</li>
  </ul>
 
</div>
  `
}

// Función para actualizar la visualización de la cantidad
const actualizarCantidadVisual = () => {
  document.getElementById("cantidadDisplay").textContent = cantidad;
};

// Función para aumentar la cantidad
const aumentarCantidad = (index) => {
  carritoDeCompras[index].cantidadProdcuto++;
  mostrarDetallesCarrito();
};

// Función para restar la cantidad
const restarCantidad = (index) => {
  const producto = carritoDeCompras[index];
  if (producto.cantidadProdcuto > 1) {
    producto.cantidadProdcuto--;
  }

  mostrarDetallesCarrito()
};



// Llamada inicial para mostrar todos los productos
getProductos();
let carritoDeCompras = [];
const mostrarDetallesCarrito = () => {
  productosCarrito.innerHTML = ""
  let total = 0
  for (let i = 0; i < carritoDeCompras.length; i++) {
    const producto = carritoDeCompras[i];
    total += Number(producto.precioProducto) * producto.cantidadProdcuto;

  }
  carritoDeCompras.map((producto, index) => {


    productosCarrito.innerHTML += `
     <div class="card mb-3" style="max-width: 340px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src=${producto.imagenProducto} class="img-thumbnail rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${producto.nombreProducto}</h5>
              <p>precio : $ ${producto.precioProducto}</p>
             <div class="d-flex align-items-center">
               <button class="btn btn-outline-dark" onClick="aumentarCantidad(${index})">+</button>
                   <p id="cantidadDisplay" class="fw-bolder lead mx-3 pt-1">${producto.cantidadProdcuto}</p>
                   <button class="btn btn-outline-dark" onClick="restarCantidad(${index})">-</button>
              </div>
                   <button class="btn btn-outline-danger" onClick="eliminarProductoDelCarrito('${index}')">Elimnar</button>
              
            </div>
          </div>
        </div>
        
      </div>
    `
  })

  precioFinal.textContent = `Total: $ ${total}`;


}
const agregarProductoAlCarrito = (id, nombre, color, imagen, precio) => {
  //console.log("🚀 ~ agregarProductoAlCarrito ~ nombre:", nombre)
  let nombreProducto = nombre;
  let colorProducto = color;
  let imagenProducto = imagen
  let cantidadProdcuto = cantidad;
  let precioProducto = precio
  IDproducto = id;



  const productoNuevo = {
    IDproducto,
    nombreProducto,
    colorProducto,
    imagenProducto,
    cantidadProdcuto,
    precioProducto
  }
  const verificarSiElProductoExiste = carritoDeCompras.some((producto) => {
    return producto.IDproducto === id;
  })

  if (verificarSiElProductoExiste) {
    return Swal.fire({
      icon: 'warning',             // Icono de éxito, puede ser 'success', 'error', 'warning', etc.
      title: 'El producto ya fue agregado',  // Título del toast
      toast: true,                 // Configurar como toast
      position: 'bottom-start',         // Posición del toast (top-end, bottom-end, top-start, etc.)
      showConfirmButton: false,    // Ocultar botón de confirmación
      timer: 3000,                 // Duración del toast en milisegundos
      timerProgressBar: true       // Barra de progreso de tiempo
    });
  }
  carritoDeCompras.push(productoNuevo)
  Swal.fire({
    icon: 'success',             // Icono de éxito, puede ser 'success', 'error', 'warning', etc.
    title: 'Producto agregado al carrito',  // Título del toast
    toast: true,                 // Configurar como toast
    position: 'bottom-start',         // Posición del toast (top-end, bottom-end, top-start, etc.)
    showConfirmButton: false,    // Ocultar botón de confirmación
    timer: 3000,                 // Duración del toast en milisegundos
    timerProgressBar: true       // Barra de progreso de tiempo
  });

  mostrarDetallesCarrito()

}

const eliminarProductoDelCarrito = (index) => {
  console.log("🚀 ~ eliminarProductoDelCarrito ~ index:", index)
  const parsearIndex = Number(index)
  carritoDeCompras.splice(parsearIndex, 1);
  mostrarDetallesCarrito()

}

const ventaProductos = async () => {
  try {
    const res = await axios.post("http://localhost:3000/ventas", {
      carritoDeCompras
    });
    Swal.fire({
      icon: 'success',             // Icono de éxito, puede ser 'success', 'error', 'warning', etc.
      title: 'Compra Realizada con exito',  // Título del toast
      toast: true,                 // Configurar como toast
      position: 'top-start',         // Posición del toast (top-end, bottom-end, top-start, etc.)
      showConfirmButton: false,    // Ocultar botón de confirmación
      timer: 3000,                 // Duración del toast en milisegundos
      timerProgressBar: true       // Barra de progreso de tiempo
    });
    console.log("Venta creada exitosamente:", res.data);
  } catch (error) {
    console.error("Error al crear la venta:", error);
    Swal.fire({
      icon: 'warning',             // Icono de éxito, puede ser 'success', 'error', 'warning', etc.
      title: 'Ocurrio un error en la compra',  // Título del toast
      toast: true,                 // Configurar como toast
      position: 'top-start',         // Posición del toast (top-end, bottom-end, top-start, etc.)
      showConfirmButton: false,    // Ocultar botón de confirmación
      timer: 3000,                 // Duración del toast en milisegundos
      timerProgressBar: true       // Barra de progreso de tiempo
    });
  }
};


comprarProductos.addEventListener("click", ventaProductos)


buscador.addEventListener("input", async () => {
  const buscarNombre = buscador.value.toLowerCase();

  try {
    const res = await axios.get("http://localhost:3000/productos");
    const datos = res.data;

    const resultadoDeBusqueda = datos.filter((item) => 
      item.nombre.toLowerCase().includes(buscarNombre)
    );

    // Limpiar el contenido previo
    showCards.innerHTML = "";

    // Mostrar los resultados de la búsqueda
    resultadoDeBusqueda.forEach((producto) => {
      showCards.innerHTML += `
        <div class="card ms-3 mt-3 shadow" style="width: 18rem;">
          <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
          <div class="card-body">
            <h4 class="fw-bolder bahia">Bahia</h4>
            <h5 class="card-title fw-bolder">${producto.nombre}</h5>
            <p class="card-text lead p">$${producto.precio}</p>
            <p class="card-text lead p">Medidas: ${producto.medidas}</p>
            <p class="card-text lead p">Color: ${producto.color}</p>
            <a href="#" class="btn btn-primary">Ver Detalles</a>
          </div>
        </div>
      `;
    });

  } catch (error) {
    console.error("Error al buscar productos:", error);
  }
});

