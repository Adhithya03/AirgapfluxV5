<?php

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');

$data = json_decode(file_get_contents("php://input"), true);

$id    = $data["id"] ?? "";
$title = $data["title"] ?? "";
$resources = $data["resources"] ?? "";
$notes = $data["notes"] ?? "";



$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE resourcesmaster_01 SET TopicName = ?, Resources = ?, Notes = ? WHERE id = ?";
$stmt = $conn->prepare($sql);

// Use mysqli_stmt_bind_param() function to bind the parameters
mysqli_stmt_bind_param($stmt, "sssi", $title, $resources, $notes, $id);

// Use mysqli_stmt_execute() function to execute the statement
if (mysqli_stmt_execute($stmt)) {
  echo json_encode(["message" => "Resource updated successfully."]);
} else {
  echo json_encode(["message" => "Resource updation failed."]);
}

$conn->close();
?>
