import React from "react";

import CountUp from "react-countup";

import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

import { Data } from "../../services/api";

const useStyles = makeStyles({
  container: {
    margin: "50px 0",
  },
  card: {
    margin: "0 2% !important",
  },
  infected: {
    borderBottom: "10px solid rgba(0, 0, 255, .5)",
  },
  recovered: {
    borderBottom: "10px solid rgba(0, 255, 0, .3)",
  },
  deaths: {
    borderBottom: "10px solid rgba(255, 0, 0, .3)",
  },
});

interface Props {
  data: Data;
}

function Cards({ data: { confirmed, recovered, deaths, lastUpdate } }: Props) {
  const classes = useStyles();

  if (!confirmed) {
    return <CircularProgress disableShrink size={100} />;
  }

  const formatedDate = new Date(lastUpdate).toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className={classes.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={`${classes.card} ${classes.infected}`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Infectados
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={confirmed.value}
                duration={1}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">{formatedDate}</Typography>
            <Typography variant="body2">
              Número de casos ativos de COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={`${classes.card} ${classes.recovered}`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Recuperados
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={recovered.value}
                duration={1}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">{formatedDate}</Typography>
            <Typography variant="body2">
              Número de recuperados do COVID-19
            </Typography>
          </CardContent>
        </Grid>
        <Grid
          item
          component={Card}
          xs={12}
          md={3}
          className={`${classes.card} ${classes.deaths}`}
        >
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Mortes
            </Typography>
            <Typography variant="h5">
              <CountUp
                start={0}
                end={deaths.value}
                duration={1}
                separator="."
              />
            </Typography>
            <Typography color="textSecondary">{formatedDate}</Typography>
            <Typography variant="body2">
              Mortes causadas pelo COVID-19
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
}

export default Cards;
