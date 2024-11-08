const inputNombre = document.getElementById("inputNombre");
const inputMedidas = document.getElementById("inputMedidas");
const inputMaterial = document.getElementById("inputMaterial");
const inputColor = document.getElementById("inputColor");
const inputPrecio = document.getElementById("inputPrecio");
const inputImagen = document.getElementById("inputImagen");
const form = document.getElementById("form");
const btnEnviar = document.getElementById("btnEnviar");
const agregarProductos = document.getElementById("agregarProductos")
const mostrarFormulario = document.getElementById("mostrarFormulario")
const cancelar = document.getElementById("cancelar")
const editarProducto = document.getElementById("editarProducto")

//validaciones de los campos
let ID = "";

const validarNombre = () => {
  const value = inputNombre.value;
  if (value.trim().length <= 3) {
    inputNombre.classList.add("is-invalid");
    inputNombre.classList.remove("is-valid");
    return false;
  }
  inputNombre.classList.remove("is-invalid");
  inputNombre.classList.add("is-valid");
  return true;
};
const validarMedidas = () => {
  const value = inputMedidas.value;
  if (value.trim().length <= 3) {
    inputMedidas.classList.add("is-invalid");
    inputMedidas.classList.remove("is-valid");
    return false;
  }
  inputMedidas.classList.remove("is-invalid");
  inputMedidas.classList.add("is-valid");
  return true;
};
const validarMaterial = () => {
  const value = inputMaterial.value;
  if (value.trim().length <= 3) {
    inputMaterial.classList.add("is-invalid");
    inputMaterial.classList.remove("is-valid");
    return false;
  }
  inputMaterial.classList.remove("is-invalid");
  inputMaterial.classList.add("is-valid");
  return true;
};
const validarPrecio = () => {
  const value = inputPrecio.value;
  if (value.trim().length <= 3) {
    inputPrecio.classList.add("is-invalid");
    inputPrecio.classList.remove("is-valid");
    return false;
  }
  inputPrecio.classList.remove("is-invalid");
  inputPrecio.classList.add("is-valid");
  return true;
};
const validarColor = () => {
  const value = inputColor.value;
  if (value.trim().length <= 3) {
    inputColor.classList.add("is-invalid");
    inputColor.classList.remove("is-valid");
    return false;
  }
  inputColor.classList.remove("is-invalid");
  inputColor.classList.add("is-valid");
  return true;
};
const validarImagen = () => {
  const value = inputImagen.value;
  if (value.trim().length <= 3) {
    inputImagen.classList.add("is-invalid");
    inputImagen.classList.remove("is-valid");
    return false;
  }
  inputImagen.classList.remove("is-invalid");
  inputImagen.classList.add("is-valid");
  return true;
};

inputNombre.addEventListener("blur", validarNombre); //
inputMedidas.addEventListener("blur", validarMedidas); //
inputMaterial.addEventListener("blur", validarMaterial);
inputColor.addEventListener("blur", validarColor); //
inputPrecio.addEventListener("blur", validarPrecio); //
inputImagen.addEventListener("blur", validarImagen);

//boton para mostrar formulario de agregar prodcutos
agregarProductos.addEventListener("click", () => {
  mostrarFormulario.classList.remove("d-none")
  mostrarFormulario.classList.add("d-block")
})
//boton para ocultar el fomulario
cancelar.addEventListener("click", () => {
  mostrarFormulario.classList.remove("d-block")
  mostrarFormulario.classList.add("d-none")
})
// metodo para cargar un prodcuto en la base de datos
const postProductos = async () => {

  const nombre = inputNombre.value
  const medidas = inputMedidas.value
  const precio = inputPrecio.value
  const imagen = inputImagen.value
  const color = inputColor.value
  const material = inputMaterial.value

  try {
    const response = await axios.post("http://localhost:3000/productos", {
      nombre,
      medidas,
      precio,
      imagen,
      color,
      material
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error al enviar el formulario:", error);

  }
};
// evento para enviar un prodcuto para cargar en la base de datos
btnEnviar.addEventListener("click", (event) => {
  event.preventDefault();

  const isNameValidate = validarNombre(); //
  const isPrecioValidate = validarPrecio(); //
  const isColorValidate = validarColor(); //
  const isMedidasValidate = validarMedidas();
  const isImageValidate = validarImagen();
  const isMaterialValidate = validarMaterial(); //

  if (
    isColorValidate &&
    isMaterialValidate &&
    isImageValidate &&
    isPrecioValidate &&
    isMedidasValidate &&
    isNameValidate
  ) {
    Swal.fire({
      title: "Exito!!!",
      text: "Producto cargado con exito!",
      icon: "success",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        postProductos()

      }
    });
  }
});

// metodo ver los productos en la tabla
const getProductos = async () => {
  try {
    const res = await axios.get("http://localhost:3000/productos")
    const datos = res.data;

    const tbody = document.getElementById("tbody");

    datos.map((producto) => {
      tbody.innerHTML += `
       <tr>
            <th scope="row">${producto.id}</th>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.color}</td>
            <td>${producto.material}</td>
            <td><img src=${producto.imagen} class="img-table"></td>
            <td>
<button 
              class="btn btn-warning" 
              onClick="handleEdit('${producto.id}', '${producto.nombre}', '${producto.medidas}', '${producto.precio}', '${producto.imagen}', '${producto.color}', '${producto.material}')"
            >
              <i class="bi bi-pencil-fill"></i>
            </button>         <button class="btn btn-danger" onClick="handleDelete('${producto.id}')"><i class="bi bi-trash3"></i></button>
         <button class="btn btn-info"><i class="bi bi-eye-fill"></i></button>
            </td>
            
          </tr>`
    })

    console.log(datos);
  } catch (error) {

  }
}

const handleDelete = async (id) => {
  
  try {
    const result = await Swal.fire({
      title: "Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, elimínalo!"
    })
    if (result.isConfirmed) {
      const res = await axios.delete("http://localhost:3000/productos/" + id)


    }

  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Ocurrio un error",
      icon: "warning"
    });
  }


}




let idProductoEditar = null; // Almacenar el id del producto a editar

const handleEdit = async(id, nombre, medidas, precio, imagen, color, material) => {
  idProductoEditar = id;  // Almacenar el id del producto a editar

  // Rellenar los campos del formulario con los valores del producto
  inputNombre.value = nombre;
  inputImagen.value = imagen;
  inputColor.value = color;
  inputMedidas.value = medidas;
  inputPrecio.value = precio;
  inputMaterial.value = material;

  // Mostrar el formulario
  mostrarFormulario.classList.add("d-block");
  mostrarFormulario.classList.remove("d-none");
};

// Función para actualizar un producto
const putProductos = async() => {
  if (!idProductoEditar) {
    alert("No hay producto seleccionado para editar");
    return;
  }

  const nombre = inputNombre.value;
  const color = inputColor.value;
  const medidas = inputMedidas.value;
  const precio = inputPrecio.value;
  const material = inputMaterial.value;
  const imagen = inputImagen.value;

  try {
    // Enviar la solicitud PUT para actualizar el producto
    const response = await axios.put("http://localhost:3000/productos/" + idProductoEditar, {
      nombre,
      medidas,
      precio,
      imagen,
      color,
      material
    });

    if (response.status === 200) {
      Swal.fire("Éxito", "Producto actualizado correctamente", "success");
      // Limpiar el formulario después de editar
      
      // Ocultar el formulario de edición
      mostrarFormulario.classList.add("d-none");
      mostrarFormulario.classList.remove("d-block");
      getProductos(); // Recargar los productos para reflejar los cambios
    }
  } catch (error) {
    console.error("Error al editar el producto", error);
    Swal.fire("Error", "No se pudo actualizar el producto", "error");
  }
};

// Lógica para el botón "Editar Producto"
editarProducto.addEventListener("click", putProductos);

getProductos()

