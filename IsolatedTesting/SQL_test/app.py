import mysql.connector
import json

mydb = mysql.connector.connect(
  host="10.9.37.16",
  user="root",
  password="my_secret_password",
  database="app_db"
)

mycursor = mydb.cursor()

mycursor.execute("SELECT catalog.productID, catalog.name, catalog.description, catalog.category, catalog.subcategory, containers.code, inventory.position FROM containers LEFT JOIN catalog ON containers.productID = catalog.productID LEFT JOIN inventory ON inventory.binID = containers.binID")

myresult = mycursor.fetchall()



for x in myresult:
  print(x)
