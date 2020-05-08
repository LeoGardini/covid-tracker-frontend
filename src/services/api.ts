import axios from "axios";

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

const url = process.env.REACT_APP_API_URL || "https://covid19.mathdro.id/api";

export const fetchData = async () => {
  try {
    const {
      data: { confirmed, recovered, deaths, lastUpdate },
    } = await axios.get(url);

    const modifiedData: Data = {
      confirmed,
      recovered,
      deaths,
      lastUpdate,
    };

    return modifiedData;
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
