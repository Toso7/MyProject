<?php

const CONFIG = [
  "oauth_client_id" => "bf3f1d0d8f145948087c",
  "oauth_client_secret" => "8461a5573e08c2426c26a1c24d9e831683a794e8",
  "oauth_host" => "github.com",
  "oauth_port" => 443,
  "oauth_path" => "/login/oauth/access_token",
  "oauth_method" => "POST"
];

if (isset($_GET['code'])) {

  $code = $_GET['code'];


  $postData = json_encode(
    array(
      "client_id" => CONFIG['oauth_client_id'],
      "client_secret" => CONFIG['oauth_client_secret'],
      "code" => $code,
    )
  );

  $curl = curl_init();

  curl_setopt_array($curl, array(
    CURLOPT_URL => 'https://' . CONFIG['oauth_host'] . CONFIG['oauth_path'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_ENCODING => '',
    CURLOPT_MAXREDIRS => 10,
    CURLOPT_TIMEOUT => 0,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
    CURLOPT_CUSTOMREQUEST => 'POST',
    CURLOPT_POSTFIELDS => $postData,
    CURLOPT_HTTPHEADER => array(
      'Content-Type: application/json'
    ),
  ));

  $response = curl_exec($curl);

  curl_close($curl);


  $ressult = array("error" => "error");

  if ($response) {
    $pieces = explode("=", $response);
    if ($pieces[0] === "access_token"){
      $pieces2 = explode("&", $pieces[1]);
      if (count($pieces2) > 0){
        $result = array("token" => $pieces2[0]);
      }

    }

  }

  header("Content-Type: application/json; charset=UTF-8");
  echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);


}



