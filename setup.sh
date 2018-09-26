#!/usr/bin/sh
sudo apt-get install python-blinkt
npm install
sudo sed -i -e 's/^exit 0/\nexit 0/g' /etc/rc.local
/usr/local/bin/node /home/pi/raspi-thc/raspi-thc