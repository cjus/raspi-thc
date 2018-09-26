## Raspberry Pi Zero W Setup

Setup the Raspberry Pi Zero W using [Raspbian Lite](https://www.raspberrypi.org/downloads/raspbian/). The version I used was `2018-06-27-raspbian-stretch-lite.img`

The following instructors are Mac OSX centric but not too different for how you'd do this using other operating systems.

**Locate SD card**

On Mac you can do this using diskutil via the command line.  Execute the command below and look for a /dev/disk that matches the size of your SD card.  For me, that’s /dev/disk3

```shell
$ diskutil list
```

**Unmount the SD card**

Next unmount the SD card using the disk number.

```shell
$ diskutil unmountDisk /dev/disk3
```

**Flash the OS image**

Use the `dd` command to flash the Raspbian lite image onto your SD card.  Be careful when doing this!

This is a good time to mention that the `dd` command can be very dangerous if you're not careful using it. Always make sure that you're pointing `dd` to the correct disk drive! You wouldn't want to erase the wrong drive. After all, there's a reason why the command is known as the Disk Destroyer, but that's not what dd stands for. See this bit of [`dd`](https://medium.com/r/?url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FDd_%2528Unix%2529) history if you're interested.

```shell
$ sudo dd bs=1m if=./2018-06-27-raspbian-stretch-lite.img of=/dev/disk3 conv=sync
```

While dd is running you can press ctrl-t on your keyboard to check on the status.  The SD disk flash can take a while based on the speed of your SD card.

It's recommended that you use a Class 6 or Class 10 microSDHC card for performance reasons.

Once the copy completes you can cd onto the card:

```shell
$ cd /Volumes/boot/
```

Create an empty ssh file to tell the OS that you wish to enable SSH access:

```
$ touch ssh
```

Next create a `wpa_supplicant.conf` file with the following, make sure to replace your ssid and psk file.

```
ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=US
network={
    ssid="YOUR-SSID"
    psk="YOUR-PASSWORD"
    scan_ssid=1
}
```

Safely unmount the SD after your changes.

```
$ cd ~
$ diskutil unmountDisk /dev/disk3
```

**Connecting to and configuring your Raspberry Pi**

Next, insert the SD into your Pi Zero and boot the device.

Give that a minute or so to complete then try pinging the device to locate it.

```
$ ping raspberrypi.local
```

Or locate the device using your network router or a Wifi scanner such as [Who's on My Wifi](https://itunes.apple.com/us/app/who-is-on-my-wifi/id909760813?mt=12)

You can ssh into the device using:

```shell
$ ssh pi@raspberrypi.local
or
$ ssh pi@10.10.0.107
```

The default password is `raspberry`.

So once you sign in, the first order of business is to change the password!

```shell
$ passwd
```

The username will still remain `pi` but you'll be able to sign in using your new password.


You can optionally proceed to make other tweaks using the raspi-config utility if you'd like.

```shell
$ sudo raspi-config
```

---

[Return to main](../README.md)
