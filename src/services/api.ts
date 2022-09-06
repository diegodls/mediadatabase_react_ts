import axios from "axios";
import { ITitleOverview } from "../interfaces/interface";

interface ApiOption {
  method: string;
  url: string;
  params: { tconst: string; currentCountry: string };
  headers: {
    "X-RapidAPI-Key": string;
    "X-RapidAPI-Host": string;
  };
}

async function makeApiCall(options: ApiOption): Promise<ITitleOverview> {
  let data = {} as ITitleOverview;
  await axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      data = response.data;
    })
    .catch(function (error) {
      console.error(error);
      return error;
    });

  return data;
}

export function getOverview(title: string): Promise<ITitleOverview> {
  const options = {
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/title/get-overview-details",
    params: { tconst: title, currentCountry: "US" },
    headers: {
      "X-RapidAPI-Key": "4bd2a93e22mshd9758584eab9653p15f1adjsn839c24bc1c2a",
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };

  return makeApiCall(options);
}
