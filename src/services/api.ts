import axios from "axios";

const url: string | any = process.env.REACT_APP_API_URL;

export interface Data {
  confirmed: {
    value: number;
    detail: string;
  };
  recovered: {
    value: number;
    detail: string;
  };
  deaths: {
    value: number;
    detail: string;
  };
  lastUpdate: Date;
}

export const fetchData = async (country: string) => {
  let changeableUrl: string;

  if (country) changeableUrl = `${url}/countries/${country}`;
  else changeableUrl = url;

  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (err) {
    console.log(err);
  }
};

export interface DailyData {
  confirmed: {
    total: number;
    china: number;
    outsideChina: number;
  };
  deaths: {
    total: number;
    china: number;
    outsideChina: number;
  };
  recovered: {
    total: number;
    china: number;
    outsideChina: number;
  };
  reportDate: Date;
}

export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    return data.map((dailyData: DailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      reportDate: dailyData.reportDate,
    }));
  } catch (err) {
    console.log(err);
  }
};

export interface Country {
  name: string;
  iso2: string;
  iso3: string;
}

export const fetchCountries = async () => {
  try {
    const { data } = await axios.get(`${url}/countries`);

    return data.countries.map((country: Country) => country.name);
  } catch (err) {
    console.log(err);
  }
};
