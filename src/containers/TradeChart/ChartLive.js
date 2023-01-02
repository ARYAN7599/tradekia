import React, { useEffect,useState, memo, useRef } from "react";
import axios from 'axios';
import { URL } from "../../helpers/global";
import { volumeData } from "./volumeData";

import { createChart, CrosshairMode } from "lightweight-charts";

const ChartLive=(props)=>{
  const [priceData, setPriceData] = React.useState([]);

  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();


const getChartPriceData = () => {
  // var data = {
  //      "coin": coin
  // }
  let config = {
    headers: {
      "Content-Type": "application/json",
    },
  };


  axios.get(`${URL}getTradeViewData?interval=1D&page=1&datalimit=120`, config).then((res) => {
    let r = res.data.data;
    const cdata = r.data.map((d) => {
      // let ms = new Date(d.time).getTime();
      return {
        time: (d[0] && typeof(d[0]) !== "undefined" && d[0] !== null ) ?d[0] / 1000:1668396606007,
        open: (d[1] && typeof(d[1]) !== "undefined" && d[1] !== null )?parseFloat(d[1]):0.11,
        high: (d[2] && typeof(d[2]) !== "undefined" && d[2] !== null)?parseFloat(d[2]):0.11,
        low: (d[3] && typeof(d[3]) !== "undefined" && d[3] !== null )?parseFloat(d[3]):0.11,
        close:(d[4] && typeof(d[4]) !== "undefined" && d[4] !== null )? parseFloat(d[4]):0.11,
        value: (d[5] && d[5] != null)?parseFloat(d[5]):14959,
      };
    });
    setPriceData(cdata);
  }).catch((error) => { });
};


useEffect(() => {
  getChartPriceData(); 
},[]); 

  useEffect(() => { 
   
      if(priceData&&priceData.length>0){

    chart.current = createChart(chartContainerRef.current, {
      width:  chartContainerRef.current.clientWidth,
      height: 400, //chartContainerRef.current.clientHeight,
      layout: {
        backgroundColor: "#253248",
        textColor: "rgba(255, 255, 255, 0.9)"
      },
      grid: {
        vertLines: {
          color: "#334158"
        },
        horzLines: {
          color: "#334158"
        }
      },
      crosshair: {
        mode: CrosshairMode.Normal
      },
      priceScale: {
        borderColor: "#fdb201" //"#485c7b"
      },
      timeScale: {
        borderColor: "#485c7b",
        timeVisible:true,
        secondsVisible:false,
      }
    });

    const candleSeries = chart.current.addCandlestickSeries(
        {
      upColor: "#4bffb5",
      downColor: "#ff4976",
      borderDownColor: "#ff4976",
      borderUpColor: "#4bffb5",
      wickDownColor: "#838ca1",
      wickUpColor: "#838ca1"
    }
    );
    candleSeries.setData(priceData);

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(props.priceData);

    const volumeSeries = chart.current.addHistogramSeries({
      color: "#0056b3", //"#182233",
      lineWidth: 2,
      priceFormat: {
        type: "volume"
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0
      }
    });
    volumeSeries.setData(priceData);
  } 
}, [priceData]);

  // Resize chart on container resizes.
  useEffect(() => {
    if(priceData&&priceData.length>0){
    resizeObserver.current = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      chart.current.applyOptions({ width, height });
      setTimeout(() => {
        chart.current.timeScale().fitContent();
      }, 0);
    });
    resizeObserver.current.observe(chartContainerRef.current);
    return () => resizeObserver.current.disconnect();
}
  }, [priceData]);
  return (
    <div>
      <div
        ref={chartContainerRef}
        className="chart-container"
        // style={{ height: "100%" }}
      />
    </div>
  );
}

export default memo(ChartLive);