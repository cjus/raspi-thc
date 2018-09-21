#!/usr/bin/env python
import sys
from blinkt import set_all, set_clear_on_exit, set_brightness, show

l, r, g, b = [int(x) for x in sys.argv[1:]]
set_clear_on_exit(False)
set_brightness(l / 10.0)
set_all(r, g, b)

show()
