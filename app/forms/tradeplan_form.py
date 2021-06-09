from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, BooleanField
from wtforms.validators import DataRequired

class TradeplanForm(FlaskForm):
  creator_id = IntegerField('creator_id', validators=[DataRequired()])
  instrument_id = IntegerField('instrument_id', validators=[DataRequired()])
  title = StringField('title', validators=[DataRequired()])
  description = StringField('description', validators=[DataRequired()])
  image = StringField('image', validators=[DataRequired()])
  public = BooleanField('public')
