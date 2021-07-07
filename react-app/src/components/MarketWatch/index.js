import React, { useState, useEffect } from "react";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from 'react-router-dom';
import { createNewComment, getAllComments, editComment, deleteAComment } from "../../store/comments";
import { getAllTradeplans } from "../../store/tradeplan";
import "./MarketWatch.css";


const MarketWatch = () => {
  const communityTradeplans = useSelector(state => state.tradeplans.list);
  const [errors, setErrors] = useState([]);
  const [comment, setComment] = useState("");
  const [commentEdit, setCommentEdit] = useState("");
  const [editing, setEditing] = useState(false);
  const [displayTradeplans, setDisplayTradeplans] = useState(communityTradeplans);
  const instrumentId = 1;
  const dollarBase = ["USDJPY", "USDCAD","EURUSD", "GBPUSD", "AUDUSD", "NZDUSD"];
  const history = useHistory();
  const dispatch = useDispatch();

  const compare = (a, b) => {
    const idA = a.id;
    const idB = b.id;

    if (idA > idB) {
      return 1;
    } else {
      return -1;
    }
  }

  const user = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comments.list.sort(compare));

  useEffect(() => {
    dispatch(getAllComments());
  }, [dispatch])

  useEffect(() => {
    dispatch(getAllTradeplans());
  }, [dispatch])

  useEffect(() => {
    setDisplayTradeplans(communityTradeplans.filter(tradeplan => tradeplan.public === true));
  }, [dispatch, communityTradeplans])

  const onSubmitComment = async (e) => {
    e.preventDefault();
    const data = await dispatch(createNewComment(comment, instrumentId));
    document.querySelector(".comment__form--textarea").value = "";
    if (data.errors) {
      setErrors(data.errors);
    } else {
      setComment("");
    }
  };

  const updateComment = (e) => {
    setComment(e.target.value);
  };

  const updateCommentEdit = (e) => {
    setCommentEdit(e.target.value);
  };

  const onEditButtonClick = (e, currVal, buttonsClass, messageClass, formClass) => {
    e.preventDefault();

    if(currVal)
      setCommentEdit(currVal);
    let divButtons = document.querySelector(buttonsClass);
    let divMessage = document.querySelector(messageClass);
    let divForm = document.querySelector(formClass);

    if(!editing){
      divButtons.style.display = "none";
      divMessage.style.display = "none";
      divForm.style.display = "block";
    } else {
      divButtons.style.display = "grid";
      divMessage.style.display = "block";
      divForm.style.display = "none";
    }
    setEditing(!editing);
  }

  const onEditComment = (e, id, currVal, buttonsClass, messageClass, formClass) => {
    e.preventDefault();
    const data = dispatch(editComment( id, instrumentId, commentEdit));
    if (data.errors) {
      setErrors(data.errors);
    } else {
      onEditButtonClick(e, currVal, buttonsClass, messageClass, formClass);
    }
  }

  const onDeleteComment =  (id) => {
    dispatch(deleteAComment(id));
  };

  const onViewEditTP = (id) => {
    history.push(`/tradeplans/${id}`)
  };

  return (
    <div className="market-watch__page">
      <div className="market-watch">
        <div className="market-watch__cntnr">
          <div className="market-watch__charts">
          <div className="dollar-base">
            {dollarBase.map((symbol) => {
              return (
                <div key={symbol} className="marketwatch__chart">
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
                <div key={comment.comment + comment.id} className="comment-card">
                  <div className="comment-username">{comment.poster_username}</div>
                  <span className={`comment-text${comment.id}`}>{comment.comment}</span>
                  {user.id === comment.poster_id && [user.id].map((userId) => {
                    return (
                      <div key={comment.comment + "ljk" + user.id} className={`comment__buttons${comment.id} comment__buttons`}>
                        <button
                          onClick={(e) => onEditButtonClick(e, comment.comment, `.comment__buttons${comment.id}`, `.comment-text${comment.id}`, `.edit-comment${comment.id}`)}
                          className={`edit-comment__button`}
                        > Edit

                        </button>
                        <button onClick={(e) => onDeleteComment(comment.id)} className="delete-comment"> Delete

                        </button>
                      </div>
                    )
                  })}
                  <div className={`edit-comment${comment.id} edit__form`}>
                    <form onSubmit={(e) => onEditComment(e, comment.id, "", `.comment__buttons${comment.id}`,
                              `.comment-text${comment.id}`, `.edit-comment${comment.id}`)} method="PUT" className="comment__form">
                      <div className="market-watch__formField">
                        <textarea
                          className="edit-textarea"
                          name="comment"
                          placeholder=""
                          value={commentEdit}
                          onChange={updateCommentEdit}
                          cols="30"
                          rows="4"
                        >
                        </textarea>
                        <div className="edit-form__buttons">
                          <button
                            onClick={(e) => onEditButtonClick(e, "", `.comment__buttons${comment.id}`,
                              `.comment-text${comment.id}`, `.edit-comment${comment.id}`)}
                            className="edit-form-buttons comment-form__submit"
                          > Cancel
                          </button>
                          <button
                            type="submit"
                            className="edit-form-buttons comment-form__submit"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
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
      <div className="feed__container">

        <div className="tp-cntnr">
          <div className="feed__title">Community Trading Plans</div>
          <div className="feed__tradeplans">
            <div className="scroll">
              {displayTradeplans && displayTradeplans.map((tradeplan) => {
                return (
                  <div className="feed__tradeplan-container">
                    <div className="tradeplan__title">{tradeplan.title}</div>
                    <div className="tradeplan__chart-buttons-cntnr">
                      <img src={tradeplan.image} alt="tradeplan chart" className="feed__img" />
                      <div className="tradeplan__buttons-cntnr">
                        <button onClick={() => onViewEditTP(tradeplan.id)} className="tradeplan__button tradeplan__view">View
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketWatch;
