from flask_wtf import FlaskForm
from flask_wtf.recaptcha import validators
from wtforms import StringField, SubmitField, PasswordField, SelectField
from wtforms.validators import DataRequired, Length

class BoxRegistration(FlaskForm):
    item_name = StringField('Navn', validators=[DataRequired(), Length(min=1, max=15)], render_kw={"placeholder": "Navn"})
    box_nr = StringField('Eskenr.', validators=[DataRequired(), Length(min=1, max=4)], render_kw={"placeholder": "fe2"})
    category = SelectField('Kategori', choices=['Komponenter', 'Skruer', 'Bolter og muttere', 'Annet'], validators=[DataRequired()])

    submit = SubmitField('<i class="fa-solid fa-circle-plus"></i>Legg til i katalog')
    order_empty = SubmitField('Bestill tom boks')

class Login(FlaskForm):
    username = StringField('Brukernavn', validators=[DataRequired()])
    submit = SubmitField('Logg inn')

class AdminLogin(FlaskForm):
    username = StringField('Brukernavn', validators=[DataRequired()])
    password = PasswordField('Passord', validators=[DataRequired()])
    submit = SubmitField('Logg inn')
