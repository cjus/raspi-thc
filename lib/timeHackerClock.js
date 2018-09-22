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
    let getGreenToRed = (percent) => {
      let r = percent<50 ? 255 : Math.floor(255-(percent*2-100)*255/100);
      let g = percent>50 ? 255 : Math.floor((percent*2)*255/100);
      let b = 0;
      return {r, g, b};
    };

    // let h = Math.floor((100 - value) * 120 / 100);
    // let s = Math.abs(value - 50) / 50;
    // let {r, g, b} = colorHeat.HSVtoRGB(h, s, value);

    let {r, g, b} = getGreenToRed(value);
    this.test(1, r, g, b);
  }
}

module.exports = new TimeHackerClock();
