<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require('PHPMailer/src/Exception.php');
require('PHPMailer/src/PHPMailer.php');
require("PHPMailer/src/SMTP.php"); ?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/style.css">
    <link rel="shortcut icon" href="/img/mafavicon.png" type="image/x-icon">
    <link href="https://fonts.googleapis.com/css?family=Wallpoet&display=swap" rel="stylesheet">
    <title>Contacts</title>
</head>

<body id="contacts_body" class="flex_page">
    <div id="head">
        <a class="head_btn" href="/php/pong.html">
            <div class="div_btn">Jouer</div>
        </a>
        <a class="head_btn" id="home" href="/index.html"></a>
        <a class="head_btn" href="/php/score.php">
            <div class="div_btn">Scores</div>
        </a>
    </div>

    <div class="contactez-nous">
        <h1>Contactez-nous</h1>
        <?php
        if (isset($_POST['sujet'])) {
            $mail = new PHPMailer();
            $mail->isSMTP();
            $mail->SMTPDebug = SMTP::DEBUG_OFF;
            $mail->Host = 'smtp.gmail.com';
            $mail->Port = 465;
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->SMTPAuth = true;
            $mail->Username = 'pong.ensim@gmail.com';
            $mail->Password = 'ebywhifnaspelhwy';
            $mail->setFrom('pong.ensim@gmail.com', 'PONG ENSIM');
            $mail->addAddress('antoine.riaublanc.etu@univ-lemans.fr', 'Antoine Riaublanc');
            $mail->addAddress('killian.picot.etu@univ-lemans.fr', 'Killian Picot');
            $mail->addReplyTo($_POST['email'], $_POST['nom']);

            //Set the subject line
            $mail->isHTML(true);
            $mail->Subject = $_POST["sujet"];

            $mail->Body = $_POST["message"] . "  --------------  " . $_POST['nom'] . "  --------------  " . $_POST['email'];
            $mail->AltBody = $_POST["message"] . "  --------------  " . $_POST['nom'] . "  --------------  " . $_POST['email'];
            if (!$mail->send()) {
        ?>
                <p>On dirait qu'il y a eu une erreur votre message ne nous est pas parvenu...</p>
            <?php
            } else {
            ?>
                <p>Votre message nous a été envoyé !</p>
            <?php
            }
        } else {
            ?>
            <p>Un problème, une question ? N’hésitez pas à utiliser ce formulaire
                pour
                prendre contact avec nous !</p>
            <form action="" id="form" name="form" method="POST">
                <div>
                    <label for="nom">Votre nom</label>
                    <input type="text" id="nom" name="nom" placeholder="Prénom Nom" required>
                </div>
                <div>
                    <label for="email">Votre e-mail</label>
                    <input type="email" id="email" name="email" placeholder="monadresse@mail.com" required>
                </div>
                <div>
                    <label for="sujet">Quel est le sujet de votre message ?</label>
                    <select name="sujet" id="sujet" required>
                        <option value="" disabled selected hidden>Choisissez le sujet de votre message</option>
                        <option value="probleme-score">Problème avec l'enregistrement de mon score</option>
                        <option value="Bug-jeu">Bug survenue en jeu</option>
                        <option value="autre">Autre...</option>
                    </select>
                </div>
                <div>
                    <label for="message">Votre message</label>
                    <textarea id="message" name="message" placeholder="Bonjour, je vous contacte car...." required></textarea>
                </div>
                <div>
                    <button id="contact_btn" type="submit">Envoyer mon message</button>
                </div>
            </form>
        <?php
        }
        ?>

    </div>
    <div id="foot_contacts">
        <p>kikipiicot@gmail.com // antoineriaublanc@gmail.com</p>
    </div>
</body>

</html>