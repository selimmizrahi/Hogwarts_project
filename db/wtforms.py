from wtforms import Form, validators, StringField, SubmitField, SelectField, SelectMultipleField
from wtforms.validators import DataRequired, Length, InputRequired, email, email_validator
from flask_wtf import FlaskForm

magic_skills = ['Animagi', 'Metamorphmagi', 'Parseltongue', 'Seers' , 'Legilimency and Occlumency', 'Apparition and Disapparition', 'Teleportation', 'Veela', 'Magical Resistence']


all_courses = ['Transfiguration',
               'Defence Against the Dark Arts',
               'Charms', 'Potion', 'Astronomy',
               'History of Magic', 'Herbology',
               'Arithmancy', 'Study of Ancient Runes',
               'Divination', 'Care of Magical Creatures',
               'Muggle Studies', 'Alchemy', 'Flying',
               'Apparition']


class RegistrationForm(FlaskForm):
    first_name = StringField('First Name', validators=[
        Length(min=2, message="Must be more than 2 characters"), DataRequired(), InputRequired(message="First name is ""required!")])
    last_name = StringField('Last Name', validators=[
        validators.Length(min=2,message="Must be more than 2 characters"), DataRequired(), InputRequired(message="Last name is required!")])
    # email_address = StringField('Valid Email', validators=[
    #     Length(min=2, message="Must be more than 2 characters"), DataRequired(), email_validator()])                                                                                     "required!")])
    # password = StringField('Password', validators=[
    #     Length(min=2, message="Must be more than 2 characters"), DataRequired(), InputRequired(message="Password is")])
    existing_skills = SelectMultipleField('Existing Skills', choices=magic_skills)
    desired_skills = SelectField('Desired Skills', choices=magic_skills)
    courses = SelectField('Courses', choices=all_courses)
    submit = SubmitField('Submit')