<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="shortcut icon" href="/img/mafavicon.png" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Wallpoet&display=swap" rel="stylesheet">
    <title>Scores</title>
</head>

<body>
    <div class="flex_page">
        <div>
            <!-- header -->
            <div id="head">
                <a class="head_btn" href="/php/pong.html">
                    <div class="div_btn">Jouer</div>
                </a>
                <a class="head_btn" id="home" href="/index.html"></a>
                <a class="head_btn" href="/php/score.php">
                    <div class="div_btn">Scores</div>
                </a>
            </div>
            <!--  -->

            <h1>Top 25 des meilleurs joueurs</h1>
        </div>
        <table>
            <tr>
                <th class="col" scope="col">Rang</th>
                <th class="col right" scope="col">Joueur</th>
                <th class="col left" scope="col">Score</th>
            </tr>
            <?php
            require("config.php");
            $result = $mysqli->query("SELECT * FROM `player` ORDER BY score DESC");
            $i = 0;
            // Affichage des 25 premières lignes de la requète dans le tableau
            while ($row = mysqli_fetch_array($result, 2) and $i < 25) {
                $i++;
                echo "<tr>";
                echo "<td class='rang'>#", $i, "</td>";
                echo "<th scope='row' class='right'>", $row[0], "</th>";
                echo "<td class = 'left'>", $row[1], "</td>";
                echo "</tr>";
            }

            mysqli_free_result($result);
            $mysqli->close(); ?>

        </table>


    </div>
    <!-- footer -->
    <div id="foot_home">
        <a href="/php/contacts.php">
            <div id="contacts_btn" class="div_btn">Contacts</div>
        </a>
        <p class="legal">PICOT Killian, RIAUBLANC Antoine tous droits réservés</p>
    </div>
    <!--  -->
</body>


</html>