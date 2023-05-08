import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Weather() {
  const [data, setData] = useState();
  const [search, setSearch] = useState("Ha noi");
  const [error, setError] = useState("");
  const getData = async () => {
    const apikey = "e0ddc538b3415427caeb7901218a30dd";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${apikey}`;
    axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        if (error.reponse.status == "404") {
          setError("invaild city name");
        }
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="box">
      <h1>
        Weather <span>App</span>
      </h1>
      <input
        type="text"
        name="search"
        placeholder="Nhập tên thành phố"
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={(e) => {
          if (e.key == "Enter" && search) {
            getData();
            setSearch("");
          }
        }}
        value={search}
      />

      {data && (
        <>
          <h1>
            {" "}
            Temp: <span>{data.main.temp}</span> °C{" "}
          </h1>
          <img
            src={
              `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
            }
            alt="weather"
          ></img>
          <h1>
            City: <span>{data.name}</span>
          </h1>
          <h1>
            Country: <span>{data.sys.country}</span>{" "}
          </h1>
          <h1>
            Temp: <span>{data.weather[0].description}</span>{" "}
          </h1>
        
        </>
      )}
      {error && <h1>{error}</h1>}
    </div>
  );
}
