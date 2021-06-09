from flask import Blueprint, request, Response
from app.models import Tradeplan, db
from app.forms import TradeplanForm
from flask_login import current_user

tradeplan_routes = Blueprint("tradeplan", __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f"{field} : {error}")
    return errorMessages

@tradeplan_routes.route('/all')
def get_tradeplan_list():
    tradeplans = Tradeplan.query.all()
    return {"tradeplans": [tradeplan.to_dict() for tradeplan in tradeplans] }

@tradeplan_routes.route('', methods=['POST'])
def create_tradeplan():
  form = TradeplanForm()
  form['csrf_token'].data = request.cookies['csrf_token']
  if current_user.is_authenticated:
        userId = current_user.to_dict()
        print(userId)
        form['creator_id'].data = userId['id']
        if form.validate_on_submit():
            tradeplan = Tradeplan(
              creator_id=form.data['creator_id'],
              instrument_id=form.data['instrument_id'],
              title=form.data['title'],
              description=form.data['description'],
              image=form.data['image'],
              public=form.data['public']
            )
            db.session.add(tradeplan)
            db.session.commit()
            return tradeplan.to_dict()
        print({'errors': validation_errors_to_error_messages(form.errors)})
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  return {'errors': ['Unauthorized']}

@tradeplan_routes.route('/<id>', methods=['DELETE'])
def deleteTradeplan(id):
  if current_user.is_authenticated:
      tradeplan = Tradeplan.query.get(id)
      tradeplan_creator = str(tradeplan.creator_id)
      if current_user.get_id() == tradeplan_creator:
          db.session.delete(tradeplan)
          db.session.commit()
          return tradeplan.to_dict()
      return Response("User is not authorized to delete this tradeplan", 401)
  return Response("You must be logged in", 401)

@tradeplan_routes.route('/<id>', methods=['PUT'])
def modify_tradeplan(id):
    form = TradeplanForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if current_user.is_authenticated:
        tradeplan = Tradeplan.query.get(id)
        tradeplan_creator = str(tradeplan.creator_id)
        if current_user.get_id() == tradeplan_creator:
            if form.validate_on_submit():
                tradeplan.instrument_id = form.data['instrument_id']
                tradeplan.title = form.data['title']
                tradeplan.description = form.data['description']
                tradeplan.image = form.data['image']
                tradeplan.public = form.data['public']
                db.session.add(tradeplan)
                db.session.commit()
                return tradeplan.to_dict()
            return {'errors': validation_errors_to_error_messages(form.errors)}, 401
        return {'errors': ['Unauthorized']}, 403
    return Response("You must be logged in", 401)
