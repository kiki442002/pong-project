<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'pong';
//On établit la connexion
$mysqli = new mysqli($servername, $username, $password, $dbname);

//On vérifie la connexion
if ($mysqli->connect_error) {
    die('Erreur : ' . $mysqli->connect_error);
}
