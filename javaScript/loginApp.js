const btnIngresarUsuario = document.getElementById("btnIngresarUsuarioLogin");
const errormsj = document.getElementById("mensajeError");

const validarEmailPass = async () => {
    try {
        const inputEmail = document.getElementById("inputEmailLogin").value;
        const inputPass = document.getElementById("inputPassLogin").value;

        console.log("Email ingresado:", inputEmail);
        console.log("Contraseña ingresada:", inputPass);

        const response = await axios.get("http://localhost:3000/usuarios");
        console.log("Usuarios obtenidos:", response.data);

        const userValid = response.data.find(
            (usuario) => usuario.email === inputEmail && usuario.contrasena === inputPass
        );
 // Uservalid toma el valor undifined si email y contraseña no son iguales, por eso usamos userValid!=undefined
        if (userValid!=undefined) {
            errormsj.innerHTML = ``;
            errormsj.classList.remove("alert", "alert-danger"); 
            swal.fire({
                title: "Se inició sesión",
                text: "¡Bienvenido de nuevo!",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "OK",
            });
        } else {
            errormsj.innerHTML = `Contraseña o Email incorrecto`;
            errormsj.classList.add("alert", "alert-danger"); 
        }
    } catch (error) {
        console.error("Error de conexión o procesamiento:", error);
        errormsj.innerHTML = `Error en el servidor o problema de red. Intente nuevamente.`;
        errormsj.classList.add("alert", "alert-danger");
    }
};

btnIngresarUsuario.addEventListener("click", (event) => {
    event.preventDefault();
    validarEmailPass();
});
