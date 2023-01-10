<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="shortcut icon" href="../img/mafavicon.png" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Wallpoet&display=swap" rel="stylesheet">
    <title>Scores</title>
</head>

<body>
    <div id="head">
        <a class="head_btn" href="pong.html"><button type="button">Jouer</button></a>
        <a class="head_btn" href="../index.html"><img src="../img/home.png" alt=""></a>
        <a class="head_btn" href="score.php"><button type="button">Scores</button></a>
    </div>

    <h1>Top 25 des meilleurs joueurs</h1>

    <?php
    require("config.php");
    $result = $mysqli->query("SELECT * FROM `player` ORDER BY score DESC");
    $i = 0;
    while ($row = mysqli_fetch_array($result, 2) and $i <= 25) {
        $i++;
        printf("Name: %s  Score: %s", $row[0], $row[1]);
        echo "</br>";
    }

    mysqli_free_result($result);
    $mysqli->close(); ?>
</body>


</html>