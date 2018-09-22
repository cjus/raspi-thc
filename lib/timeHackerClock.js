const XProcess = require('xprocess');
let xProcess = XProcess.createClient();

class TimeHackerClock {

  /**
   * @name setLEDBar
   * @description set LED color bar by executing an external controller python script
   * @param {number} brightness - brightness from 9 brightest to 0 off
   * @param {number} r - red value
   * @param {number} g - green value
   * @param {number} b - blue value
   */
  setLEDBar(brightness, r, g, b) {
    xProcess.run('/usr/bin/python', `../controller.py ${brightness} ${r} ${g} ${b}`);
    xProcess.on('exit', () => {
    });
  }

  /**
   * @name heat
   * @description return an RGB heat color from green to red
   * @param {number} percent - 100 to 1 percent
   * @return {undefined}
   */
  heat(percent) {
    let r = percent < 50 ? 255 : Math.floor(255 - (percent * 2 - 100) * 255 / 100);
    let g = percent > 50 ? 255 : Math.floor((percent * 2) * 255 / 100);
    let brightness = (percent < 10) ? percent - 1 : 9;
    this.setLEDBar(brightness, r, g, 0);
  }
}

module.exports = new TimeHackerClock();
