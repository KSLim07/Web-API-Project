import React, { Component } from 'react';
import './App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import axios from 'axios';
import Popup from 'react-popup';
import './Popup.css';
import{Navbar, Button, NavbarBrand} from 'reactstrap';
import Weather from './Weather';
import Example from  './Example';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      search : '',
      data : [],
      loading: false,
      weather: null
    };
    this.search = this.search.bind(this);
    this.onClick2 = this.onClick2.bind(this);
    this.getAll()
  }

  search(){
    if(this.state.loading === true){
      this.state.loading = false;
      axios.get(`/getWeather?city=${this.state.search}`)
      .then(res => {
        var array2 = res.data;
        var len = this.state.data.length
        this.state.data[len] = array2
        this.setState({data:this.state.data});
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  getAll(){
    axios.get(`/getAll`)
      .then(res => {
        this.state.data= res.data;
        this.setState({data:this.state.data});
      })
      .catch(error => {
        console.log(error);
      });
  }
  deleteRecord(id){
    axios.get(`/deleteOne?id=`+id)
    .then(res => {
      this.getAll();
      // this.state.data= res.data;
      // this.setState({data:this.state.data});
    })
    .catch(error => {
      console.log(error);
    });
  }
  handleChange(event) {
    var val = event.target.value
    this.setState({search: val});
  }

  onClick2(){
    this.state.loading = true;
    this.search('1')
  }
  render() {

    return (
      <Router >
        <Switch> <Route path="/history" component={Example}/></Switch>
        <Navbar bg="dark" variant="dark">
          <NavbarBrand href="/">Weather App</NavbarBrand>
        </Navbar>
      <div className="App">

        <div className="jumbotron text-center header">
          <h1>Weather</h1>
          <p>Search for current weather</p>
        </div>
        <div className="container search">
          <div className="col-sm-12">
            <p />
            <form>
              <label>Enter city name:</label>
              <input
                type="text"
                className="form-control"
                value={this.state.search}
                onChange={(e)=>this.handleChange(e)}
              />
              <p />
              <Button color="primary" onClick={this.onClick2}>Search </Button>
            </form>
            <p />
          </div>
          <div>
            <Popup /> 
          </div>
        </div>

        <div className="container">
          <div className="col-sm-12">
            <p />
            <ReactTable  
              data={this.state.data}
              columns={[
                {
                  Header: 'Delete',
                  accessor: 'title',
                  Cell: row => (
                    <a onClick={() => {
                      console.log(row.original._id);
                        this.deleteRecord(row.original._id);
                      }}
                    >
                      Delete
                    </a>
                  )
                },
                {
                  Header: 'City',
                  Cell: row => {
                    return (
                      <div>
                         <p> {row.original.name}</p>
                      </div>
                    );
                  }
                },
                {
                  Header: 'Temperature',
                  Cell: row => {
                    return (
                      <div>
                         <p> {row.original.temp}&deg;C</p>
                      </div>
                    );
                  }
                },
                {
                  Header: 'Wind Speed',
                  Cell: row => {
                    return (
                      <div>
                         <p> {row.original.speed} km/h</p>
                      </div>
                    );
                  }
                },
                {
                  Header: 'Pressure',
                  Cell: row => {
                    return (
                      <div>
                         <p> {row.original.pressure} hPa</p>
                      </div>
                    );
                  }
                },
                {
                  Header: 'Humidity',
                  Cell: row => {
                    return (
                      <div>
                         <p> {row.original.humidity} %</p>
                      </div>
                    );
                  }
                },
                {
                  Header: 'Minmum Temperature',
                  Cell: row => {
                    return (
                      <div>
                         <p> {row.original.temp_min} &deg;C</p>
                      </div>
                    );
                  }
                },
                {
                  Header: 'Maximum Temperature',
                  Cell: row => {
                    return (
                      <div>
                         <p> {row.original.temp_max} &deg;C</p>
                      </div>
                    );
                  }
                },
                {
                  Header: 'Cloudiness',
                  Cell: row => {
                    return (
                      <div>
                         <p> {row.original.all} %</p>
                      </div>
                    );
                  }
                }
              ]}
              defaultPageSize={5}
              className="-striped -highlight"
            />
          </div>
        </div>
        <Weather data={this.state.weather}/>
      </div>
      </Router>
    );
  }
}

export default App;
