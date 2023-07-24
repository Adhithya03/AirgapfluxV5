<?php
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');


$query = $_GET['s'];

require_once '../vendor/autoload.php';


$ids = array();
if (isset($results['hits'])) {
    foreach ($results['hits'] as $hit) {
        $ids[] = $hit['id'];
    }
}


$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (!empty($ids)) {
    $stmt = $conn->prepare("SELECT * FROM resourcesmaster_01 WHERE id IN (".implode(',', $ids).")");
    $stmt->execute();

    $result = $stmt->get_result();
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }

    $stmt->close();
}

$conn->close();

echo json_encode($data ?? []);
?>