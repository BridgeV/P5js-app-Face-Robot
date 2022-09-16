var mic;
var noise = 0.1;
//var audio ;

freq = 0.0001;
amplitude = 300;
var paupieresPos = -300; //de -300 -540 -740
var step = 10;
var eyesOpen = true;
var t = Date.now();

var décrément = false;
let colorFace ;
let colorBG;
var c ;

function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}

//  SETUP TRES IMPORTANT POUR INITIALISER LES TRUCS

function setup() {
  //audio  = getAudioContext().suspend();
  createCanvas(1920, 1080);
  mic = new p5.AudioIn();
  mic.start();

  slider = createSlider(0,440, 440);
  slider.position(100, 540);
  slider.style('width', '100px');

  colorFace = createColorPicker('#ed225d');
  colorFace.position(30, height/2);

  colorBG = createColorPicker("Black");
  colorBG.position(30,height/2-30);
}

function drawEyes() {
  //   var eyessize = amplitude * Math.sin(t * freq * Math.PI * 2);
  //   console.log(" eyesize = " + eyessize);

  //   if (eyessize > 100 && eyessize < amplitude) {
  //     ellipse(550, 540, 200, eyessize);
  //     ellipse(1350, 540, 200, eyessize);
  //   }
  //   else
  //   {
  //     ellipse(550, 540, 200, amplitude);
  //     ellipse(1350, 540, 200, amplitude);
  //   }

  // Draw L eyes

  c = colorFace.color();

  
  fill(c);
  noStroke();
  ellipse(550, 540, 200, amplitude);

  // Draw R eyes

  fill(c);
  noStroke();
  ellipse(1350, 540, 200, amplitude);
}
function drawRightEye() {
  ellipse(550, 540, 200, amplitude * Math.sin(t * freq * Math.PI * 2));
}

function drawLeftEye() {
  ellipse(1350, 540, 200, amplitude * Math.sin(t * freq * Math.PI * 2));
}
function drawMouth(sound) {
  fill(c);
  noStroke();
  ellipse(960, 840, 400, sound * 400);
}
function drawpaupierres() {
  // Draw paupieres

  fill(colorBG.color());
  noStroke();
  rect(0, paupieresPos, 1920, 1080);
}

function updatePaupierre() 
{
  if (paupieresPos > -300) {
    eyesOpen = false;
  }
  if (paupieresPos < -740) {
    eyesOpen = true;

  }
}





function draw() {
    

    let val = slider.value();
    console.log("Slider = "+val);
    paupieresPos = -300- val;
    console.log(paupieresPos);


// Dessinner le fond 
  background(colorBG.color());

// Recupère les entrées micro ;
  var vol = mic.getLevel();
// Dessin des yeux 
  drawEyes();

// Dessin de la bande de paupierres
  drawpaupierres();
// Verifie si la position de la pauière correcpont a des yeux ouvert ou fermer 
//updatePaupierre();

// Dessin de la bouche ;
  drawMouth(vol);

// le temps
  t = Date.now();

  

  // console.log("t est égale = "+t);
  // t += 0.01;
  // if(t>1)
  // {
  //     t= 0;
  // }

  //console.log(vol);
}

//   function mousePressed() {

//     audio = new AudioContext({
//         latencyHint: "interactive",
//         sampleRate: 44100,
//       });

//     mic.start();
//     userStartAudio();
//   }
