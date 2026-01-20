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