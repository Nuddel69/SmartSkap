import json
from flask import request
from flask import Flask, render_template
import serial
import mysql.connector
import time
from datetime import datetime
import math

app = Flask(__name__)

posX: float = 0.0
posY: float = 0.0

def command(ser, command):
  start_time = datetime.now()
  ser.write(str.encode(command)) 
  time.sleep(1)

  while True:
    line = ser.readline()
    print(line)

    if line == b'ok\n':
      break

# ser = serial.Serial('/dev/ttyACM0', 9600)
time.sleep(2)

# Initialize serial device
# command(ser, "G91\r\n")


def scanBox():
    # Code to scan using camera

    # Return code of box
    return "00F"


def findBox(boxcode):
    
    coordX = 100
    coordY = 100

    # Return coordinates
    return [coordX,coordY]


def getJob():
  # return [(3, 12), (2, 23)]
  
  mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="my_secret_password",
    database="app_db"
  )

  mycursor = mydb.cursor()

  mycursor.execute("SELECT binID, position FROM inventory")

  pos_numbers = mycursor.fetchall()

  pos_index = []
  for element in pos_numbers:
    y = math.ceil(element[1] / 6)
    x = (element[1] - 6*(y-1))

    pos_index.append([x, y])

  return pos_index



def move(distX, distY) -> None:
    global posX
    global posY
    # X direction (width)
    command(ser, f"G0 F10000 Y{distX * 0} \r\n")

    # Y direction (height)
    command(ser, f"G0 F10000 X{distY * 31.847} \r\n")

    posX += distX
    posY += distY

    print(posX)
    print(posY)


#command(ser, "G0 X350 \r\n") # rapid motion but does not extrude material ender 5 plus is 350 x 350
#command(ser, "G1 F20000 Z0.564\r\n") # change layer


positions = getJob()

# move(0, 70)
time.sleep(2)
# ser.close()

@app.route('/')
def index():
    return render_template('website/index.html')

@app.route('/test', methods=['POST'])
def test():
    output = request.get_json()
    print(output) # This is the output that was stored in the JSON within the browser
    print(type(output))
    result = json.loads(output) #this converts the json output to a python dictionary
    print(result) # Printing the new dictionary
    print(type(result))#this shows the json converted as a python dictionary
    return result

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")
