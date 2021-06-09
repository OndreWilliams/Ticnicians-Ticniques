from .db import db

starred = db.Table(
    "starred",
    db.Column(
        "follower_id", db.Integer, db.ForeignKey("users.id"), primary_key=True
    ),
    db.Column(
        "tradeplan_id", db.Integer, db.ForeignKey("tradeplans.id"), primary_key=True
    )
)


class Tradeplan(db.Model):
  __tablename__ = 'tradeplans'

  id = db.Column(db.Integer, primary_key = True)
  creator_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False )
  instrument_id = db.Column(db.Integer, db.ForeignKey("instruments.id"), nullable=False)
  title = db.Column(db.String, nullable=False)
  description = db.Column(db.Text, nullable=False)
  image = db.Column(db.String, nullable=False)
  public = db.Column(db.Boolean, nullable=False)

  creator = db.relationship("User", back_populates="tradeplans")

  instrument = db.relationship("Instrument", back_populates="tradeplans")

  follower = db.relationship("User", backref="starred_tradeplans", secondary="starred")

  def to_dict(self):
    return {
      "id": self.id,
      "creator_id": self.creator_id,
      "instrument_id": self.instrument_id,
      "title": self.title,
      "description": self.description,
      "image": self.image,
      "public": self.public
    }
