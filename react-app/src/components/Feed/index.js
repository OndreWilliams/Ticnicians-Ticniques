import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { deleteTradeplan } from "../../store/tradeplan";
import { getSelf } from "../../store/session";
import "./Feed.css";

const Feed = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const userTradeplans = user.tradeplans;
  const [displayTradeplans, setDisplayTradeplans] = useState(userTradeplans);
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
  }, [dispatch])

  useEffect(() => {
    setDisplayTradeplans(userTradeplans
      .sort(compare)
    );
  }, [dispatch])

  if (!user) {
    return <Redirect to="/login" />;
  }

  const onViewEditTP = (id) => {
    history.push(`/tradeplans/${id}`)
  };

  const onDeleteTP = async (id) => {
    await dispatch(deleteTradeplan(id));
    await dispatch(getSelf());
    setDisplayTradeplans(displayTradeplans.filter(tradeplan => tradeplan.id !== id));
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
                  <button onClick={() => onDeleteTP(tradeplan.id)} className="tradeplan__button tradeplan__delete">Delete

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
