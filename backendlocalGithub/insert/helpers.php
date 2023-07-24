<?php

function convertYoutubeUrl($url){
  $pattern = '/^https?:\/\/(www\.)?youtu(be|\.be)\/(.*)$/';
  if (preg_match($pattern, $url)) {
      $url_parts = parse_url($url);
      $path_parts = pathinfo($url_parts['path']);
      $video_id = $path_parts['filename'];
      $time = isset($url_parts['query']) ? '&'.trim($url_parts['query']) : '';
      $new_url = 'https://www.youtube.com/watch?v='.$video_id.$time;
      return $new_url;
  } else { 
      return $url;
  }
}

function generateThumbnail($id, $youtube_link) {
  $parts = parse_url($youtube_link);
  if (
    isset($parts["host"]) &&
    ($parts["host"] == "www.youtube.com" || $parts["host"] == "youtu.be") && // include both formats
    strpos($parts["path"], "/playlist") === false &&
    strpos($parts["path"], "/channel") === false &&
    strpos($parts["path"], "/user") === false &&
    strpos($parts["path"], "@") === false
    ) {
      if ($parts["host"] == "www.youtube.com") { // extract video id from query string for "watch?v=" format
        parse_str($parts["query"] ?? '', $query);
        $video_id = isset($query["v"]) ? substr($query["v"], 0, 11) : '';
      } else { // extract video id from path for "youtu.be/" format
        $video_id = substr($parts["path"], 1, 11);
      }
      
      if (!empty($video_id)) {
        $filename = $id . ".jpg";
        $path = "../../thumbnailcache/images/" . $filename;
        $thumbnail_data = file_get_contents("https://img.youtube.com/vi/" . $video_id . "/hqdefault.jpg");
        if (!empty($thumbnail_data)) {
          $thumbnail = imagecreatefromstring($thumbnail_data);
          if ($thumbnail !== false) {
            $height = imagesy($thumbnail);
            $cropped_thumbnail = imagecreatetruecolor(imagesx($thumbnail), $height - 90);
            imagecopy($cropped_thumbnail, $thumbnail, 0, 0, 0, 45, imagesx($thumbnail), $height - 90);
            imagejpeg($cropped_thumbnail, $path);
          }
        }
      }
  }
}


function generateResponse($success, $message) {
  $response = ["success" => $success, "message" => $message];
  echo json_encode($response);
}