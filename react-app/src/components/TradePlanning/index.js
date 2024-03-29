import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { createTradeplan, getAllTradeplans } from "../../store/tradeplan";
import chartSymbol from "../TradeplanDetail/chartSymbol";
import { getSelf } from "../../store/session";
import "./TradePlanning.css";

const TradePlanning = () => {
  const [errors, setErrors] = useState([]);
  const [instrumentId, setInstrumentId] = useState(4);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [makePublic, setMakePublic] = useState(true);
  const [chartCode, setChartCode] = useState("EURUSD");
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllTradeplans());
  }, [dispatch]);

  useEffect(() => {
    setChartCode(chartSymbol(instrumentId));
  }, [instrumentId]);

  const updateInstrumentId = (e) => {
    setInstrumentId(Number(e.target.value));
  };

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
    const tempErrors = [];
    if (instrumentId < 1)
      tempErrors.push("Select an instrument")
    if (title.length < 5)
      tempErrors.push("Enter a title of at least 5 characters")
    if (!imageUrl.startsWith("https://www.tradingview.com"))
      tempErrors.push("Use the camera icon on top right of chart to get image")
    if (description.length < 5)
      tempErrors.push("Enter a description of at least 5 characters")
    if (tempErrors.length < 1) {
      const data = await dispatch(createTradeplan(instrumentId, title, imageUrl, description, makePublic));
      await dispatch(getSelf());
      if (data.errors) {
        setErrors(data.errors);
      } else {
        history.push(`/users/${user.id}`)
      }
    } else {
      setErrors(tempErrors);
    }
  };

  return (
    <div className="tradeplanning__cntnr">
      <div className="tradeplanning__chart">
        <TradingViewWidget
          symbol={chartCode}
          interval="1"
          theme={Themes.DARK}
          autosize
          hide_side_toolbar={false}
          // allow_symbol_change={false}
        />
      </div>
      <div className="tradeplanning__form-cntnr">
        <form onSubmit={onSaveTradeplan} action="" method="POST" className="tradeplanning__form form">
          <div className="form__header">Create a Trading Plan</div>
          <div className="form__errors-cntnr tradeplanning__errors">
            {errors.map((error) => (
              <div className="error">{error}</div>
            ))}
          </div>
          <div className="formField">
            <select className="tradeplanning__form--select" value={instrumentId} onChange={updateInstrumentId} >
              <option disabled={true}  >Select an Instrument</option>
              <option value={1}>USD/JPY</option>
              <option value={2}>USD/CHF</option>
              <option value={3}>USD/CAD</option>
              <option value={4}>EUR/USD</option>
              <option value={5}>GBP/USD</option>
              <option value={6}>AUD/USD</option>
              <option value={6}>NZD/USD</option>
            </select>
          </div>
          <div className="formField">
            <input
              name="title"
              type="text"
              placeholder="Title"
              autoComplete="off"
              value={title}
              onChange={updateTitle}
            />
          </div>
          <div className="formField">
            <input
              name="image"
              type="text"
              placeholder="Image URL"
              autoComplete="off"
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
              rows="12"
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
