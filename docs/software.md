## Software setup

With your Raspberry Pi configured you can proceed to install the required software.

First, install the Pimoroni Blinkt light strip drivers.

```shell
$ sudo apt-get install python-blinkt
```

This THC also uses NodeJS to host a small web API server. For the Pi Zero W you'll need a version of NodeJS for the ARMv6 processor. Check the [NodeJS distribution site](https://nodejs.org/en/download/) for a link to the latest version in the Linux Binaries (ARM) section. Right click on the ARMv6 link to grab its URL. Then use a script similar to the one below on the Pi Zero.


```shell
$ mkdir nodejs
$ cd nodejs
$ wget https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-armv6l.tar.xz
$ tar -xvf node-v8.12.0-linux-armv6l.tar.xz
$ cd node-v8.12.0-linux-armv6l/
$ sudo cp ./bin/* /usr/local/bin
$ cd ~
```

You can test the NodeJS install by:

```shell
$ node --version
v8.12.0
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

---

[Return to main](../README.md)
