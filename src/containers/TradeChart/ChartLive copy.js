import React, { useEffect,useState, useRef } from "react";
// import "./style.css";
// import axios from 'axios';
// import moment from 'moment'; 

// import { priceData } from "./priceData";
// import { areaData } from './areaData';
import { volumeData } from "./volumeData";

import { createChart, CrosshairMode } from "lightweight-charts";

export default function ChartLive(props){
//   const [priceData,setPriceData]=useState([]); 
//   const [volumeData,setVolumeData]=useState([]);  
  const chartContainerRef = useRef();
  const chart = useRef();
  const resizeObserver = useRef();
//   const getCoinLetestPrice=()=>{
//     // var data = { 
//     //      "coin": coin
//     // }
//     let config = {
//         headers: {
//             // 'x-access-token': props.token,
//             'Content-Type': 'application/json'
//         }
//     }
//     //https://api.tradekia.com/api/getTotalWaletData
    
//     axios.get(`http://localhost:3000/api/getTradeViewData`,config)
//         .then(res => {
//             let r=res.data.data; 
//             console.log("hjfhjfdhj",r); 
//             const cdata = r.map(d => {
//                 // return {time:d[0]/1000,open:parseFloat(d[1]),high:parseFloat(d[2]),low:parseFloat(d[3]),close:parseFloat(d[4])}
//                 // let ms = new Date(d.time).formate();
//                 let ms=moment(d.time).format('YYYY-MM-DD');
//                 // let ms={};
//                 // let date=moment(d.time).format('DD');
//                 // let m=moment(d.time).format('MM');
//                 // let y=moment(d.time).format('YYYY');
//                 // ms.day=date;
//                 // ms.month=m;
//                 // ms.year=y; 
//                 // console.log("fhfdhfh",ms); 
//                  return {time:ms,open:parseFloat(d.OpenPrice*1000),high:parseFloat(d.HigiestPrice*1000),low:parseFloat(d.LowestPrice*1000),close:parseFloat(d.closePrice*1000)}
                
//               });
//               console.log("Hehe",cdata); 
//               setPriceData(cdata);
//             // let fd = changehdformate(r);
//             // setHd(fd);
//         }).catch(error => {
//             // if (error.response.status === 401) {
//             //     toast.error('Some error occured, please try again some time.', {
//             //         position: "bottom-center",
//             //         autoClose: 5000,
//             //         hideProgressBar: false,
//             //         closeOnClick: true,
//             //         pauseOnHover: true,
//             //         draggable: true,
//             //         progress: undefined,
//             //     });
//             // }
//         });
// }
// useEffect(()=>{
//     console.log("priceData22",priceData); 
//     getCoinLetestPrice();
// },[]); 

  useEffect(() => { 
    if(props.priceData&&props.priceData.length>0){

    chart.current = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 350, //"300px", //chartContainerRef.current.clientHeight,
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
        borderColor: "#485c7b"
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
    candleSeries.setData(props.priceData);

    // const areaSeries = chart.current.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);

    const volumeSeries = chart.current.addHistogramSeries({
      color: "#182233",
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
    volumeSeries.setData(volumeData);
  } 
}, [props.priceData]);

  // Resize chart on container resizes.
  useEffect(() => {
    if(props.priceData&&props.priceData.length>0){
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
  }, [props.priceData]);
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
