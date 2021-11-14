import { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "../actions/forecast";
import { foreCastpropsInterface } from "../types/forecast"
import { selectedDayForecast } from "../types/forecast"

const Forecast = (props: foreCastpropsInterface) => {
    const [tempToday, setTempTody] = useState<number>(0);
    const [tempType, setTempType] = useState<string>("celius");

    // if temp degree type change or day change then update temp according to it.
    useEffect(() => {
        let tempvalue = props?.foreCastData?.foreCast?.selectedDayForecast?.temp?.temp_max;
        if (tempType === "celius") {
            setTempTody(Math.trunc((tempvalue)))
        } else {
            setTempTody(Math.trunc((tempvalue * 1.8) + 32))
        }

    }, [tempType, props?.foreCastData?.foreCast?.selectedDayForecast?.temp?.temp_max])

    // Method to get icon according to weather condation.
    const getIcon = (iconCode: string) => {
        let icon = `https://openweathermap.org/img/w/${iconCode}.png`
        return icon;
    }

    const handleSelectedDayForeCast = (info: selectedDayForecast) => {
        props.foreCastData.foreCast.selectedDayForecast = info;
        props.upDateForecastData(props.foreCastData.foreCast);
    }

    let selectedDay = props?.foreCastData?.foreCast?.selectedDayForecast;
    return (
        <>

            {props?.foreCastData?.fetching ? <p className="Loader">Loading...</p> : props?.foreCastData?.error ? <p className="errorRespone">{props?.foreCastData?.error}</p> : props?.foreCastData?.fetched ? <>

                <div className="row foreCastRow">
                    <div className="col-md-12">
                        <span className="cityTitle">{selectedDay?.city?.name},{selectedDay?.city?.country}</span>
                        <p className="daystatus">{selectedDay?.day}</p>
                        <p className="weatherStatus">{selectedDay?.weather?.main}</p>


                    </div>
                </div>

                <div className="row foreCastSubTitleinfo">
                    <div className="col-md-4">
                        <div className="weathericonTemp">
                            <img src={getIcon(selectedDay?.weather?.icon)} alt="weatherstatus" />
                            <span>{tempToday}</span>&nbsp;<span className="degreeTemp"><sup><span className="celiusDegree" onClick={() => setTempType("celius")}>&#8451;</span>|<span className="farhentDegree" onClick={() => setTempType("farhent")}>&#8457;</span></sup></span>

                        </div>
                    </div>
                    <div className="col-md-8">
                        <p>Pressure:&nbsp;{selectedDay?.main?.pressure}&nbsp;hPa</p>
                        <p className="preHumspeedInfo">Humidity:&nbsp;{selectedDay?.main?.humidity}&nbsp;%</p>
                        <p className="preHumspeedInfo">Wind speed:&nbsp;{selectedDay?.wind?.speed}&nbsp;m/s</p>
                    </div>

                </div>

                <div className="row foreCastDaysRow">
                    {props?.foreCastData?.foreCast?.forecastFiveDays.map((info: any, index: number) => {
                        return <div key={index} className={info.day == selectedDay?.day ? "cardDayWithborder" : "cardDay"} onClick={() => handleSelectedDayForeCast(info)} >
                            <p>{info.day}</p>
                            <img src={getIcon(info.weather.icon)} alt="weatherstatus" /><br />
                            <span>{Math.trunc(info.temp.temp_max)}&nbsp;<span>&#176;</span></span> <span>{Math.trunc(info.temp.temp_min)}&nbsp;<span>&#176;</span></span>
                        </div>
                    })}
                </div>
            </> : ""}
        </>
    )
}
export default connect(mapStateToProps, mapDispatchToProps)(Forecast)