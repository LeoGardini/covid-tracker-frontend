import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";

import { Cards, Chart, CountryPicker } from "./components";
import { Data, fetchData } from "./services/api";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

function App() {
  const classes = useStyles();

  const [data, setData] = useState<Data | any>({});
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    async function get() {
      setData(await fetchData(""));
    }
    get();
  }, []);

  async function handleCountryChange(countrySelected: string) {
    if (countrySelected === "Global") countrySelected = "";
    setCountry(countrySelected);
    setData(await fetchData(countrySelected));
  }

  return (
    <div className={classes.root}>
      <Cards data={data} />
      <CountryPicker countryChange={handleCountryChange} />
      <Chart data={data} country={country} />
    </div>
  );
}

export default App;
