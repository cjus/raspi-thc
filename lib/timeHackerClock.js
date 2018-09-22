const XProcess = require('xprocess');
let xProcess = XProcess.createClient();

class TimeHackerClock {
  /**
   * @name constructor
   * @description class constructor
   */
  constructor() {
    this.lastPercentRemaining = -1;
    this.timer = 0;
  }

  /**
   * @name init
   * @description initialize clock
   * @param {number} start - start hour
   * @param {number} end - end hour
   * @return {undefined}
   */
  init(start, end) {
    this.startHour = start;
    this.endHour = end;
    if (this.timer) {
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.updateDisplay();
    }, 1000);
  }

  /**
   * @name updateDisplay
   * @description update the LED display based on elapsed time
   * return {undefined}
   */
  updateDisplay() {
    const percentFactor = 80;
    let today = new Date();
    let curTime = today.getTime();
    let endTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.endHour, 0, 0).getTime();
    let startTime = new Date(today.getFullYear(), today.getMonth(), today.getDate(), this.startHour, 0, 0).getTime();
    if (curTime < startTime || curTime > endTime) {
      return;
    }
    let range = endTime - startTime;
    let distance = (endTime - curTime);
    let percentRemaining = ((distance / range) * percentFactor) | 0;
    console.log('percentRemaining ' +  ((distance / range) * percentFactor) + ' | ' + (today.getHours() - 12) + ':' + today.getMinutes() + ':' + today.getSeconds());

    if (percentRemaining === this.lastPercentRemaining) {
      return;
    }

    this.lastPercentRemaining = percentRemaining;
    this.heat(percentRemaining);
  }

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
    // xProcess.on('exit', () => {
    // });
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
    let brightness = (percent < 10) ? percent : 9;
    this.setLEDBar(brightness, r, g, 0);
  }
}

module.exports = new TimeHackerClock();
