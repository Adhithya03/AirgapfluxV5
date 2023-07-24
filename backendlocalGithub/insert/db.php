<?php



$conn = mysqli_connect($servername, $username, $password, $dbname);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

function insertResource($subject, $category, $topicname, $resources, $restype, $notes, $rating, $difficulty) {
    global $conn;
    $sql = "INSERT INTO resourcesmaster_01 (Subject, Category, TopicName, Resources, `Resource Type`, Notes, ConceptualRating, `LevelOfDifficulty`) VALUES ('$subject', '$category', '$topicname', '$resources', $restype, '$notes', $rating, $difficulty)";
    if (mysqli_query($conn, $sql)) {
        return true;
    } else {
        return false;
    }
}

function getLastInsertedId() {
    global $conn;
    $query = "SELECT id FROM resourcesmaster_01 ORDER BY id DESC LIMIT 1";
    $result = mysqli_query($conn, $query);
    $id = mysqli_fetch_assoc($result)['id'];
    return $id;
}

function closeConnection() {
    global $conn;
    mysqli_close($conn);
}