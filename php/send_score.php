<?php
$servername = 'localhost';
$username = 'root';
$password = 'Projetensim2023';
$dbname = 'pong';
//On établit la connexion
$mysqli = new mysqli($servername, $username, $password, $dbname);

//On vérifie la connexion
if ($conn->connect_error) {
    die('Erreur : ' . $conn->connect_error);
}

$nickname = $_GET["nickname"];
$score = $_GET["score"];

$result = $mysqli->query("SELECT * FROM `player` WHERE `nickname` = '$nickname'");
$row = $result->fetch_row();
if ($result) {
    if ($row[1] < $score) {
        $mysqli->query("UPDATE `player` SET `score`='$score' WHERE `nickname`='$nickname'");
    }
} else {

    $mysqli->query("INSERT INTO `player` (`nickname`, `score`) VALUES ('$nickname', '$score')");
}
$mysqli->close();
