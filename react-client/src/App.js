import './App.css';
import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import axios from 'axios'

class App extends Component {
  state = {
    result: false,
    error:"",
    type: "",
    id: null,
    response: "",
    allow: false
  }

  componentWillMount() {
    if (prompt("Enter password") !== "mamrez")
      window.location = "https://sabacontest.ir/";
  }

  handleScan = data => {
    if (data) {
      data = JSON.parse(data)
      if(this.checkData(data)){
        this.setState({
          result: `Name: ${data.name}`,
          id: data.id,
          error: "",
          response: false
        })
      } else {
        this.setState({
          error: "Invalid data"
        })
      }
    }
  }

  checkData = (data) => data.hasOwnProperty("id") && data.hasOwnProperty("name")

  handleError = err => {
    console.error(err)
  }

  handleChange = (event) => {
    this.setState({type: event.target.value, error: ""});
  }

  handleSubmit = (event) => {
    const {id, type} = this.state
    if(type && type !== "") {
      axios.post('https://sabaqr.liara.run/api/v1/set', {
        id: id,
        type: type
      })
      .then((response) => {
        console.log(response)
        response = response.data
        if(response.success) {
          this.setState({result: false, response: "Contestant currently have: Package: " + response.contestant.package + " / Sabatalk: " + response.contestant.sabatalk + " / First Launch: " + response.contestant.first_day_launch + " / Second Day enter: " + response.contestant.second_day + " / Second Launch: " + response.contestant.second_day_launch + " / FathAbad enter: " + response.contestant.fatabad_login + " / FathAbad exit: " + response.contestant.fatabad_logout})
        } else
          this.setState({response: response.error})
      })
      .catch((error) => {
        console.log(error)
        this.setState({response: "Faced an error"})
      })

      this.setState({error: "Processing...", response: ""})
    } else
      this.setState({error: "First select the type"})
    event.preventDefault()
  }

  render() {
    return (
      <div className="App">
        <QrReader
          delay={300}
          onError={this.handleError}
          onScan={this.handleScan}
          style={{ width: '100%'}}
        />
        <div style={{margin: '2%'}} >
          <form onSubmit={this.handleSubmit}>
            <br/>
            <select value={this.props.type} onChange={this.handleChange}>
              <option value="">Select</option>
              <option value="package">Package</option>
              <option value="sabatalk">Sabatalk</option>
              <option value="first_day_launch">First day launch</option>
              <option value="second_day">Second day enter</option>
              <option value="second_day_launch">Second day launch</option>
              <option value="fatabad_login">FathAbad enter</option>
              <option value="fatabad_logout">FathAbad exit</option>
            </select>
            {this.state.result === false ?
              <p>Waiting to scan...</p>
            :
              <div>
                <br/>
                <p>{this.state.result}</p>
                <p>{this.state.error}</p>
                <br/>
                <input className="button" type="submit" value="Submit"  />
              </div>
            }
          </form>
          {this.state.response &&
            <p style={{color:"#1976d2"}} >Response:<br/>{this.state.response}</p>
          }
        </div>
      </div>
    )
  }
}

export default App;
