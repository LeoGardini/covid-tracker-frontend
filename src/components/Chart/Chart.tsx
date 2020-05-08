import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";

import { Line, Bar } from "react-chartjs-2";

import { DailyData, fetchDailyData } from "../../services/api";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "66.66%",
  },
});

function Chart() {
  const classes = useStyles();
  const [dailyData, setDailyData] = useState<Array<DailyData>>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ reportDate }) => reportDate),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infectados",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Mortes",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, .3)",
            fill: true,
          },
        ],
      }}
    />
  ) : (
    <h1>Deu pau!</h1>
  );

  return <div className={classes.container}>{lineChart}</div>;
}

export default Chart;
