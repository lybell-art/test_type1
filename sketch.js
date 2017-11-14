  // modified from http://www.generative-gestaltung.de by jusub kim

  var textTyped = 'SOGANG';
  var font;
  var c, x;

  function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
    opentype.load('data/FreeSans.otf', function(err, f) {
      if (err) {
        print(err);
      } else {
        font = f;
        loop();
      }
    });
  }

  function draw() {
    if (!font) return;

    background(255);
    noFill();
    stroke(0);
    strokeWeight(2);

    // margin border
    translate(20, 260);

    if (textTyped.length > 0) {
      x=0;
      for (var ti=0; ti<textTyped.length; ti++) {
        var c = textTyped.charAt(ti);
        // get a path from OpenType.js
        var fontPath = font.getPath(c, x, 0, 200);
        x += map(mouseX, 0, width, 10, 200);
        // convert it to a g.Path object
        var path = new g.Path(fontPath.commands);
        // resample it with equidistant points
        path = g.resampleByLength(path, 10);
        var points = path.commands;
      
        var eSz = map(mouseY, 0, height, 1, 50);
        beginShape();
        for (var i = 0; i < points.length; i++) {
          ellipse(points[i].x, points[i].y, eSz, eSz);
        }
        endShape();
      }
    }
  }

  function keyPressed() {
    if (keyCode == DELETE || keyCode == BACKSPACE) {
      if (textTyped.length > 0) {
        textTyped = textTyped.substring(0, textTyped.length - 1);
      }
    }
    if (keyCode >= 32) {
      textTyped += key;
    }
  }
