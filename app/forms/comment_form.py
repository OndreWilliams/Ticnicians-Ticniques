from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired

class CommentForm(FlaskForm):
  poster_id = IntegerField('poster_id', validators=[DataRequired()])
  instrument_id = IntegerField('instrument_id', validators=[DataRequired()])
  comment = StringField('comment', validators=[DataRequired()])
