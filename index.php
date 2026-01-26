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


$conn->close();