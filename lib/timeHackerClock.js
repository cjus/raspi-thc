const XProcess = require('xprocess');
let xProcess = XProcess.createClient();

class TimeHackerClock {

  setLEDBar(brightness, r, g, b) {
    xProcess.run('/usr/bin/python', `../controller.py ${brightness} ${r} ${g} ${b}`);
    xProcess.on('exit', () => {
    });
  }

  heat(percent) {
    let r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
    let g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);
    let b = 0;
    let brightness = (percent < 10) ? percent : 9;
    this.setLEDBar(brightness, r, g, b);
  }
}

module.exports = new TimeHackerClock();
