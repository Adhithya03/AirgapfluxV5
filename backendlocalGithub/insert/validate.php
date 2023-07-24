<?php


function validateInputData($data) {
  $required_fields = ['subject', 'topicname', 'resources'];
  foreach ($required_fields as $field) {
    if (!isset($data[$field]) || empty($data[$field])) {
      switch ($field) {
        case 'subject':
          if (strlen($data[$field]) !== 4) {
            return 0;
          }
          break;
        case 'resources':
          if (!filter_var($data[$field], FILTER_VALIDATE_URL)) {
            return 1;
          }
          break;
        case 'topicname':
          return 2;
        default:
          return -1;
      }
    }
  }
  return true;
}