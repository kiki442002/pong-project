<?php
require("config.php");

$nickname = $_GET["nickname"];
$score = $_GET["score"];
$result = $mysqli->query("SELECT * FROM `player` WHERE `nickname` = '$nickname'");
$row = $result->fetch_row();
if (!empty($row)) {
    if ($row[1] < $score) {
        $mysqli->query("UPDATE `player` SET `score`='$score' WHERE `nickname`='$nickname'");
    }
} else {

    $mysqli->query("INSERT INTO `player` (`nickname`, `score`) VALUES ('$nickname', '$score')");
}
$mysqli->close();
