from .db import db

class Comment(db.Model):
  __tablename__ = 'comments'

  id = db.Column(db.Integer, primary_key = True)
  poster_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False )
  instrument_id = db.Column(db.Integer, db.ForeignKey("instruments.id"), nullable=False)
  comment = db.Column(db.Text, nullable=False)

  poster = db.relationship("User", back_populates="comments")

  instrument = db.relationship("Instrument", back_populates="comments")
