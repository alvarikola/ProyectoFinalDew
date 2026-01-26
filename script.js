// Expresiones regulares
const patterns = {
    nombre: /^[A-ZÁÉÍÓÚÜ][a-záéíóúü\d]+$/,
    correo: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
    telefono: /^([89]\d{2}(\s?\d{2}){3})$/,
    movil: /^([67]\d{2}(\s?\d{2}){3})$/,
    iban: /[a-zA-Z]{2}[0-9]{20}$/,
    contrasena: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$?¡_\-\*])[A-Za-z\d@$?¡_\-\*]{12,}$/
};


// Carrusel
const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');

let index = 1; // empezamos en la primera real
const DELAY = 2000;

function updateCarousel(animate = true) {
  track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
  track.style.transform = `translateX(-${index * 100}%)`;
}

// Posición inicial
updateCarousel(false);

// Autoplay
setInterval(() => {
  index++;
  updateCarousel();

  // Si llegamos al clon final
  if (index === slides.length - 1) {
    setTimeout(() => {
      index = 1;
      updateCarousel(false);
    }, 500);
  }

  // Si llegamos al clon inicial (por seguridad)
  if (index === 0) {
    setTimeout(() => {
      index = slides.length - 2;
      updateCarousel(false);
    }, 500);
  }
}, DELAY);




function mostrarDatos(productos) {
        productos.forEach(producto => {
        document.querySelector('.nombre').textContent = producto.nombre;
        document.querySelector('.precio').textContent = "$" + producto.precio;
        document.querySelector('.disponibilidad').textContent = producto.disponibilidad;
        document.querySelector('.imagenProducto').src = producto.imagen;
    })
    
}

// Función para recuperar todos los productos
function listarProductos() {
    fetch(`index.php?action=listar`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            mostrarDatos(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
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
const registrar = document.getElementById("registrar");


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
login.addEventListener("click", () => {
    overlayRegistrar.classList.remove("active");
});

// funcion para crear un usuario cuando los campos son validos
registrar.addEventListener("click", () => {
    
});