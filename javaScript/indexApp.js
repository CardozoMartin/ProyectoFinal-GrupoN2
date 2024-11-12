const showCards = document.getElementById("showCards");
const buscador = document.getElementById("buscador");

// Función para buscar productos


// Función para obtener y mostrar todos los productos inicialmente
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
    console.error("Error al obtener productos:", error);
  }
};

// Llamada inicial para mostrar todos los productos
getProductos();
