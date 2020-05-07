import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";

import { Cards } from "./components";
import { Data, fetchData } from "./services/api";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

function App() {
  const classes = useStyles();

  const [data, setData] = useState<Data | any>({});

  useEffect(() => {
    async function get() {
      const response = await fetchData();
      setData(response);
    }
    get();
  });

  return (
    <div className={classes.root}>
      <Cards data={data} />
    </div>
  );
}

export default App;
