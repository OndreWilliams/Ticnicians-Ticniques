from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

subscriptions = db.Table(
    "subscriptions",
    db.Column("follower_id", db.Integer, db.ForeignKey("users.id")),
    db.Column("followed_id", db.Integer, db.ForeignKey("users.id"))
)


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)

  tradeplans = db.relationship("Tradeplan", back_populates="creator")

  followers = db.relationship(
        "User",
        secondary="subscriptions",
        primaryjoin=(subscriptions.c.follower_id == id),
        secondaryjoin=(subscriptions.c.followed_id == id),
        backref=db.backref("follows", lazy="dynamic"),
        lazy="dynamic"
  )

  comments = db.relationship("Comment", back_populates="poster")

  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "tradeplans": self.tradeplans,
      "starred": self.starred_tradeplans,
      "follows": self.follows
    }
