<?php

require_once '../vendor/autoload.php';

function addAlgoliaRecord($id,$topicname) {
  $client = Algolia\AlgoliaSearch\SearchClient::create(
    'adads',
    'asdasd'
  );
  $index = $client->initIndex('airgapflux_search_v1');
  $index->saveObjects([['id'=>$id,'TopicName'=>$topicname]], ['autoGenerateObjectIDIfNotExist' => true]);
}