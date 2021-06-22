import axios from 'axios';

const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

    return { confirmed, recovered, deaths, lastUpdate };
  } catch (error) {
    return error;
  }
};

// export const fetchDailyData = async () => {
//   try {
//     const { data } = await axios.get(`${url}/daily`);

//     return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
//   } catch (error) {
//     return error;
//   }
// };

// Instead of Global, it fetches the daily data for the US
export const fetchDailyData = async () => {
    try {
      const { data } = await axios.get('https://covid19.mathdro.id/api/daily');
  
     const modifyData = data.map((dailyData)=>({
       confirmed : dailyData.confirmed.total,
       deaths : dailyData.deaths.total, 
       date : dailyData.reportDate
     }))

     return modifyData;
    } catch (error) {
      return error;
    }
  };

export const fetchCountries = async () => {
  try {
    const {data : {countries}} = await axios.get(`https://covid19.mathdro.id/api/countries`);

    return countries.map((country)=> country.name)
  } catch (error) {
    return error;
  }
};