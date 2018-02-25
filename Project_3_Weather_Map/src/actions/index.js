import axios from 'axios';
const API_KEY = '87f0f2ecd039eca6fe432e5ff5e5231f';
export const FETCH_WHEATHER = "FETCH_WHEATHER";
const ROOT_URL=`http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export function fetchWheather(city) {
    const url = `${ROOT_URL}&q=${city},ua`;
    const request = axios.get(url);

    return {
        type: FETCH_WHEATHER,
        payload: request
    };
}