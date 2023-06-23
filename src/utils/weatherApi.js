import axios from "axios";

const options = {
  method: "GET",
  url: "https://open-weather13.p.rapidapi.com/city/landon",
  headers: {
    "X-RapidAPI-Key": "b4ab2af442mshab59fd1abb57b77p1e988ajsn8fa2739239c3",
    "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
  },
};

export const getWeather = async () => {
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
