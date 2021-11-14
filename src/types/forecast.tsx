export interface foreCastpropsInterface {
    foreCastData: {
        error: boolean
        fetched: boolean
        fetching: boolean
        foreCast: {
            forecastFiveDays: []
            selectedDayForecast: {
                city: {
                    id: number
                    name: string
                    coord: any
                    country: string
                    population: number
                    sunrise: number
                    sunset: number
                    timezone: number
                }
                day: string
                main: {
                    temp: number
                    feels_like: number
                    temp_min: number
                    temp_max: number
                    pressure: number
                    sea_level: number
                    temp_kf: number
                    humidity: number

                }
                temp: {
                    temp_max: number
                    temp_min: number
                }
                weather: {
                    id: number
                    main: string
                    description: string
                    icon: string
                }
                wind: {
                    speed: number
                    deg: number
                    gust: number
                }
            }
        }
    },
    getForecastData(searchType: string, searchValue: string | number): any,
    upDateForecastData: any
}


export interface selectedDayForecast {

    city: {
        id: number
        name: string
        coord: any
        country: string
        population: number
        sunrise: number
        sunset: number
        timezone: number
    }
    day: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        sea_level: number
        temp_kf: number
        humidity: number

    }
    temp: {
        temp_max: number
        temp_min: number
    }
    weather: {
        id: number
        main: string
        description: string
        icon: string
    }
    wind: {
        speed: number
        deg: number
        gust: number
    }

}


export interface foreCastActionInterface {
    type: string
    data: {
        forecastFiveDays: []
        selectedDayForecast: {
            city: {
                id: number
                name: string
                coord: any
                country: string
                population: number
                sunrise: number
                sunset: number
                timezone: number
            }
            day: string
            main: {
                temp: number
                feels_like: number
                temp_min: number
                temp_max: number
                pressure: number
                sea_level: number
                temp_kf: number
                humidity: number

            }
            temp: {
                temp_max: number
                temp_min: number
            }
            weather: {
                id: number
                main: string
                description: string
                icon: string
            }
            wind: {
                speed: number
                deg: number
                gust: number
            }
        }
    }
    error:string

}

