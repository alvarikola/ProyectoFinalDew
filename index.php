<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");


// Recuperar datos de la base de datos

$servername = "localhost";
$username = "phpuser";
$password = "1234";
$dbname = "tiendaDew";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(["error" => $conn->connect_error]);
    exit;
}

$sql = "SELECT * FROM productos LIMIT 1";
$result = $conn->query($sql);

if ($result->num_rows === 0) {
    echo json_encode(["error" => "No hay productos"]);
    exit;
}

echo json_encode($result->fetch_assoc());
$conn->close();