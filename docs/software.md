# Install Software

With your Raspberry Pi configured you can proceed to install the required software.

This THC uses NodeJS to host a small web API server. For the Pi Zero W you'll need a version of NodeJS for the ARMv6 processor. Check the [NodeJS distribution site](https://nodejs.org/en/download/) for a link to the latest version in the Linux Binaries (ARM) section. Right click on the ARMv6 link to grab its URL. Then use a script similar to the one below on the Pi Zero.


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

With NodeJS installed you can download a release of the raspi-thc:

```shell
$ wget https://github.com/pnxtech/raspi-thc/archive/v0.2.0.zip -O raspi-thc.zip; unzip raspi-thc.zip; rm raspi-thc.zip
```

Then run the setup script:

```shell
$ chmod u+x setup.sh
$ ./setup.sh
```

---

[Return to main](../README.md) | [Build](../docs/assembly.md) | [Setup Pi W](../docs/pi-setup.md) | [Install software](../docs/software.md) | [Controlling the clock](../docs/controlling.md)
