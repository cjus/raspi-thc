# Controlling the clock

The clock can be controlled using a RESTful API via a web browser or curl command line tool.

| Route | Description |
| --- | ---
/v1/thc/set/:start/:stop | start hour and stop hour. Time is two digit hour on a 24 hour clock.
| /v1/thc/ver | return clock version

```
Via browser: http://{deviceIP}/v1/thc/ver
Via curl: $ curl -XGET {deviceIP}/v1/thc/ver
```

---

[Return to main](../README.md) | [Build](../docs/assembly.md) | [Setup Pi W](../docs/pi-setup.md) | [Install software](../docs/software.md) | [Controlling the clock](../docs/controlling.md)
