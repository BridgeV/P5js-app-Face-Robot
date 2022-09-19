// Actuellement le programme fonctionne tres bien avec le navigateur Chrome ! 
// Il faudrait créer des élement pour chaque élément du visage 

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

let speech;

function getTimestampInSeconds() {
  return Math.floor(Date.now() / 1000);
}

//  SETUP TRES IMPORTANT POUR INITIALISER LES TRUCS

function setup() {

  speech = new p5.Speech();
  

  

  

  
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

function voiceReady() 
  {
    // console.log(speech.voices);
    
  }

function mousePressed() 
  {
    console.log(" Mouse get pressed !");
    say("click !")
  }

  function say(text) 
  {
    speech.speak(text);
    
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
  // ENABLE GLOW EFFECT
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = colorFace.color();

  
  fill(c);
  noStroke();
  ellipse(550, 540, 200, amplitude);

  // Draw R eyes

  fill(c);
  noStroke();
  ellipse(1350, 540, 200, amplitude);
  // DISABLE GLOW EFFECT 
  drawingContext.shadowBlur = 0;
  drawingContext.shadowColor = colorFace.color();
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
  // ENABLE GLOW
  drawingContext.shadowBlur = 32;
  drawingContext.shadowColor = colorFace.color();
  ellipse(960, 840, 400, sound * 400);
  // DISABLE GLOW
  drawingContext.shadowBlur = 0;
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


// Exemple d 'élement 
let elementD = {x:0,y:0,width:100,height:100,color:{r:255,g:255,b:255}};
// Function pour dessiner cette élements 
function elementtoDraw(elementdraw) 
{
  fill(elementD.color.r,elementD.color.g,elementD.color.b);
  rect(elementdraw.x,elementdraw.y,elementdraw.width,elementdraw.height);
  
}

function draw() {
    

    let val = slider.value();
    // console.log("Slider = "+val);
    paupieresPos = -300- val;
    // console.log(paupieresPos);
  

    




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
// Exemple de génaration d'un élement 
// ! Attention ! a l'ordre de création car chaque élément se superpose l'un sur l'autre 
  elementtoDraw(elementD)
  elementD.x += 0.1;


  

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
