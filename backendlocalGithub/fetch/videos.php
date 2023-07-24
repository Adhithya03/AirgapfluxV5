<?php
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT id,Subject,TopicName,Resources FROM resourcesmaster_01 WHERE Category = 'reso' AND resources LIKE 'https://%' ORDER BY TopicName;;");
$stmt->execute();

$result = $stmt->get_result();
$data = array();
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

$stmt->close();


$conn->close();

echo json_encode($data ?? []);
?>