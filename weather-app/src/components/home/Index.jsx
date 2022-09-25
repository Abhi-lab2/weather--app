import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaSearchLocation } from "react-icons/fa";
import { FaSistrix } from "react-icons/fa";
// import { Charts } from "../components/Charts";
import axios from "axios";
import "./indexmain.css";
import { LineChart, Line, XAxis } from "recharts";
import { Box, Input } from '@chakra-ui/react'
import Graph from "../graph/Graph";
import Linecharts from "../linechart/Linechart";

export const Index = () => {
    const [place, setPlace] = useState("Pune");
    const [data, setData] = useState([]);
    const [searchdata, setSearchdata] = useState("");
    const [dailydata, setDailydata] = useState([]);

    let riseDate = new Date(searchdata.sys?.sunrise * 1000);
    let setDate = new Date(searchdata.sys?.sunset * 1000);

    const sunData = [
        { name: riseDate, sunAct: searchdata.sys?.sunrise, value: 0 },
        { name: "", sunAct: "", value: 5 },
        { name: setDate, sunAct: searchdata.sys?.sunrise, value: 0 },
    ];

    const getPlace = () => {
        try {
            axios
                .get(
                    `https://api.openweathermap.org/data/2.5/weather?q=${place}&appid=32a5bb7b9aa1126387e06acad817149e&units=metric`
                )
                .then((response) => {
                    // lattitude and logitude data
                    sevenDaysData(response.data.coord.lat, response.data.coord.lon);
                    setSearchdata(response.data);
                    console.log("setSearchdata", setSearchdata)
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log("err", err)
        }
    };

    const sevenDaysData = (lat, lon) => {
        try {
            axios
                .get(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=32a5bb7b9aa1126387e06acad817149e&units=metric`
                )
                .then((res) => {
                    console.log(res.data);
                    setData(res.data.daily);
                    setDailydata(res.data.hourly)
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log("err", err)
        }
    };

    useEffect(() => {
        getPlace();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, []);


    return (
        <Box className="container" >
            {/* Search div */}
            <Box className="inputSearch" >
                <FaMapMarkerAlt className="mapIcon" />
                <Input
                    className="input"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    onKeyPress={getPlace}
                    placeholder="city name and hit enter"
                />
                <FaSistrix className="searchIcon" />
            </Box>
            {/* Seven day data div */}
            <Box className="days" style={{ display: 'flex', width: 'auto', justifyContent: 'space-between', overflow: "scroll", gap: "6px", marginTop: '26px', whiteSpace: 'nowrap' }}>
                {data.map((event) => (
                    <Box className='perday' style={{ minWidth: "18%" }}>
                        <p style={{ fontWeight: '700' }}>
                            {/* 1000 starts from sunday */}
                            {new Date(`${event.dt}` * 1000).toLocaleString("en", {
                                weekday: "short",// short names
                            })}
                        </p>
                        <Box className="daily-temp">
                            <p> {Math.round(event.temp.min)}°</p>
                            <p> {Math.round(event.temp.max)}°</p>
                        </Box>
                        <Box className="daily-img">
                            <img
                                src={`https://openweathermap.org/img/wn/${event?.weather[0]?.icon}@2x.png`}
                                alt=""
                            />
                        </Box>
                        {/* To get the first element- rain, sun */}
                        <p className="atm">{event.weather[0]?.main}</p>
                    </Box>
                ))}
            </Box>
            {/* for graph div */}
            <Box className="mapdata">
                <Box className="graph-Box" style={{ display: 'flex', gap: '20px', flexDirection: "column", padding: '0 20px 18px', borderRadius: "6px" }}>
                    <Box className="current-temp-img">
                        <strong>{Math.round(searchdata.main?.temp)}°C</strong>
                        <Box className="current-img">
                            <img
                                src={`https://openweathermap.org/img/wn/${data[0]?.weather[0]?.icon}@2x.png`}
                                alt=""
                            />
                        </Box>
                    </Box>
                    <Graph dailydata={dailydata} />
                </Box>

                <Box className="pyramid-container" style={{ display: "flex", flexDirection: "column", gap: "15px", color: '#2c3e50 ' }}>
                    <Box className="mgh" style={{ display: "flex", justifyContent: "space-between", marginTop: '22px' }}>
                        <Box >
                            <Box className="pressure" style={{ fontWeight: "700" }}>Pressure</Box>
                            <Box>{searchdata.main?.pressure} hpa</Box>
                        </Box>
                        <Box >
                            <Box className="humidity" style={{ fontWeight: "700" }}>Humidity</Box>
                            <Box>{searchdata.main?.humidity} %</Box>
                        </Box>
                    </Box>
                    <Box className="riseSet">
                        <Box>
                            <Box className="sunrise">Sunrise</Box>
                            <Box>{riseDate.toLocaleTimeString()}</Box>
                        </Box>
                        <Box>
                            <Box className="sunset">Sunset</Box>
                            <Box>{setDate.toLocaleTimeString()}</Box>
                        </Box>
                    </Box>
                    <Linecharts sunData={sunData} />
                </Box>
            </Box>

        </Box>
    );
};