
let mic;
let micOn = false;

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
}

function keyPressed() {
  if (key === " ") {
    background(240);
  }
}

async function enableMic() {
  try {
    await userStartAudio();
    mic = new p5.AudioIn();
    await mic.start();
    micOn = true;
  } catch (error) {
    console.log("Microphone unavailable");
  }
}
