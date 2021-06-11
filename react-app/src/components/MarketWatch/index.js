import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { useDispatch, useSelector } from "react-redux";
import { createNewComment, getAllComments } from "../../store/comments";
import "./MarketWatch.css";

const MarketWatch = () => {
  const [errors, setErrors] = useState([]);
  const [comment, setComment] = useState("");
  const instrumentId = 1;
  const dollarBase = ["USDJPY", "USDCAD","EURUSD", "GBPUSD", "AUDUSD", "NZDUSD"];

  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comments.list);

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch])

  const onSubmitComment = async (e) => {
    e.preventDefault();
    const data = await dispatch(createNewComment(comment, instrumentId));
    document.querySelector(".comment__form--textarea").value = "";
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  return (
    <div className="market-watch">
      <div className="market-watch__cntnr">
        <div className="market-watch__charts">
        <div className="dollar-base">
          {dollarBase.map((symbol) => {
            return (
              <div className="marketwatch__chart">
                <TradingViewWidget
                  symbol={symbol}
                  interval="1"
                  theme={Themes.DARK}
                  save_image={false}
                  hide_legend={true}
                  hide_side_toolbar={true}
                  allow_symbol_change={true}
                  width={450}
                  height={350}
                  symbol_name_label={true}
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="market-watch__chat">
          <div className="market-watch__chat--title">
            Word on the Street
          </div>
          <div className="market-watch__comments">
          {comments && comments.map((comment) => {
            return (
              <div className="comment-card"> {comment.comment}
                {user.id === comment.poster_id && [user.id].map((userId) => {
                  return (
                    <div className="comment__buttons">
                      <button className="edit-comment"> Edit

                      </button>
                      <button className="delete-comment"> Delete

                      </button>
                    </div>
                  )
                })}
              </div>
            )
          })}
          </div>
          <div className="comment-form__cntnr">
            <form onSubmit={onSubmitComment} method="POST" className="comment__form">
              <div className="market-watch__formField">
                <textarea
                  className="comment__form--textarea"
                  name="comment"
                  placeholder="Enter a comment..."
                  value={comment}
                  onChange={updateComment}
                  cols="30"
                  rows="4"
                >
                </textarea>
                <div className="comment-form__buttons">
                  <button
                    type="submit"
                    className="comment-form__submit"
                  >
                    Post
                  </button>
                </div>

            </div>
            </form>
          </div>
      </div>
      </div>

    </div>
  );
};

export default MarketWatch;
