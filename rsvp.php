<?php
// process.php



$errors         = array();      // array to hold validation errors
$data           = array();      // array to pass back data


session_start();
$db = new mysqli('localhost', 'username', 'password', 'craiglegg');

if($db->connect_errno > 0){
    $errors['sqlcon']='Unable to connect to database [' . $db->connect_error . ']';
}

// validate the variables ======================================================
    // if any of these variables don't exist, add an error to our $errors array

    if (empty($_POST['name']))
        $errors['name'] = 'You forgot to enter your name';


    if (empty(($_POST['attend'])))
        $errors['attend'] = "You forgot to say whether you're attending";


    if (empty($_POST['transportation']) && $_POST['attend']=="yesattending")
        $errors['transportation'] = 'You forgot to select your transportation';

    if ($_POST['attend']=="yesattending"){
      $a2=1;
    }else{
      $a2=0;
    }

    if ($_POST['camp']=="true"){
      $a6=1;
    }else{
      $a6=0;
    }



// return a response ===========================================================

    // if there are any errors in our errors array, return a success boolean of false


    $data['name']=$_POST['name'];
    $data['attend']=$_POST['attend'];
    $data['transportation']=$_POST['transportation'];
    $data['songreq']=$_POST['songreq'];
    $data['other']=$_POST['other'];

    $a1=$_POST['name'];
    $a3=$_POST['transportation'];
    $a4=$_POST['songreq'];
    $a5=$_POST['other'];

    if ( ! empty($errors)) {
        $data['success'] = false;
        $data['errors']  = $errors;
    } else {
        $data['success'] = true;
        $data['message'] = 'Success!';
        $sql = "INSERT INTO rsvp (Name, Attending, Transportation, SongRequest, Other, camp)
        VALUES ('$a1', '$a2', '$a3', '$a4', '$a5', '$a6')";
        if($db->query($sql) === TRUE){
          $data['sql']='NO SQL ERROR';
        }else{
          $data['sql']='SQL ERROR';
        }
      }
    // return all our data to an AJAX call
    echo json_encode($data);
