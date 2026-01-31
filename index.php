<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


// Recuperar datos de la base de datos

$servername = "localhost";
$username = "phpuser";
$password = "1234";
$dbname = "tiendaDew";

$action = $_GET['action'] ?? $_POST['action'] ?? 'listar';

$conn = new mysqli($servername, $username, $password, $dbname);

// Enrutador de acciones
switch ($action) {
    case 'listar':
        listarProductos($conn);
        break;
    
    case 'obtener':
        obtenerProducto($conn);
        break;

    case 'registrar':
        registrar($conn);
        break;
        
    case 'login':
        login($conn);
        break;    
    
    default:
        echo json_encode(["error" => "Acción no válida"]);
}

if ($conn->connect_error) {
    echo json_encode(["error" => $conn->connect_error]);
    exit;
}

function listarProductos($conn) {
    $sql = "SELECT * FROM productos";
    $result = $conn->query($sql);
    
    if ($result->num_rows === 0) {
        echo json_encode(["error" => "No hay productos"]);
        return;
    }
    
    $productos = [];
    while ($row = $result->fetch_assoc()) {
        $productos[] = $row;
    }
    
    echo json_encode($productos);
}

function obtenerProducto($conn) {
    $id = $_GET['id'] ?? null;
    
    if (!$id) {
        echo json_encode(["error" => "ID requerido"]);
        return;
    }
    
    $stmt = $conn->prepare("SELECT * FROM productos WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(["error" => "Producto no encontrado"]);
        return;
    }
    
    echo json_encode($result->fetch_assoc());
}

function registrar($conn) {

    // Obtener datos del POST
    $nombre = $_POST['nombre'] ?? null;
    $correo = $_POST['correo'] ?? null;
    $telefono = $_POST['telefono'] ?? null;
    $iban = $_POST['iban'] ?? null;
    $contrasena = $_POST['contrasena'] ?? null;
    $fecha = date('Y-m-d'); // Fecha actual
    
    // Validar que todos los campos requeridos estén presentes
    if (!$nombre || !$correo || !$telefono || !$iban || !$contrasena) {
        echo json_encode(["error" => "Todos los campos son requeridos"]);
        return;
    }
    
    // Preparar la consulta
    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, telefono, iban, contrasena, fecha) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $nombre, $correo, $telefono, $iban, $contrasena, $fecha);
    
    // Ejecutar la consulta
    if ($stmt->execute()) {
        echo json_encode([
            "success" => true,
            "message" => "Usuario registrado exitosamente",
            "id" => $stmt->insert_id
        ]);
    } else {
        // Verificar si es error de correo duplicado
        if ($stmt->errno === 1062) {
            echo json_encode(["error" => "El correo ya está registrado"]);
        } else {
            echo json_encode(["error" => "Error al registrar usuario: " . $stmt->error]);
        }
    }
    
    $stmt->close();
}

function login($conn) {
    $correo = $_GET['correo'] ?? null;
    $contrasena = $_GET['contrasena'] ?? null;
    
    if (!$correo || !$contrasena) {
        echo json_encode(["error" => "Correo y contraseña requeridos"]);
        return;
    }
    
    // Consulta SQL que verifica correo Y contraseña
    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?");
    $stmt->bind_param("ss", $correo, $contrasena);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        echo json_encode(["error" => "Credenciales incorrectas"]);
        return;
    }
    
    $usuario = $result->fetch_assoc();
    
    // No enviar la contraseña al cliente
    unset($usuario['contrasena']);
    
    echo json_encode([
        "success" => true,
        "usuario" => $usuario
    ]);
    
    $stmt->close();
}

function comprar($conn) {

}

$conn->close();