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
              instrument_id=form.data['instrumnent_id'],
              title=form.data['title'],
              description=form.data['description'],
              image=form.data['image'],
              public=form.data['public']
            )
            db.session.add(tradeplan)
            db.session.commit()
            return tradeplan.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
  return {'errors': ['Unauthorized']}
