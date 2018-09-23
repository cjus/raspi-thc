# raspi-thc
Raspberry Pi Zero W - Time Hacker Clock

The Time Hacker Clock is a device based on teh Time Hacker Method.

## Setup

### Hardware Setup

This version of the Timer Hacker Clock requires a [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) (WiFi) computer and a [Pimoroni Blinkt light strip component](https://shop.pimoroni.com/products/blinkt). Both the Raspberry Pi and the Blinkt are available in the US from Amazon and [Adafruit](https://www.adafruit.com/product/3195).

### Other

* Case: http://a.co/d/hf4pVjN
* Wall Heat Shrink Tubing: http://a.co/d/dQBUwDg

### Software Setup

Setup the Raspberry Pi Zero W using [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/).  Make sure to configure your current locale using raspi-config and enable WiFi settings.

This THC also requires NodeJS.  For the Pi Zero W you'll need a version of Node for the ARMv6 processor. Check the [NodeJS distribution site](https://nodejs.org/en/download/) for a link to the latest verion in the Linux Binaries (ARM) section. Right click on the ARMv6 link to grab its URL. Then use a script similar to the one below on the Pi Zero.

```shell
$ wget https://nodejs.org/dist/v6.9.1/node-v6.9.1-linux-armv6l.tar.xz
$ mkdir nodejs
$ cd nodejs/
$ mv ../node-v6.9.1-linux-armv6l.tar.xz .
$ tar -xvf node-v6.9.1-linux-armv6l.tar.xz
$ cd node-v6.9.1-linux-armv6l/
$ sudo cp ./bin/* /usr/local/bin
```

With NodeJS installed you can pull this repo onto the Pi using:

```shell
$ git clone https://github.com/pnxtech/raspi-thc.git
$ cd raspi-thc
```

Then run the setup script:

```shell
$ ./setup.sh
```
