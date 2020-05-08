import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";
import { NativeSelect, FormControl } from "@material-ui/core";
import { Country, fetchCountries } from "../../services/api";

const useStyles = makeStyles({
  formControl: {},
});

function CountryPicker({ countryChange }: any) {
  const classes = useStyles();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    fetchAPI();
  }, [setCountries]);

  return (
    <FormControl className={classes.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => countryChange(e.target.value)}
      >
        <option value="global">Global</option>
        {countries.length &&
          countries.map((country, index) => (
            <option key={index}>{country}</option>
          ))}
      </NativeSelect>
    </FormControl>
  );
}

export default CountryPicker;
