create table usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL,
    iban VARCHAR(34) NOT NULL,
    fecha DATE NOT NULL
);


create table productos(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    precio FLOAT NOT NULL,
    disponibilidad INT NOT NULL,
    categoria VARCHAR(64) NOT NULL, 
    imagen TEXT NOT NULL
);