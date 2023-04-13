from flask import Flask, render_template, url_for
from forms import BoxRegistration, Login, AdminLogin
app = Flask(__name__)

app.config['SECRET_KEY'] = '2b986944c935d8b8b171c2cde81b3358'

@app.route("/")
@app.route("/home")
def home():
    boxForm = BoxRegistration()
    loginForm = Login()
    return render_template('home.html', title="Home", box=boxForm, login=loginForm)

@app.route("/about")
def about():
    return render_template('about.html', title="About")

@app.route("/login")
def login():
    adminLogin = AdminLogin()
    return render_template('login.html', title='Login', form=adminLogin)

if __name__ == "__main__":
    app.run(debug=True)

