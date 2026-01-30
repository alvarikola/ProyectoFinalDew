// Expresiones regulares
const patterns = {
    nombre: /^[A-ZÁÉÍÓÚÜ][a-záéíóúü\d]+$/,
    correo: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
    telefono: /^([67]\d{2}(\s?\d{2}){3})$/,
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



// Mostrar datos de todos los productos
function mostrarDatos(productos) {
        productos.forEach(producto => {
        document.querySelector('.nombre').textContent = producto.nombre;
        document.querySelector('.precio').textContent = producto.precio + "€";
        document.querySelector('.disponibilidad').textContent = "Stock: " + producto.disponibilidad;
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

// listarProductos();

// Funciones para login y registrarse
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

// Mostrar y ocultar formulario de login y registrar
const contenedorLogin = document.getElementById('contenedorLogin');
const contenedorRegistro = document.getElementById('contenedorRegistro');
const btnMostrarRegistro = document.getElementById('btnMostrarRegistro');
const btnMostrarLogin = document.getElementById('btnMostrarLogin');

btnMostrarRegistro.addEventListener("click", () => {
  contenedorLogin.style.display = 'none'
  contenedorRegistro.style.display = 'flex'

})

btnMostrarLogin.addEventListener("click", () => {
  contenedorLogin.style.display = 'flex'
  contenedorRegistro.style.display = 'none'

})

// Seleccionar producto desde el carrusel
const allSlides = document.querySelectorAll(".slide.seleccionable");

allSlides.forEach((slide) => {
  slide.addEventListener("click", () => {
    console.log("clicada imagen: " + slide.id)
    obtenerProducto(slide.id)
  })
})

function obtenerProducto(id) {
  fetch(`index.php?action=obtener&id=${id}`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    .then(data => {
      mostrarProducto(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

const contenedorProducto = document.getElementById('contenedorProducto');

// Mostrar datos del producto seleccionado
function mostrarProducto(producto) {
  contenedorProducto.style.display = 'flex';
  document.querySelector('.nombre').textContent = producto.nombre;
  document.querySelector('.categoria').textContent = producto.categoria;
  document.querySelector('.precio').textContent = producto.precio + "€";
  document.querySelector('.disponibilidad').textContent = "Stock: " + producto.disponibilidad;
  document.querySelector('.imagenProducto').src = producto.imagen;
}

// Seleccionar producto desde el menu
const allLi = document.querySelectorAll(".dropdown-content li");

allLi.forEach((li) => {
  li.addEventListener("click", () => {
    console.log("clicado li: " + li.id)
    obtenerProducto(li.id)
  })
})

const inputNombreRegistro = document.getElementById('regNombre');
const inputCorreoRegistro = document.getElementById('regCorreo');
const inputTelefonoRegistro = document.getElementById('regTelefono');
const inputIbanRegistro = document.getElementById('regIban');
const inputContrasenaRegistro = document.getElementById('regContrasena');


const btnRegistrarse = document.getElementById('btnRegistrarse');
btnRegistrarse.addEventListener("click", () => {
  registrar()
})


function registrar() {
  if (inputNombreRegistro.classList.contains('valido') && inputCorreoRegistro.classList.contains('valido') && inputTelefonoRegistro.classList.contains('valido') && inputIbanRegistro.classList.contains('valido') && inputContrasenaRegistro.classList.contains('valido')) {
    // Crear FormData con los datos
    const formData = new FormData();
    formData.append('action', 'registrar');
    formData.append('nombre', inputNombreRegistro.value.trim());
    formData.append('correo', inputCorreoRegistro.value.trim());
    formData.append('telefono', inputTelefonoRegistro.value.trim().replace(/\s/g, '')); // Eliminar espacios
    formData.append('iban', inputIbanRegistro.value.trim().toUpperCase()); // IBAN en mayúsculas
    formData.append('contrasena', inputContrasenaRegistro.value);

    fetch('index.php', {
      method: 'POST',
      body: formData
    })
      .then(response => {
        if(!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          alert('¡Registro exitoso! ' + data.message);
          
          // Limpiar formulario
          inputNombreRegistro.value = '';
          inputCorreoRegistro.value = '';
          inputTelefonoRegistro.value = '';
          inputIbanRegistro.value = '';
          inputContrasenaRegistro.value = '';

          // Limpiar clases de validación
          inputNombreRegistro.className = '';
          inputCorreoRegistro.className = '';
          inputTelefonoRegistro.className = '';
          inputIbanRegistro.className = '';
          inputContrasenaRegistro.className = '';
          
          // Volver al login
          btnMostrarLogin.click();
        } else {
          alert('Error: ' + data.error);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error de conexión: ' + error.message);
      });
  }
}

const inputCorreoLogin = document.getElementById('loginCorreo');
const inputContrasenaLogin = document.getElementById('loginContrasena');
const nombreUsuario = document.getElementById('nombreUsuario');

const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener("click", () => {
  if (inputCorreoLogin.classList.contains('valido') && inputContrasenaLogin.classList.contains('valido')) {
    login(inputCorreoLogin.value.trim())
  }
})

function login(correo) {
  fetch(`index.php?action=login&correo=${encodeURIComponent(correo)}`)
    .then(response => {
      if(!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        alert("Login realizado con éxito");
        mostrarLogin(data.usuario);
      } else {
        alert('Error: ' + data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Error de conexión: ' + error.message);
    });
}

function mostrarLogin(usuario) {
  nombreUsuario.textContent = usuario.nombre;
}