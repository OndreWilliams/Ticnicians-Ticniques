import React, { useState, useEffect } from "react";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import "./MarketWatch.css";

const MarketWatch = () => {

  const dollarBase = ["USDJPY", "USDCHF", "USDCAD"];
  const dollarQuote = ["EURUSD", "GBPUSD", "AUDUSD", "NZDUSD"];

  return (
    <div className="market-watch">
      <div className="market-watch__charts">
        <div className="dollar-base">
          {dollarBase.map((symbol) => {
            return (
              <TradingViewWidget
                symbol={symbol}
                interval="1"
                theme={Themes.DARK}
                save_image={false}
                hide_legend={true}
                hide_side_toolbar={true}
                allow_symbol_change={true}
                width={500}
                height={400}
                symbol_name_label={true}
              />
            )
          })}
        </div>
        <div className="dollar-quote">

        </div>
      </div>
      <div className="market-watch__chat">

      </div>
    </div>
  );
};

export default MarketWatch;
