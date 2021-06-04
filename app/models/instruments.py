from .db import db

class Instrument(db.Model):
  __tablename__ = 'instruments'

  id = db.Column(db.Integer, primary_key = True)
  symbol = db.Column(db.String, nullable=False)
  name = db.Column(db.String, nullable=False)

  tradeplans = db.relationship("Tradeplan", back_populates="instrument")

  comments = db.relationship("Comment", back_populates="instrument")
