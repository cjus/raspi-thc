const XProcess = require('xprocess');
let xProcess = XProcess.createClient();

class TimeHackerClock {

  test(brightness, r, g, b) {
    xProcess.run('/usr/bin/python', `../controller.py ${brightness} ${r} ${g} ${b}`);
    xProcess.on('exit', () => {
    });
  }
}

module.exports = new TimeHackerClock();
