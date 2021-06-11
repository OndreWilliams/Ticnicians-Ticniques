import React, { useState, useEffect } from "react";
import { Redirect, useHistory } from 'react-router-dom';
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import { useDispatch, useSelector } from "react-redux";
import "./MarketWatch.css";

const MarketWatch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user);
  const comments = useSelector(state => state.comments);

  const dollarBase = ["USDJPY", "USDCAD","EURUSD", "GBPUSD", "AUDUSD", "NZDUSD"];

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

      </div>
      </div>

    </div>
  );
};

export default MarketWatch;
