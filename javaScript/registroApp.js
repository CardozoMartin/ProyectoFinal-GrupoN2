const inputNombreApellido = document.getElementById("inputNombreApellido")
const inputEmail = document.getElementById("inputEmail")
const inputTelefono = document.getElementById("inputTelefono")
const inputPass = document.getElementById("inputPass")
const inputConfirmPass = document.getElementById("inputConfirmPass")

const form = document.getElementById("form")

const btnCrearUsuario = document.getElementById("btnCrearUsuario")

//Metodos para Validar lo ingresado en el formulario

const validarNombreApellido = () => {
    const value = inputNombreApellido.value;
    if(value.trim().length <= 3 ){
        inputNombreApellido.classList.add("is-invalid");
        inputNombreApellido.classList.remove("is-valid");
        return false; 
    }
    inputNombreApellido.classList.remove("is-invalid");
    inputNombreApellido.classList.add("is-valid");
    return true; 
};
const validarEmail= ()=>{
    const value = inputEmail.value;
    if(value.trim().length <=3){
        inputEmail.classList.add("is-invalid");
        inputEmail.classList.remove("is-valid");
        return false; 
    }
    inputEmail.classList.remove("is-invalid");
    inputEmail.classList.add("is-valid");
    return true; 
};
const validarTelefono= ()=>{
    const value = inputTelefono.value;
    if(value.trim().length <=3){
        inputTelefono.classList.add("is-invalid");
        inputTelefono.classList.remove("is-valid");
        return false; 
    }
    inputTelefono.classList.remove("is-invalid");
    inputTelefono.classList.add("is-valid");
    return true; 
};
const validarPass = ()=>{
    const value = inputPass.value;
    if(value.trim().length <=3){
        inputPass.classList.add("is-invalid");
        inputPass.classList.remove("is-valid");
        return false; 
    }
    inputPass.classList.remove("is-invalid");
    inputPass.classList.add("is-valid");
    return true; 
};
const validarConfirmPass = ()=>{
    const value = inputConfirmPass.value;
    if(value.trim().length <=3){
        inputConfirmPass.classList.add("is-invalid");
        inputConfirmPass.classList.remove("is-valid");
        return false; 
    }
    inputConfirmPass.classList.remove("is-invalid");
    inputConfirmPass.classList.add("is-valid");
    return true; 
};

// Metodo blur pone/quita el foco del elemento 
inputNombreApellido.addEventListener("blur", validarNombreApellido); //
inputEmail.addEventListener("blur", validarEmail); //
inputTelefono.addEventListener("blur", validarTelefono);
inputPass.addEventListener("blur", validarPass); //
inputConfirmPass.addEventListener("blur", validarConfirmPass); //

//Metodo post para guardar el usuario en el DB.JSON
const postUsuario = async ()=>{
    try {
        const response = await axios.post("http://localhost:3000/usuarios", {
            nombreapellido: inputNombreApellido.value,
            email: inputEmail.value,
            telefono: inputTelefono.value,
            contraseña: inputPass.value,
            confirmarcontraseña: inputConfirmPass.value,
        });
    } catch (error) {
        console.error("Error al cargar el Usuario", error);
        swal.fire({
            title: "Error",
            text: "Ocurrio un error al cargar Usuario",
            icon: "error",
            confirmButtonText:"Aceptar",
        });
    }
};
form.addEventListener("submit", (event)=>{
    event.preventDefault();
    const isNombreApellidoValidate = validarNombreApellido();
    const isEmailValidate = validarEmail();
    const isTelefonoValidate = validarTelefono();
    const isPassValidate = validarPass();
    const isConfirmPassValidate = validarConfirmPass();

    if(
        isNombreApellidoValidate&&
        isEmailValidate&&
        isTelefonoValidate&&
        isPassValidate&&
        isConfirmPassValidate
    ) {swal.fire ({
            title: "Usuario creado exitosamente",
            text: "Gracias Por crear tu usuario",
            icon: "success",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
        })
        .then((result) => {
            if (result.isConfirmed) {
              postUsuario();
            }
        })
    }
})




