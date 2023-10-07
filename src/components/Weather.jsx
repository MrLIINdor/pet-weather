import { useState, useEffect } from "react";
import "./Weather.css";

export default function Weather() {
  const [nameCity, setNameCity] = useState("");
  const [dataCiti, setDataCiti] = useState({});
  const KEY = "ffab31f93b27f5216d5b88a6e908a6e7";
  const URL_BASE = "https://api.openweathermap.org/data/2.5/";

  function Deg(deg) {
    if (deg > 1 && deg <= 45) {
      return "Направление ветра: CВ";
    } else if (deg > 45 && deg <= 90) {
      return "Направление ветра: В";
    } else if (deg > 90 && deg <= 135) {
      return "Направление ветра: ЮВ";
    } else if (deg > 135 && deg <= 180) {
      return "Направление ветра: Ю";
    } else if (deg > 180 && deg <= 225) {
      return "Направление ветра: ЮЗ";
    } else if (deg > 225 && deg <= 270) {
      return "Направление ветра: З";
    } else if (deg > 270 && deg <= 315) {
      return "Направление ветра: СЗ";
    } else if (deg > 315 && deg <= 360) {
      return "Направление ветра: С";
    }
  }

  function onChange(text) {
    setNameCity(text.target.value);
  }

  useEffect(() => {
    const updateData = async () => {
      await fetch(`${URL_BASE}weather?q=${nameCity}&units=metric&APPID=${KEY}`)
        .then((res) => res.json())
        .then((result) => {
          setDataCiti(result);
        });
    };

    const timeout = setTimeout(updateData, 500);
    return () => clearTimeout(timeout);
  }, [nameCity]);

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        onChange={onChange}
        placeholder="Поиск..."
      />

      <div className="city">
        {nameCity !== "" ? (
          <div>
            <h2 className="city-name">
              <span>{dataCiti?.name}</span>
              <sup>{dataCiti.sys?.country}</sup>
            </h2>

            <div className="city-temp">
              {dataCiti.main?.temp !== undefined
                ? Math.round(dataCiti.main?.temp)
                : ""}
              <sup> °C</sup>
            </div>

            <div className="info">
              <img
                className="city-icon"
                src={`https://openweathermap.org/img/wn/${dataCiti.weather?.[0].icon}@2x.png`}
                alt=""
              />
              <p>{dataCiti.weather?.[0].description}</p>
              <p>
                {dataCiti.main?.humidity !== undefined
                  ? `Влажность: ${dataCiti.main?.humidity}%`
                  : ""}
              </p>
              <p>
                {dataCiti.wind?.speed !== undefined
                  ? `Скорость ветра: ${dataCiti.wind?.speed} метр/сек`
                  : ""}
              </p>
              <p>{Deg(dataCiti.wind?.deg)}</p>
            </div>
          </div>
        ) : dataCiti?.cod == 404 ? (
          <p className="not-weather">
            К сожелению по данному городу нет информации
          </p>
        ) : (
          <p className="not-weather">Давайте узнаем погоду ввашем городе</p>
        )}
      </div>
    </div>
  );
}
