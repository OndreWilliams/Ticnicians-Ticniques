from flask import Blueprint, request, Response
from app.models import Comment, db
from app.forms import CommentForm
from flask_login import current_user

comment_routes = Blueprint("comments", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@comment_routes.route('/all')
def get_comment_list():
    comments = Comment.query.all()
    return {"comments": [comment.to_dict() for comment in comments] }

@comment_routes.route('', methods=['POST'])
def create_comment():
  form = CommentForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if current_user.is_authenticated:
        userId = current_user.to_dict()
        print(userId)
        form['poster_id'].data = userId['id']
        if form.validate_on_submit():
            comment = Comment(
              poster_id=form.data['poster_id'],
              instrument_id=form.data['instrument_id'],
              comment=form.data['comment']
            )
            db.session.add(comment)
            db.session.commit()
            return comment.to_dict()
        print({'errors': validation_errors_to_error_messages(form.errors)})
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  return {'errors': ['Unauthorized']}

@comment_routes.route('/<id>', methods=['DELETE'])
def deleteComment(id):
  if current_user.is_authenticated:
      comment = Comment.query.get(id)
      comment_creator = str(comment.poster_id)
      if current_user.get_id() == comment_creator:
          db.session.delete(comment)
          db.session.commit()
          return comment.to_dict()
      return Response("User is not authorized to delete this comment", 401)
  return Response("You must be logged in", 401)

@comment_routes.route('/<id>', methods=['PUT'])
def modify_comment(id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.is_authenticated:

        comment = Comment.query.get(id)
        comment_creator = str(comment.poster_id)
        form['poster_id'].data = comment_creator
        if current_user.get_id() == comment_creator:
            if form.validate_on_submit():
                comment.instrument_id = form.data['instrument_id']
                comment.comment = form.data['comment']
                db.session.add(comment)
                db.session.commit()
                return comment.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {'errors': ['Unauthorized']}, 403
    return Response("You must be logged in", 401)
