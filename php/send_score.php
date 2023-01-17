<?php
require("config.php");

$nickname = $_GET["nickname"];
$score = $_GET["score"];
$result = $mysqli->query("SELECT * FROM `player` WHERE `nickname` = '$nickname'");
$row = $result->fetch_row();
// Verifie si le joueur existe
if (!empty($row)) {
    // verifie que le score soit supérieur avant de faire la misa à jour du score
    if ($row[1] < $score) {
        // envoie du score dans la bdd
        $mysqli->query("UPDATE `player` SET `score`='$score' WHERE `nickname`='$nickname'");
    }
} else {
    // envoie du score dans la bdd
    $mysqli->query("INSERT INTO `player` (`nickname`, `score`) VALUES ('$nickname', '$score')");
}
$mysqli->close();
