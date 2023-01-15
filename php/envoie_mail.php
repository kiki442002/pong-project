<?php
if (isset($_POST['mailform'])) {
    $header = "MIME-Version: 1.0\r\n";
    $header .= 'From:"Pong Group"<pong.ensim@gmail.com>' . "\n";
    $header .= 'Content-Type:text/html; charset="uft-8"' . "\n";
    $header .= 'Content-Transfer-Encoding: 8bit';
    mail($_POST['email'], $_POST['sujet'], $_POST['message'], $header);
}
