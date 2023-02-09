from flask_wtf import FlaskForm
from flask_wtf.recaptcha import validators
from wtforms import StringField, SubmitField, PasswordField, SelectField
from wtforms.validators import DataRequired, Length

class BoxRegistration(FlaskForm):
    item_name = StringField('Navn', validators=[DataRequired(), Length(min=1, max=15)])
    box_nr = StringField('fe2', validators=[DataRequired(), Length(min=1, max=4)])
    # category = SelectField()

    submit = SubmitField('Legg til i katalog')
    order_empty = SubmitField('Bestill tom boks')

class Login(FlaskForm):
    username = StringField('Brukernavn', validators=[DataRequired()])
    submit = SubmitField('Logg inn')

class AdminLogin(FlaskForm):
    username = StringField('Brukernavn', validators=[DataRequired()])
    password = PasswordField('Passord', validators=[DataRequired()])
    submit = SubmitField('Logg inn')
