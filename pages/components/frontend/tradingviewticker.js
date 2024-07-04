import React, { useEffect, useRef } from "react";

const TradingViewTicker = (props) => {
  const { symbol, locale, theme } = props;
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (!scriptLoaded.current) {
      const script = document.createElement("script");
      script.src =
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          {
            proName: "FOREXCOM:SPXUSD",
            title: "S&P 500 Index",
          },
          {
            proName: "FOREXCOM:NSXUSD",
            title: "US 100 Cash CFD",
          },
          {
            proName: "FX_IDC:EURUSD",
            title: "EUR to USD",
          },
          {
            proName: "BITSTAMP:BTCUSD",
            title: "Bitcoin",
          },
          {
            proName: "BITSTAMP:ETHUSD",
            title: "Ethereum",
          },
        ],
        showSymbolLogo: true,
        isTransparent: false,
        displayMode: "adaptive",
        colorTheme: "dark",
        locale: "en",
      });
      document.body.appendChild(script);
      scriptLoaded.current = true;
    }

    return () => {
      const container = containerRef.current;
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [symbol, locale, theme]);

  return <div ref={containerRef} />;
};

export default TradingViewTicker;
