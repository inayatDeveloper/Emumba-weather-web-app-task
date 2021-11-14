import { REQUEST_FORECAST, SUCCESS_FORECAST, FAILED_FORECAST } from "../constant";
import { callApi } from "../utils/call-api";
import { getFiveDays } from '../utils/dateUtils';

export const mapStateToProps = (state: any) => {
    return { foreCastData: state.foreCast };
};

let reqForecast = () => {
    return {
        type: REQUEST_FORECAST,
    };
};

let successForecast = (data: any) => {

    const forecastFiveDays: any = [];
    const fiveDays = getFiveDays();
    let selectedDayForecast = {}

    data.list.slice(5).forEach((i: any, index: number) => {
        let dayName = fiveDays[index]
        if (dayName) {
            forecastFiveDays.push({
                city: data.city,
                day: dayName,
                temp: {
                    temp_max: i.main.temp_max,
                    temp_min: i.main.temp_min,
                },
                weather: i.weather[0],
                main: i.main,
                wind: i.wind,
            });

            if (!index) {
                selectedDayForecast = {
                    city: data.city,
                    day: dayName,
                    temp: {
                        temp_max: i.main.temp_max,
                        temp_min: i.main.temp_min,
                    },
                    weather: i.weather[0],
                    main: i.main,
                    wind: i.wind,
                }
            }
        }

    });
    return {
        type: SUCCESS_FORECAST,
        data: { forecastFiveDays, selectedDayForecast },
    };
};

let failedForecast = (err: any) => {
    return {
        type: FAILED_FORECAST,
        error: err,
    };
};

export const mapDispatchToProps = (dispatch: any) => {
    return {
        getForecastData: async (searchType: string, searchValue: string) => {
            try {

                dispatch(reqForecast());
                let url = searchType === "cityName" ? `http://api.openweathermap.org/data/2.5/forecast?q=${searchValue}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}` : searchType === "zipCode" ? `http://api.openweathermap.org/data/2.5/forecast?id=${searchValue}&units=metric&appid=${process.env.REACT_APP_WEATHER_KEY}` : ""

                callApi(url, 'get').then((res) => {
                    dispatch(successForecast(res));
                }).catch((error) => {
                    dispatch(failedForecast(error));
                })

            } catch (error) {
                dispatch(failedForecast(error));
            }
        },
        upDateForecastData: async (data: any) => {
            dispatch({
                type: SUCCESS_FORECAST,
                data,
            });
        }
    };
};
