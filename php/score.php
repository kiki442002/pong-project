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

    <h1>Top 25 des meilleur joueurs</h1>

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
    $result = $mysqli->query("SELECT * FROM `player` ORDER BY score DESC");
    $n = mysqli_num_rows($result);
    /* if ($n > 25) {
        $n = 25;
    }*/
    echo $n;
    while ($row = mysqli_fetch_array($result, $n)) {
        printf("Name: %s  Score: %s", $row[0], $row[1]);
        echo "</br>";
    }

    mysqli_free_result($result);
    $mysqli->close(); ?>
</body>


</html>