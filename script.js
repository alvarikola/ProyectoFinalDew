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
  productoActual = producto; // Guardar el producto actual
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
const contenedorCarrito = document.getElementById('contenedorCarrito');

// Verificar sesión al cargar
const usuarioGuardado = sessionStorage.getItem('usuario');
if (usuarioGuardado) {
  const usuario = JSON.parse(usuarioGuardado);
  nombreUsuario.textContent = usuario.nombre;
  contenedorLogin.style.display = 'none';
  contenedorCarrito.style.display = 'flex';
}

const btnLogin = document.getElementById('btnLogin');
btnLogin.addEventListener("click", () => {
  if (inputCorreoLogin.classList.contains('valido') && inputContrasenaLogin.classList.contains('valido')) {
    login()
  }
})

function login() {
  const correo = inputCorreoLogin.value.trim()
  const contrasena = inputContrasenaLogin.value.trim();
  
  fetch(`index.php?action=login&correo=${encodeURIComponent(correo)}&contrasena=${encodeURIComponent(contrasena)}`)
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
  const usuarioLogeado = {
    id: usuario.id,
    nombre: usuario.nombre,
    correo: usuario.correo,
};
  sessionStorage.setItem('usuario', JSON.stringify(usuarioLogeado));

  // Recuperar del sessionStorage
  const usuarioGuardado = JSON.parse(sessionStorage.getItem('usuario'));
  nombreUsuario.textContent = usuarioGuardado.nombre;

  // Limpiar formulario
  inputCorreoLogin.value = '';
  inputContrasenaLogin.value = '';

  // Limpiar clases de validación
  inputCorreoLogin.className = '';
  inputContrasenaLogin.className = '';

  // Mostrar carrito y ocultar login
  contenedorLogin.style.display = 'none';
  contenedorCarrito.style.display = 'flex';
}

const btnCerrarSesion = document.getElementById('btnCerrarSesion');
btnCerrarSesion.addEventListener("click", () => {
  alert("Cierre de sesión realizado con éxito");
  sessionStorage.removeItem('usuario');
  location.reload();
})

const btnAgregarCarrito = document.getElementById('btnAgregarCarrito');
const btnVaciarCarrito = document.getElementById('btnVaciarCarrito');
const btnFinalizarCompra = document.getElementById('btnFinalizarCompra');
const carritoVacio = document.getElementById('carritoVacio');
const productosCarrito = document.getElementById('productosCarrito');
const totalCarrito = document.getElementById('totalCarrito');
const itemCarritoTemplate = document.getElementById('itemCarritoTemplate');
let productoActual = null; // Variable para guardar el producto actual

btnAgregarCarrito.addEventListener("click", () => {
  agregarAlCarrito(productoActual);
})

// Función para agregar producto al carrito
function agregarAlCarrito(producto) {
  // Obtener carrito del localStorage o crear uno vacío
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Buscar si el producto ya está en el carrito
  const productoExistente = carrito.find(item => item.id === producto.id);
  
  if (productoExistente) {
    // Verificar si hay stock disponible
    if (productoExistente.cantidad < producto.disponibilidad) {
      productoExistente.cantidad++;
    } else {
      alert(`No hay más stock disponible de ${producto.nombre}. Stock máximo: ${producto.disponibilidad}`);
      return;
    }
  } else {
    // Agregar nuevo producto al carrito
    if (producto.disponibilidad > 0) {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1,
        stockMaximo: producto.disponibilidad
      });
    } else {
      alert('Producto sin stock disponible');
      return;
    }
  }
  
  // Guardar carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(carrito));
  
  // Actualizar la vista del carrito
  mostrarCarrito();
}

// Función para mostrar el carrito (estilo mostrarProducto)
function mostrarCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Eliminar todos los items anteriores excepto el template y el mensaje vacío
  const itemsAnteriores = productosCarrito.querySelectorAll('.item-carrito:not(#itemCarritoTemplate)');
  itemsAnteriores.forEach(item => item.remove());
  
  // Si el carrito está vacío
  if (carrito.length === 0) {
    carritoVacio.style.display = 'block';
    totalCarrito.textContent = '0.00€';
    return;
  }
  
  // Ocultar mensaje de carrito vacío
  carritoVacio.style.display = 'none';
  
  // Calcular total
  let total = 0;
  
  // Mostrar cada producto
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    
    // Clonar el template
    const nuevoItem = itemCarritoTemplate.cloneNode(true);
    nuevoItem.id = ''; // Quitar el id del template
    nuevoItem.style.display = 'flex'; // Mostrar el item
    
    // Rellenar los datos
    nuevoItem.querySelector('.img-item-carrito').src = item.imagen;
    nuevoItem.querySelector('.img-item-carrito').alt = item.nombre;
    nuevoItem.querySelector('.nombre-item-carrito').textContent = item.nombre;
    nuevoItem.querySelector('.cantidad-item-carrito').textContent = `Cantidad: ${item.cantidad}`;
    nuevoItem.querySelector('.item-precio').textContent = `${item.precio}€`;
    
    // Agregar evento al botón eliminar
    const btnEliminar = nuevoItem.querySelector('.btn-eliminar');
    btnEliminar.addEventListener('click', () => {
      eliminarDelCarrito(item.id);
    });

    // Añadir al contenedor
    productosCarrito.appendChild(nuevoItem);
  });
  
  // Actualizar total
  totalCarrito.textContent = total.toFixed(2) + '€';
}

// Llamar a mostrarCarrito cuando se cargue la página
document.addEventListener('DOMContentLoaded', () => {
  mostrarCarrito();
});

// Evento para vaciar todo el carrito
btnVaciarCarrito.addEventListener("click", () => {
  if (confirm('¿Estás seguro de que quieres vaciar todo el carrito?')) {
    vaciarCarrito();
  }
});

// Función para vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem('carrito');
  mostrarCarrito();
  alert('Carrito vaciado');
}

// Función para eliminar una unidad de un producto del carrito
function eliminarDelCarrito(idProducto) {
  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Buscar el producto
  const producto = carrito.find(item => item.id === idProducto);
  
  if (producto) {
    if (producto.cantidad > 1) {
      // Si hay más de 1, reducir la cantidad
      producto.cantidad--;
    } else {
      // Si solo hay 1, eliminar el producto completamente
      carrito = carrito.filter(item => item.id !== idProducto);
    }
  }
  
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

// Evento para finalizar compra
btnFinalizarCompra.addEventListener("click", () => {
  finalizarCompra()
});

function finalizarCompra() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  
  // Confirmar la compra
  if (!confirm('¿Confirmar la compra?')) {
    return;
  }
  
  // Enviar la compra al servidor
  fetch('index.php?action=comprar', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      productos: carrito
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la respuesta del servidor');
    }
    return response.json();
  })
  .then(data => {
    if (data.success) {
      alert('¡Compra realizada con éxito!');
      // Vaciar el carrito
      localStorage.removeItem('carrito');
      mostrarCarrito();
    } else {
      alert('Error al procesar la compra: ' + data.error);
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Error de conexión: ' + error.message);
  });
}