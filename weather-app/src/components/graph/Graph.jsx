// import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Box } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import "./graph.css";

const Graph = ({ dailydata }) => {
  const [climate, setClimate] = useState({}); //save

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < dailydata.length/2; i++) {
      // let bag = dailydata[i].temp.day
      // let x = localStorage.setItem(bag)
      arr.push(dailydata[i].temp);
    }
    console.log(arr);
    setClimate([...arr]); // store.
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [dailydata, setClimate]);

  // Apex graphs. 
  var options = {
    chart: {
      height: 300,
      type: "area"
    },
    dataLabels: {
      enabled: true
    },
    series: [
      {
        name: "Temp",
        // data: [45, 52, 38, 45, 19, 23, 2],
        data: climate || [45, 52, 38, 45, 19, 23, 2]
      }
    ],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.9,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: [
        // "SUN",
        // "MON",
        // "TUE",
        // "WED",
        // "THURS",
        // "FRI",
        // "SAT"
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11",
        "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "00"
      ]
    }
  };

  return <>
    <Box >
      <Chart
        options={options}
        series={options.series}
        data={options.series.data}
        type="area"
        width="100%"
        height="320px"
      />
    </Box>
  </>;
};

export default Graph;

// Ref.
// https://apexcharts.com/docs/chart-types/area-chart/