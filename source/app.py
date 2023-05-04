import json
from flask import request
from flask import Flask, render_template
import serial
'''import mysql.connector'''
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

'''
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
'''


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


'''positions = getJob()'''

# move(0, 70)
time.sleep(2)
# ser.close()

@app.errorhandler(404)
def not_found(e):
  
# defining function
  return render_template("404.html")

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/test', methods=['GET'])
def test():
   return "It works"
   

@app.route('/cart/store', methods=['POST'])
def cart_store():
   output = request.get_json()
   result = json.loads(output)
   print(result)

   return json.dumps({'success':True}), 200, {'ContentType':'application/json'}



@app.route('/cart/get', methods=['POST'])
def cart_get():
   
   # Get username and return cart
   cart = [1, 2]
   
   return json.dumps(json.loads(cart)), 200, {'ContentType':'application/json'}



@app.route('/catalog/get', methods=['POST'])

def products_get():
    # SQL code that generates a catalog like this goes here:
    catalog = [
        {
            "name":"10 Ω Motstander",
            "description":"Motstand, også kalt resistor, er en topolet, passiv elektronisk komponent som brukes for å etablere en resistans (elektrisk motstand) i en elektrisk krets.",
            "category":"Komponenter / Motstander",
            "bin":"EC1",
            "availability": True
        },
        {
            "name":"20 Ω Motstander",
            "description":"Motstand, også kalt resistor, er en topolet, passiv elektronisk komponent som brukes for å etablere en resistans (elektrisk motstand) i en elektrisk krets.",
            "category":"Komponenter / Motstander",
            "bin":"F3A",
            "availability": True
        }
    ]
    

    return json.dumps(json.loads(catalog)), 200, {'ContentType':'application/json'} 


@app.route('/containers/get', methods=['POST'])
def containers_push():
    output = request.get_json()

    result = json.loads(output) #this converts the json output to a python dictionary
    
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 


if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)
