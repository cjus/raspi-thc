# raspi-thc
Raspberry Pi Zero W - Time Hacker Clock

The Time Hacker Clock is a device based on the Time Hacker Method.


## Photos

<a href="./images/20180923_112252-01.jpeg" width=20></a>

![](./images/20180923_112252-01.jpeg)
![](./images/20180923_112941-01.jpeg)

## Setup

### Hardware

This version of the Timer Hacker Clock requires a [Raspberry Pi Zero W](https://www.raspberrypi.org/products/raspberry-pi-zero-w/) (WiFi) computer and a [Pimoroni Blinkt light strip component](https://shop.pimoroni.com/products/blinkt). Both the Raspberry Pi and the Blinkt are available in the US from Amazon and [Adafruit](https://www.adafruit.com/product/3195).

### Assembly

I found a Pi Zero case from iUniker which proved ideal given its GPIO opening on the top of the case.

![](./images/20180923_112215-01.jpeg)

That allowed the Blinkt light strip to sit nicely on top of the case.  To make this work though, I had to use a combination of double row female pin header and a double row header strip.

![](./images/20180923_125542-01.jpeg)

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
