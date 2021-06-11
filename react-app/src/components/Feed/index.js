import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { deleteTradeplan } from "../../store/tradeplan";
import { removeUserTP } from "../../store/session";
import { getSelf } from "../../store/session";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userTradeplans = useSelector(state => state.session.user.tradeplans);
  const [displayTradeplans, setDisplayTradeplans] = useState(userTradeplans);
  const [isDeleting, setIsDeleting] = useState(false);
  const history = useHistory();

  const compare = (a, b) => {
    const idA = a.id;
    const idB = b.id;

    if (idA < idB) {
      return 1;
    } else {
      return -1;
    }
  }
  useEffect(() => {

    dispatch(getSelf());
  }, [dispatch, isDeleting])

  useEffect(() => {
    setDisplayTradeplans(userTradeplans
      .sort(compare)
    );
  }, [dispatch, user])

  if (!user) {
    return <Redirect to="/login" />;
  }

  const onViewEditTP = (id) => {
    history.push(`/tradeplans/${id}`)
  };

  const onDeleteTP =  (id) => {
    setIsDeleting(!isDeleting);
    dispatch(deleteTradeplan(id));
    dispatch(removeUserTP(id));
    dispatch(getSelf());
  };

  return (
    <div className="feed__container">
      <div className="feed__tradeplans">
        {displayTradeplans && displayTradeplans.map((tradeplan) => {
          // return JSON.stringify(tradeplan)
          return (
            <div className="feed__tradeplan-container">
              <div className="tradeplan__title">{tradeplan.title}</div>
              <div className="tradeplan__chart-buttons-cntnr">
                <img src={tradeplan.image} alt="tradeplan chart" className="feed__img" />
                <div className="tradeplan__buttons-cntnr">
                  <button onClick={() => onViewEditTP(tradeplan.id)} className="tradeplan__button tradeplan__view">View/Edit

                  </button>
                  <button onClick={(e) => onDeleteTP(tradeplan.id)} className="tradeplan__button tradeplan__delete">Delete

                  </button>
                </div>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Feed;
