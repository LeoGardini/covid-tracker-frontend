import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";

import { Line, Bar } from "react-chartjs-2";

import { Data, DailyData, fetchDailyData } from "../../services/api";

const useStyles = makeStyles({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: "85%",
  },
});

interface Props {
  data: Data;
  country: string;
}

function Chart({ data, country }: Props) {
  const classes = useStyles();
  const [dailyData, setDailyData] = useState<DailyData[]>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const LineChart = dailyData.length ? (
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
  ) : null;

  const BarChart = data.confirmed ? (
    <Bar
      data={{
        labels: ["Infectados", "Recuperados", "Mortos"],
        datasets: [
          {
            label: "Casos",
            backgroundColor: [
              "rgba(0, 0, 255, .3)",
              "rgba(0, 255, 0, .3)",
              "rgba(255, 0, 0, .3)",
            ],
            data: [
              data.confirmed.value,
              data.recovered.value,
              data.deaths.value,
            ],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Informações de ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={classes.container}>{country ? BarChart : LineChart}</div>
  );
}

export default Chart;
