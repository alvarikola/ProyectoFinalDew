// Expresiones regulares
const patterns = {
    nombre: /^[A-ZÁÉÍÓÚÜ][a-záéíóúü\d]+$/,
    correo: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
    telefono: /^([89]\d{2}(\s?\d{2}){3})$/,
    movil: /^([67]\d{2}(\s?\d{2}){3})$/,
    iban: /[a-zA-Z]{2}[0-9]{20}$/,
    contrasena: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$?¡_\-\*])[A-Za-z\d@$?¡_\-\*]{12,}$/
};


function mostrarDatos(producto) {
    document.querySelector('.nombre').textContent = producto.nombre;
    document.querySelector('.precio').textContent = "$" + producto.precio;
    document.querySelector('.disponibilidad').textContent = producto.disponibilidad;
    document.querySelector('.imagenProducto').src = producto.imagen;
}

function recuperarDb() {
    fetch("index.php")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            mostrarDatos(data);
        })
        .catch(error => console.error(error));
}

recuperarDb();

const inputs = document.querySelectorAll('input');

// Recorrer los inputs uno por uno
inputs.forEach((input) => {

  // Validar cada input con diferentes métodos:
  input.addEventListener('keyup', (e) => { 

    // Para todos los inputs comparando que la expresion regular tenga el mismo nombre
    validate(e.target, patterns[e.target.attributes.name.value]);

  });
});

// Función de validación 'validate' para validar el valor del campo del formulario (variable 'campo') utilizando la expresión regular (variable 'regex').  
function validate(campo, regex) {
    // El método 'test' comprueba que el valor del campo recibido (e.target) cumple la expresión regular recibida (patterns[e.target.attributes.name.value]) como parámetros  
    if(regex.test(campo.value)) {
      campo.className = 'valido';
    } else {
      campo.className = 'invalido';
    }
}

const openLogin = document.getElementById("openLogin");
const closeLogin = document.getElementById("closeLogin");
const overlayLogin = document.getElementById("overlayLogin");
const login = document.getElementById("login")

const openRegistrar = document.getElementById("openRegistrar")
const closeRegistrar = document.getElementById("closeRegistrar");
const overlayRegistrar = document.getElementById("overlayRegistrar");


openLogin.addEventListener("click", () => {
    overlayLogin.classList.add("active");
});

closeLogin.addEventListener("click", () => {
    overlayLogin.classList.remove("active");
});

openRegistrar.addEventListener("click", () => {
    overlayLogin.classList.remove("active");
    overlayRegistrar.classList.add("active");
});

closeRegistrar.addEventListener("click", () => {
    overlayRegistrar.classList.remove("active");
});

// login.addEventListener("click", login());

// login() {

// }