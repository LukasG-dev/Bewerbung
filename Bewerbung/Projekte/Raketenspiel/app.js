
// hier wird die Spielfläche erstellt
const app = new PIXI.Application({
    width: 1300,
    height: 750,
});
document.getElementById("game-container").appendChild(app.view);

// Vaiabeln
const ufoList = [];
const enemyList = [];
const starList = [];
const immortalList = [];
const emoji = "😨"+"\uD83D\uDE80"+"💥"+"😨";

let score = 0;
let highScore = 0;

const scoreText = new PIXI.Text('Score: 0', {
        fontFamily: 'Arial',
        fontSize: 36,
        fill: 0xffffff,
    });
scoreText.x = 20;
scoreText.y = 60;
app.stage.addChild(scoreText);

// LocalStorage
const highScoreText = new PIXI.Text('Highscore: 0', {
    fontFamily: 'Arial',
    fontSize: 36,
    fill: 0xffffff,
});
highScoreText.y = 20;
highScoreText.x = 20;
app.stage.addChild(highScoreText);

// Start punkt der rocket und die skalierung
const rocket = PIXI.Sprite.from('assets/rocket.png');
rocket.x = 600;
rocket.y= 650;
rocket.scale.x = 0.05;
rocket.scale.y = 0.05;
app.stage.addChild(rocket);

highScore = parseInt(localStorage.getItem("highScore")) || 0;
highScoreText.text = "Highscore: " + highScore;

// Game Over nachrichten
function showGameOverMessage() {
    let message;
    
    if (score <= highScore) {
        message = new PIXI.Text("Game Over! \n" + emoji, {
            fontFamily: "Arial",
            fontSize: 72,
            fill: 0xff0000,
            align: "center",
        });

        //funktioniert leider nocht nicht, soll dann aber bei einem neuem highScore die nachricht ersetzen
        // vllt hier liebr einen class toggeln die den css dann beinhaltet

  /*  } else {
        message = new PIXI.Text("New ", + highScoreText, {
            fontFamily: "Arial",
            fontSize: 72,
            fill: 0xff0000,
            align: "center",
            
        });
        */
    }
    message.x = app.view.width / 2 - message.width / 2;
    message.y = app.view.height / 2 - message.height / 2;
    app.stage.addChild(message);
}
  
// Spieleintervall für ufo2

gameInterval(function() {
    const ufo2 = PIXI.Sprite.from('assets/ufo2.png');
    ufo2.x = random(0, 1275);
    ufo2.y= -25;
    ufo2.scale.x = 0.1;
    ufo2.scale.y = 0.1;
    app.stage.addChild(ufo2);
    flyDown(ufo2, 2);

    enemyList.push(ufo2)
    immortalList.push(enemyList)

    waitForCollision(ufo2, rocket).then(function(){
        app.stage.removeChild(rocket);
        stopGame();
        showGameOverMessage();
    });
}, 2000);

// Spieleintervall Stern
gameInterval(function() {
    const star = PIXI.Sprite.from('assets/Stern.png');
    star.x = random(0, 1275);
    star.y= -25;
    star.scale.x = 0.1;
    star.scale.y = 0.1;
    app.stage.addChild(star);
    flyDown(star, 2);

    starList.push(star)
    immortalList.push(starList)

    waitForCollision(star, rocket).then(function(){
        app.stage.removeChild(star);

        score += 10;
        scoreText.text = 'Score: ' + score;
    });
}, 5000);

// Spieleintrvall Ufo1
gameInterval(function() {
    const ufo1 = PIXI.Sprite.from('assets/ufo1.png');
    ufo1.x = random(0, 1275);
    ufo1.y= -25;
    ufo1.scale.x = 0.1;
    ufo1.scale.y = 0.1;
    app.stage.addChild(ufo1);
    flyDown(ufo1, 1);

    ufoList.push(ufo1)

    waitForCollision(ufo1, rocket).then(function(){
        app.stage.removeChild(rocket);
        stopGame();
        showGameOverMessage();
    });
}, 1000);

// Steuerung
function leftKeyPressed(){
    if (rocket.x > 0){
        rocket.x = rocket.x - 5;
    }
}
function rightKeyPressed(){
    const maxX = app.view.width - rocket.width;
    if (rocket.x < maxX){
        rocket.x = rocket.x + 5;
    }
    
}

function spaceKeyPressed() {
    const bullet = PIXI.Sprite.from('assets/Laser.jpg');
    bullet.x = rocket.x + 15;
    bullet.y = rocket.y;
    bullet.scale.x = 0.05;
    bullet.scale.y = 0.1;
    flyUp(bullet);
    app.stage.addChild(bullet);

    waitForCollision(bullet, ufoList).then(function([bullet, ufo1]) {
        if (bullet && ufo1) {
        app.stage.removeChild(bullet); 
        app.stage.removeChild(ufo1);

        score += 1;
        scoreText.text = 'Score: ' + score;
    }
    
    if (score > highScore) {
        highScore = score;
        highScoreText.text = "Highscore: " + score ;
    }

    localStorage.setItem('highScore', score.toString())
    }) ;

   waitForCollision(bullet, starList).then(function([bullet, star]) {
    if (bullet && star) {
    app.stage.removeChild(bullet)
    }
   });
   waitForCollision(bullet, enemyList).then(function([bullet, ufo2]) {
    if (bullet && ufo2) {
    app.stage.removeChild(bullet)
    }
   });
}
