//https://www.youtube.com/watch?v=s4my97_KOjg
const canvas = document.querySelector("canvas");
const playButton = document.querySelector("#play")

const audioElement_g = new Audio('../js/pong_g.mp3'),
    audioElement_d = new Audio('../js/pong_d.mp3');

const context = canvas.getContext("2d"),
    width = screen.width * 5 / 10,   //canvas du jeu vaut 5/10 de l'écran
    height = screen.height * 5 / 10,
    ratio = width / height;  //calcul du ratio
canvas.width = width * ratio;
canvas.height = height * ratio;

context.scale(ratio, ratio);

//LES DIFFERENTES CLASS//	
class Ball {
    constructor(vx, vy)  //variable de construction de la balle
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

        if (this.x + this.r > width)   //si joueur droit perd +1 score du joueur gauche
        {

            context.fillStyle = 'White';   //écran blanc indique qu'un joueur a perdu
            context.fillRect(0, 0, width, height);
            restartGame();
            player1.score++;
            player2.y = height / 2;

        }
        else if (this.x - this.r < 0) {
            context.fillStyle = 'White';
            context.fillRect(0, 0, width, height);
            restartGame();
            player2.score++;
            player2.y = height / 2;


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

        if (left < pright && right > pleft && top < pbottom && bottom > ptop) //vérification des conditions pour le rebond
        {
            //DirectionBalle(player.y, player.h);
            if (this.y <= ptop + player.h / 2) {  //permet de svoir si la balle se trouve dans la moitie supérieur de la raquette

                if (this.x > width / 2) audioElement_d.play();     //sons venant de droite ou gauche
                else if (this.x < width / 2) audioElement_g.play();
                if (Math.abs(this.vx) < 15) this.vx *= -1.02;  //augmente la vitesse si elle est inférieur à 15
                if (Math.abs(this.vx) > 15) this.vx *= -1;
                this.vy = -Math.abs(this.vy);     //balle va vers le haut( vnégatif)
                DirectionBalle(player.y, player.h);//applique le ratio pour avoir la direction de la balle (voir function DirectionBalle)
            }
            if (this.y > pbottom - player.h / 2) {   //balle dans la moitié inférieur de la raquette

                if (this.x > width / 2) audioElement_d.play();
                else if (this.x < width / 2) audioElement_g.play();
                //DirectionBalle(player.y, player.h);
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


class Player    //création de la class "Player"
{
    constructor(x, xscore, h)    //valeur de chaque raquette
    {
        this.x = x;
        this.y = height / 2;
        this.w = 20;
        this.h = h;

        this.score = 0;
        this.xscore = xscore;
    }

    show()       //affiche les raquettes en blanc
    {
        let top = this.y - this.h / 2,
            left = this.x - this.w / 2;
        context.strokeStyle = 'white';
        context.fillRect(left, top, this.w, this.h);

        context.font = "30px Arial";
        context.fillText("Score : " + this.score, this.xscore, 30);
    }
}



//Function DES MOUVEMNT DES JOUEURS,BALLE,ET IA//

addEventListener("mousemove", playermove);
function playermove(event) {

    var canvasLocation = canvas.getBoundingClientRect();
    player1.y = (event.clientY - canvasLocation.y);
}

function DirectionBalle(PlayerY, PlayerH) {    //direction de la balle en fonction de la position de la balle sur la raquette

    var impact = ball.y - PlayerY;   //position de la balle a l'impact sur la raquette
    var ratio = PlayerH / (PlayerH / 2);         //calcul d'un ratio entre 0 et 10
    var vRela = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
    ball.vy = Math.round(impact * ratio / 10);   //applique un valeur arrondi du ratio sur la vitesse en y
    //ball.vx = Math.sqrt(vRela * vRela - ball.vy * ball.vy);
}


//Function D'ANIMATION//

var ball = new Ball(-6, 6);
var player1 = new Player(15, 50, 80),
    player2 = new Player(width - 15, width - 150, 80);



function raquette_2() {                                               //*                
    window.requestAnimationFrame(raquette_2);  		//voir fonction animate
    if (0 < player2.y < height) {
        player2.y += ball.vy * 0.85;  //faity bougé l'IA grâce a la vitesse en y de la balle
    }
}

function restartGame()     //redémarre le jeu quand un joueur a perdu ou 
//quand l'on doit remettre les score à 0
{
    //dirige la prochaine balle en fonction du joueur qui a perdu
    if (ball.x > width / 2) {
        ball.x = width - 75;                  //ici le joueur de droite
        ball.y = height / 2;
        ball.vx = -7;
    }
    else if (ball.x < width / 2) {
        ball.x = 75;
        ball.y = height / 2;           //ici le jouer de gauche
        ball.vx = 7;
    }
}

function animate() {
    context.clearRect(0, 0, width, height);     //efface le canvas

    context.strokeStyle = 'white';
    context.beginPath();                   //coordonné crayon virtuel 
    context.moveTo(width / 2, 0);
    context.lineTo(width / 2, height);
    context.stroke();                       // création de la ligne

    ball.players(player1);
    ball.players(player2);         //effectue les différente action de la class ball
    ball.update();
    ball.show();

    player1.show();           //fait les 2 raquettes(effectue les différentes action de la class Player
    player2.show();


    requestAnimationFrame(animate); //boucle à la fréquence d'animation de l'écran (60fps générallement)
}


playButton.addEventListener('click', () => {
    playButton.remove();
    raquette_2();
    animate();
});


