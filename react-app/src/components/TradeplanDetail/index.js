import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { editTradeplan, getOneTradeplan } from "../../store/tradeplan";
import chartSymbol from "./chartSymbol";
import { getSelf } from "../../store/session";
import "../TradePlanning/TradePlanning.css";

const TradeplanDetail = () => {
  const [errors, setErrors] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [instrumentId, setInstrumentId] = useState(0);
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [makePublic, setMakePublic] = useState(true);
  const [newChart, setNewChart] = useState(false);
  const [chartCode, setChartCode] = useState("EURUSD");
  const { planId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOneTradeplan(planId));
  }, [dispatch, planId]);

  useEffect(() => {
    setChartCode(chartSymbol(instrumentId));
    console.log("(((((((((((((((((((((((((((")
    console.log(instrumentId);
  }, [instrumentId]);

  const tradeplan = useSelector((state) => state.tradeplans[planId]);
  const user = useSelector(state => state.session.user);

  if(!tradeplan) {
    return null;
  } else {
    if(!loaded){
      setInstrumentId(tradeplan.instrument_id);
      setTitle(tradeplan.title);
      setImageUrl(tradeplan.image)
      setDescription(tradeplan.description)
      setMakePublic(tradeplan.public)
      setLoaded(true);
    }
  }


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

  const onEditTradeplan = async (e) => {
    e.preventDefault();
    const data = await dispatch(editTradeplan(planId, instrumentId, title, imageUrl, description, makePublic));
    await dispatch(getSelf());
    if (data.errors) {
      setErrors(data.errors);
    } else {
      history.push(`/users/${user.id}`)
    }

  };

  const updateNewChart = (chartClass, imgClass) => {
    setNewChart(!newChart);

    let div1 = document.querySelector(chartClass);
    let div2 = document.querySelector(imgClass);
    if (div1.style.display !== "block") {
        div1.style.display = "block";
        div2.style.display = "none";
    }
    else {
        div1.style.display = "none";
        div2.style.display = "block";
    }
  };

  return (
    <div className="editTP__cntnr">
      <div className="editTP__toggle">
        <label className="publishing_cntnr toggle__label" > New Chart
          <input
            className="publishing_input toggle__input"
            name="public"
            type="checkbox"
            onChange={() => updateNewChart(".toggle-chart", ".toggle-image")}
            checked={newChart}
          >
          </input>
          <span className="check toggle__check"></span>
        </label>
        <div className="toggle__balance"></div>
      </div>
      <div className="tradeplanning__cntnr detail__cntnr">
        <div id="chart__div" className="tradeplanning__chart toggle-chart">
          <TradingViewWidget
            symbol={chartCode}
            interval="1"
            theme={Themes.DARK}
            autosize
            hide_side_toolbar={false}
            // allow_symbol_change={false}
          />
        </div>
        <div className="toggle-image tradeplanning__chart">
          <img src={tradeplan.image} alt="chart" className="tradeDetailImg" />
        </div>
        <div className="tradeplanning__form-cntnr">
          <form onSubmit={onEditTradeplan} action="" method="POST" className="tradeplanning__form form">
            <div className="form__header">Review/Edit Trading Plan</div>
            <div className="form__errors-cntnr tradeplanning__errors">
              {errors.map((error) => (
                <div className="error">{error}</div>
              ))}
            </div>
            <div className="formField">
              <select className="tradeplanning__form--select" value={instrumentId} onChange={updateInstrumentId} >
                <option disabled={true} value={0}>Select an Instrument</option>
                <option value={1}>USD/JPY</option>
                <option value={2}>USD/CHF</option>
                <option value={3}>USD/CAD</option>
                <option value={4}>EUR/USD</option>
                <option value={5}>GBP/USD</option>
                <option value={6}>AUD/USD</option>
                <option value={7}>NZD/USD</option>
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
    </div>


  );
};

export default TradeplanDetail;
