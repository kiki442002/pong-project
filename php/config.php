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