create table usuarios(
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL,
    iban VARCHAR(34) NOT NULL,
    contrasena VARCHAR(50) NOT NULL,
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


INSERT INTO productos (nombre, precio, disponibilidad, categoria, imagen)
VALUES 
('Los Pecadores', '20.0', '15', 'Película', '/Imagenes/los_pecadores_blue_ray.png'),
('Cars', '10.0', '7', 'Película', '/Imagenes/cars_blu_ray.jpg'),
('The Amazing Spiderman', '15.0', '12', 'Película', '/Imagenes/amazing_spiderman_dvd.png'),
('Jurassic Park', '12.30', '30', 'Libro', '/Imagenes/libro_jurassic_park.jpg'),
('Cd Thriller Michael Jackson', '25.0', '20', 'Música', '/Imagenes/cd_michael_jackson_thriller.jpg');