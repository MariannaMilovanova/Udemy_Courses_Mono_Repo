import React, { Component } from 'react';
import Chart from '../components/chart';
import { connect } from 'react-redux';
import GoogleMap from '../components/google_map';
import { Sparklines, SparklinesLine } from 'react-sparklines'

class WheatherList extends Component {

  renderWheather = (cityData) => {
      const name = cityData.city.name;
      const temps = cityData.list.map((item)=>item.main.temp-273.15);
      const pressures = cityData.list.map((item)=>item.main.pressure);
      const humidities = cityData.list.map((item)=>item.main.humidity);
      const lon = cityData.city.coord.lon;
      const lat = cityData.city.coord.lat;

      return (
        <tr key={name}>
          <td><GoogleMap lat={lat} lon={lon} /></td>
          <td><Chart color="orange" units="&deg; C" height={120} data={temps}/></td>
          <td><Chart color="green" units="pHa" height={120} data={pressures}/></td>
          <td><Chart color="black" units="%" height={120} data={humidities}/></td>
        </tr>
      )
    }
  render(){
        return(
         <table className="table table-hover">
            <thead>
                <tr>
                    <th>City</th>
                    <th>Temperature, (K)</th>
                    <th>Pressure, (hPa)</th>
                    <th>Humidity, (%)</th>
                </tr>
            </thead>
             <tbody>
             {this.props.weather.map(this.renderWheather)}
             </tbody>
         </table>
        )
    }
}

function mapStateToProps({ weather }) {
  return { weather };
}
export default connect(mapStateToProps)(WheatherList)