// Variable Global
var requestID = null;
var ball = null;
var player1 = null,
    player2 = null;

var div = document.createElement("div");
var playButton = document.querySelector("#play_btn");
var saveButton = document.querySelector("#save_btn");
var divButton = document.querySelector("#play");
const divCanvas = document.querySelector("#canvas");
var canvas = null;

const audioElement_g = new Audio('../js/pong_g.mp3'),
    audioElement_d = new Audio('../js/pong_d.mp3');

var context = null;
var width = null;
var height = null;
var ratio = null;
var div = null;


//LES DIFFERENTES CLASS//	
class Ball {
    constructor(vx, vy)  //fonction de construction de la balle
    {
        this.x = width / 2;
        this.y = height / 2;
        this.vx = vx;
        this.vy = vy;

        this.r = 10;
    }

    update()   //balle mis a jour
    {
        this.edges();
        this.x += this.vx;  //position t+1 = x + vx 
        this.y += this.vy;
    }

    edges()  //calcule des colision de la balle
    {
        if (this.y + this.r > height) {
            this.vy *= -1;
        }
        else if (this.y - this.r < 0) {
            this.vy *= -1;
        }

        if (this.x + this.r > width)   //si l'IA  perd +1 score
        {
            restartGame();
            player1.score++;
            player2.y = height / 2;

        }
        else if (this.x - this.r < 0) {
            StopGame(); //Arret du jeu si le joueur a perdu
        }
    }

    players(player) {
        let left = this.x - this.r, //position gauche
            right = this.x + this.r, //position droite
            top = this.y - this.r, //position haut
            bottom = this.y + this.r;// postion bas

        let pleft = player.x - player.w / 2,  //position joueur gauche
            pright = player.x + player.w / 2, //position joueur droite
            ptop = player.y - player.h / 2,   //position joueur haut
            pbottom = player.y + player.h / 2; //position joueur bas

        if (left < pright && right > pleft && top < pbottom && bottom > ptop) //v??rification des conditions pour le rebond
        {
            if (this.y <= ptop + player.h / 2) {  //permet de svoir si la balle se trouve dans la moitie sup??rieur de la raquette

                if (this.x > width / 2) audioElement_d.play();     //sons venant de droite ou gauche
                else if (this.x < width / 2) audioElement_g.play();
                if (Math.abs(this.vx) < 15) this.vx *= -1.02;  //augmente la vitesse si elle est inf??rieur ?? 15
                if (Math.abs(this.vx) > 15) this.vx *= -1;
                this.vy = -Math.abs(this.vy);     //balle va vers le haut( vy n??gatif)
                DirectionBalle(player.y, player.h);//applique le ratio pour avoir la direction de la balle (voir function DirectionBalle)
            }
            if (this.y > pbottom - player.h / 2) {   //balle dans la moiti?? inf??rieur de la raquette

                if (this.x > width / 2) audioElement_d.play();
                else if (this.x < width / 2) audioElement_g.play();
                if (Math.abs(this.vx) < 15) this.vx *= -1.02;
                if (Math.abs(this.vx) > 15) this.vx *= -1;
                this.vy = Math.abs(this.vy);
                DirectionBalle(player.y, player.h);
            }

        }
    }

    show()      // affiche la balle remplie en blanc
    {
        context.beginPath();
        context.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        context.fillStyle = 'white';
        context.fill();
    }
}

class Player    //cr??ation de la class "Player"
{
    constructor(x, h)    //hauteur et position x de chaque raquette
    {
        this.x = x;
        this.y = height / 2;
        this.w = 20;
        this.h = h;

        this.score = 0;
    }

    show()       //affiche les raquettes en blanc
    {
        let top = this.y - this.h / 2,
            left = this.x - this.w / 2;
        context.strokeStyle = 'white';
        context.fillRect(left, top, this.w, this.h);
    }
}


function DirectionBalle(PlayerY, PlayerH) {    //direction de la balle en fonction de la position de la balle sur la raquette

    var impact = ball.y - PlayerY;   //position de la balle a l'impact sur la raquette
    var ratio = PlayerH / (PlayerH / 2);         //calcul d'un ratio entre 0 et 10
    ball.vy = Math.round(impact * ratio / 10);   //applique une valeur arrondi du ratio sur la vitesse en y
}


//Function D'ANIMATION//

// Calcul un nombre al??atoire
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

// fonction qui fait bouger l'IA
function IA() {
    if (0 <= player2.y <= height) {
        // Calcul d'une vitesse al??atoire entre 120% et 65% de la vitesse de la balle
        let speed = getRandomIntInclusive(65, 120) / 100;
        player2.y += ball.vy * speed;
    }
}

function restartGame()     //red??marre le jeu si le joueur a gagner un point
{
    ball.x = width - 75;
    ball.y = height / 2;
    ball.vx = -6;
}

function animate() {
    requestID = requestAnimationFrame(animate); //boucle ?? la fr??quence d'animation de l'??cran (60fps g??n??rallement)
    context.clearRect(0, 0, width, height);     //efface le canvas
    IA();
    context.strokeStyle = 'white';
    context.beginPath();                   //coordonn?? crayon virtuel 
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();                       // cr??ation de la ligne

    ball.players(player1);
    ball.players(player2);         //effectue les diff??rente action de la class ball
    ball.update();
    ball.show();

    player1.show();           //fait les 2 raquettes(effectue les diff??rentes action de la class Player
    player2.show();

    context.font = "1.5rem Wallpoet";
    context.fillText("Score : " + player1.score, 30, 30);
}


function startGame() {
    // Cr???? le canvas et retire la divion d'alignement pour qu'il soit au milieu
    document.querySelector("#align").remove();
    divButton.remove();
    document.querySelector("body").append(document.createElement("canvas"));
    div = document.createElement("div");
    document.querySelector("body").append(div);
    canvas = document.querySelector("canvas");
    context = canvas.getContext("2d");
    width = screen.width * 6 / 10;   //canvas du jeu vaut 6/10 de l'??cran
    height = screen.height * 6 / 10;
    ratio = width / height;  //calcul du ratio

    // Pr??paration du canvas
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    context.scale(ratio, ratio);

    // Cr??ation des classes
    ball = new Ball(-6, 6);
    player1 = new Player(15, 80);
    player2 = new Player(width - 15, 65);

    // Ecoute de la position de la souris
    addEventListener("mousemove", (event) => {
        var canvasLocation = canvas.getBoundingClientRect();
        player1.y = (event.clientY - canvasLocation.y);
    });

    // D??mare le jeu
    animate();

}

function StopGame() {
    // Stop l'animation
    cancelAnimationFrame(requestID);

    // retire le canvas
    canvas.remove();
    div.remove();

    // Ajoute les boutons pour rejouer ou enregistrer le score
    var divEle = document.createElement("div");
    divEle.setAttribute("id", "play");
    document.querySelector("body").append(divEle);
    divButton = document.querySelector("#play");
    divButton.innerHTML = "<div id=txt_score>Votre Score: " + player1.score + "</div></br><button class='game_btn' id='save_btn'>Enregistrer le score</button> <button class='game_btn' id='play_btn'>Rejouer</button>";
    playButton = document.querySelector("#play_btn");
    saveButton = document.querySelector("#save_btn");
    var align = document.createElement("div");
    align.setAttribute('id', 'align');
    document.querySelector("body").append(align);

    // Affichage du formulaire d'enregistrement du score
    saveButton.addEventListener('click', () => {
        divButton.innerHTML = "<form action='javascript:send_score()' class='game_btn'><label for='nickname' id='label_nickname'>Pseudo</label><input type='text' name='nickname' id='nickname' required maxlength='15'><button type='submit' id='submit'>Ok</button> </form>";
    });

    // rejoue
    playButton.addEventListener('click', () => {
        startGame();
    });

}

// Bouton commencer
playButton.addEventListener('click', () => {
    startGame();
});


// Fonction Ajax qui envoie le score a la bdd
function send_score() {
    var nickname = document.querySelector("#nickname").value;
    document.querySelector("form").remove();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            alert("Score Envoyer");
            var replayButton = document.createElement("button");
            // divButton = document.querySelector("#play");
            replayButton.setAttribute("class", "game_btn");
            replayButton.textContent = "Rejouer";
            divButton.append(replayButton);
            replayButton.addEventListener("click", () => {
                startGame();
            });

        }
    };
    xhttp.open("GET", `/php/send_score.php?nickname=${nickname}&score=${player1.score}`, true);
    xhttp.send();
}


