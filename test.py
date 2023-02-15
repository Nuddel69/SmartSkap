import serial
import time
from datetime import datetime

def command(ser, command):
  start_time = datetime.now()
  ser.write(str.encode(command)) 
  time.sleep(1)

  while True:
    line = ser.readline()
    print(line)

    if line == b'ok\n':
      break

ser = serial.Serial('/dev/ttyACM0', 9600)
time.sleep(2)

# Move
command(ser, "G0 F10000 X70 \r\n") # rapid motion but does not extrude material
command(ser, "G0 F10000 X350 \r\n") # rapid motion but does not extrude material ender 5 plus is 350 x 350
#command(ser, "G1 F20000 Z0.564\r\n") # change layer
command(ser, "G0 F10000 X350 \r\n") # rapid motion but does not extrude material ender 5 plus is 350 x 350

time.sleep(2)
ser.close()
