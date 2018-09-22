const XProcess = require('xprocess');
let xProcess = XProcess.createClient();
let colorHeat = require('./colorHeat');

class TimeHackerClock {

  test(brightness, r, g, b) {
    xProcess.run('/usr/bin/python', `../controller.py ${brightness} ${r} ${g} ${b}`);
    xProcess.on('exit', () => {
    });
  }

  heat(value) {
    let h = Math.floor((100 - value) * 120 / 100);
    // let s = Math.abs(value - 50) / 50;
    let {r, g, b} = colorHeat.HSVtoRGB(h, 50, 50);
    this.test(1, r, g, b);
  }
}

module.exports = new TimeHackerClock();
