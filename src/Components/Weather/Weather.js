import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import LoadingSpinner from '../../LoadingSpinner';

import './Weather.scss';

class Weather extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            weather: [],
            isLoading: true,
            error: null
         }
    }

    async componentDidMount() {
        await axios.get(`http://api.openweathermap.org/data/2.5/forecast?lat=${this.props.lat}&lon=${this.props.long}&APPID=59b00ca946aa0fbe99a7218a649b7168&units=imperial`).then(res => {
            console.log(res.data)
            this.setState({ weather: res.data.list, isLoading: false });
        })
    }

    getDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2){
            day = '0' + day;	
        }
        return [year, month, day].join('');
    }

    getTime = (time) => {
        let splitTime = time.split(':'); // convert to array
        // fetch
        var hours = Number(splitTime[0]);
        var minutes = Number(splitTime[1]);
        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours === 0) {
        timeValue= "12";
        }

        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
        return timeValue
    }


    findWeatherInfoByDay = (arr, cb, cb2) => {
        let dates = [];
        for (let i=0; i<arr.length; i++){
          let dateString = moment(cb(arr[i].dt_txt)).format('MMMM Do YYYY')
        //   console.log('arr[i].dt_txt: ', arr[i].dt_txt.split(' '));
        //   console.log('dateString: ', dateString.split(' '));
          if(dates.some(e => e.day === dateString)){
            dates[dates.findIndex(e => e.day === dateString)].hour.push({
                time: cb2(arr[i].dt_txt.split(' ')[1]),
                minTemp: Math.floor(arr[i].main.temp_min), 
                maxTemp: Math.floor(arr[i].main.temp_max), 
                description: arr[i].weather[0].description, 
                icon: arr[i].weather[0].icon })
          } else {
          dates.push({
            day: dateString,
            hour: [{ 
                time: cb2(arr[i].dt_txt.split(' ')[1]),
                minTemp: Math.floor(arr[i].main.temp_min), 
                maxTemp: Math.floor(arr[i].main.temp_max), 
                description: arr[i].weather[0].description, 
                icon: arr[i].weather[0].icon 
              }]
            })
          }
        }
        console.log('dates: ', dates);
        return dates
      }

    render() { 

        let { findWeatherInfoByDay, getDate, getTime } = this;
        let { weather, isLoading, error } = this.state;
        console.log('weather: ', weather);
        
        let mappedWeather = findWeatherInfoByDay(weather, getDate, getTime).map((day, index) => {
            let mappedDay = day.hour.map((info, index) => {
                    return<div className='weatherInfoBox' key={index}>
                                <h4 id='weatherTime'>{info.time}</h4>
                                <ul className='dropdownContent'>
                                    <li><img alt={info.description} src={`http://openweathermap.org/img/w/${info.icon}.png`}></img></li>
                                    <li id='weatherText'>High: {info.maxTemp}°F</li>
                                    <li id='weatherText'>Low: {info.minTemp}°F</li>
                                    <li id='weatherText'>{info.description}</li>
                                </ul>
                             
                            </div>
                })
                return<div className='weatherMain' key={index}>
                <h3>{day.day}</h3>
                <div className='mappedDayBox'>{mappedDay}</div>
                
            </div>
        })
        
        return ( 
            <div className='weatherTableContainer'>

                {error
                    ?
                    <div> Oh no!There was an error loading the trails.Please try again later. </div>
                    : (isLoading || !this.state.weather.length) ?
                    <LoadingSpinner />
                    : mappedWeather
                    } 
            </div>
         );
    }
}
 
export default Weather;