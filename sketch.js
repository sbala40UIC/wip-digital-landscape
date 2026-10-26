let mic;
let micOn = false;
let particles = [];


function setup() {
  let c = createCanvas(600, 400);
  c.parent("canvas");
  background(240);
}

function draw() {
  // Draw and update explosion particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life -= 4;

    noStroke();
    fill(p.r, p.g, p.b, p.life);
    circle(p.x, p.y, p.size);

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// Pick a new random color when you start a stroke
function mousePressed() {
  brushColor = color(random(255), random(255), random(255));

  // Create a burst with random colors
  for (let i = 0; i < 70; i++) {
    particles.push({
      x: mouseX,
      y: mouseY,
      vx: random(-5, 5),
      vy: random(-5, 5),
      size: random(3, 8),
      r: random(255),
      g: random(255),
      b: random(255),
      life: 100
    });
  }
}

function keyPressed() {
  if (key === " ") {
    background(240);
    particles = [];
  } 
}

async function enableMic() {
  await userStartAudio();
  mic = new p5.AudioIn();
  await mic.start();
  micOn = true;
}

