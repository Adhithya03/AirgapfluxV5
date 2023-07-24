<?php

header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Accept');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
$input_data = file_get_contents('php://input');

$data = json_decode($input_data, true);

require_once 'db.php';
require_once 'helpers.php';
require_once 'validate.php';
require_once 'updateAlgolia.php';



$validation_result = validateInputData($data);

if ($validation_result === true && $data['password'] === '111111') {
  $topicname = $data['topicname'];
  $subject = $data['subject'];
  $resources = $data['resources'];
  $notes = $data['notes'];

  $rating = 3;
  $difficulty = 1;
  $restype = 1;
  $category ='reso';


  $youtube_link = convertYoutubeUrl($resources);
  $resources = convertYoutubeUrl($resources);

  if (insertResource($subject, $category, $topicname, $resources, $restype, $notes, $rating, $difficulty)) {
    generateResponse(true, "Added your resource, Thank you :)");
    $id = getLastInsertedId();
    addAlgoliaRecord($id,$topicname);
    generateThumbnail($id, $youtube_link);
  } else {
    generateResponse(false, mysqli_error($conn));
  }
  closeConnection();
} else {
  
  switch ($validation_result) {
    case 0:
      generateResponse(false, "Password wrong, Contact Adhithya for password.");
      // generateResponse(false, "Error: The 'subject' field must be exactly 4 characters long.");
      break;
    case 1:
      generateResponse(false, "Error: The 'resources' field must be a valid URL.");
      break;
    case 2:
      generateResponse(false, "Error: The 'topicname' field is required.");
      break;
    default:
      generateResponse(false, "Wrong Password.");
      break;
  }
}