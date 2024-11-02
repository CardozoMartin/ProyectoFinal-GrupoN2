const inputNombre = document.getElementById("inputNombre");
const inputMedidas = document.getElementById("inputMedidas");
const inputMaterial = document.getElementById("inputMaterial");
const inputColor = document.getElementById("inputColor");
const inputPrecio = document.getElementById("inputPrecio");
const inputImagen = document.getElementById("inputImagen");
const form = document.getElementById("form");
const btnEnviar = document.getElementById("btnEnviar");



// window.addEventListener("scroll", () => {
//   const scroll = window.scrollY;
//   console.log(scroll);

//   if (scroll > 200) {
//     document.body.style.backgroundColor = "red";
//   } else {
//     document.body.style.backgroundColor = ""; // O el color que prefieras
//   }
// });

//validaciones de los campos

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
const postProductos = async () => {
  const producto = {
    nombre: inputNombre.value,
    medidas: inputMedidas.value,
    precio: inputPrecio.value,
    imagen: inputImagen.value,
    color: inputColor.value,
    material: inputColor.value,
  };
  try {
    const response = await fetch("http://localhost:3000/productos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ producto }),
    });
    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const data = await response.json();
  } catch (error) {
    console.error("Error al enviar el formulario:", error);
    Swal.fire({
      title: "Error",
      text: "Ocurrió un error al enviar el formulario.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};

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
    postProductos();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "hola mundo",
      showConfirmButton: false,
      timer: 5500,
    });
  }
});
