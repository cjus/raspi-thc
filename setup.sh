#!/usr/bin/sh
sudo apt-get install python-blinkt
npm install
sudo sed -i -e 's/^exit 0/cd \/home\/pi\/raspi-thc\nsudo \/usr\/local\/bin\/node raspi-thc \& \nexit 0/g' /etc/rc.local
