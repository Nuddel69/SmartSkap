from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///messages.db'
db = SQLAlchemy(app)

class Message(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(200))

@app.route('/save-message', methods=['POST'])
def save_message():
	message = request.json['message']
	new_message = Message(content=message)
	db.session.add(new_message)
	db.session.commit()
	return {'status': 'success'}

if __name__ == '__main__':
	app.run(debug=True)