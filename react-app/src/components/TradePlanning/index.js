import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { createTradeplan } from "../../store/tradeplan";
import "./TradePlanning.css";

const TradePlanning = () => {
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [makePublic, setMakePublic] = useState(true);

  const dispatch = useDispatch();

  const updateTitle = (e) => {
    setTitle(e.target.value);
  };

  const updateImageUrl = (e) => {
    setImageUrl(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  const updateMakePublic = () => {
    setMakePublic(!makePublic);
  }

  const onSaveTradeplan = async (e) => {
    e.preventDefault();
    const data = await dispatch(createTradeplan(title, imageUrl, description, makePublic));
    if (data.errors) {
      setErrors(data.errors);
    }
  };

  return (
    <div className="tradeplanning__cntnr">
      <div className="tradeplanning__chart">
        <TradingViewWidget
          symbol="EURUSD"
          interval="1"
          theme={Themes.DARK}
          autosize
          hide_side_toolbar={false}
          // allow_symbol_change={false}
        />
      </div>
      <div className="tradeplanning__form-cntnr">
        <form onSubmit={onSaveTradeplan} action="/api/tradeplan" className="tradeplanning__form form">
          <div className="form__header">Create a Trading Plan</div>
          <div className="formField">
            <input
              name="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={updateTitle}
            />
          </div>
          <div className="formField">
            <input
              name="imageUrl"
              type="text"
              placeholder="Image URL"
              value={imageUrl}
              onChange={updateImageUrl}
            />
          </div>
          <div className="formField">
            <textarea
              className="tradeplanning__form--textarea"
              name="description"
              placeholder="Enter a description of the trading plan..."
              value={description}
              onChange={updateDescription}
              cols="30"
              rows="15"
            >
            </textarea>
          </div>
          <div className="form__radio--cntnr">
            <div className="form__radio--field">
              <label className="publishing_cntnr" > Public
                <input
                  className="publishing_input"
                  name="public"
                  type="checkbox"
                  onChange={updateMakePublic}
                  checked={makePublic}
                >
                </input>
                <span className="check"></span>
              </label>
            </div>
            <div className="form__radio--field">
              <label className="publishing_cntnr" > Private
                <input
                  className="publishing_input"
                  name="private"
                  type="checkbox"
                  onChange={updateMakePublic}
                  checked={!makePublic}
                >
                </input>
                <span className="check"></span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="tradeplanning__form--submit"
          >
            Save
          </button>
        </form>

      </div>
    </div>

  );
}

export default TradePlanning;
