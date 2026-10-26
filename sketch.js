
let mic;
let micOn = false;
let particles = [];

function setup() {
  let c = createCanvas(600, 400);
  c.parent("canvas");
  background(240);
}

function draw() {
  if (mouseIsPressed) {
    let size = 5;

    if (micOn) {
      size += mic.getLevel() * 100;
    }

    // Simple brush
    stroke(40, 160, 150, 180);
    strokeWeight(size);
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  // Draw and update explosion particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];

    p.x += p.vx;
    p.y += p.vy;
    p.life -= 4;

    noStroke();
    fill(40, 160, 150, p.life);
    circle(p.x, p.y, p.size);

    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
}

// Create a burst when you click
function mousePressed() {
  for (let i = 0; i < 45; i++) {
    particles.push({
      x: mouseX,
      y: mouseY,
      vx: random(-10, 10),
      vy: random(-10, 10),
      size: random(7, 12),
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
