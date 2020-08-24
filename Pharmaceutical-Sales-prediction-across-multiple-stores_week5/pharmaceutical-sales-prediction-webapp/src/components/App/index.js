import React, { Component } from "react";
import axios from "axios";
// import "./index.css";

// FontAwesome
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//COMPONENTS
import NavTab from "../NavTab";

const Loading = () => (
  <div class="container h-100 p-5 mt-5">
    <div class="row h-100 justify-content-center align-items-center">
      <label>
        <FontAwesomeIcon icon={faSpinner} spin={true} size="lg" />
        &nbsp;Loading...
      </label>
    </div>
  </div>
);

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      weeksToPredict: null,
      forecast1: [],
      forecastA: [],
      forecastB: [],
      forecastC: [],
      forecastD: [],
      isLoading: true,
    };
  }

  predict = (weekNum) => {
    this.setState({ isLoading: true });

    // const url = "./predict";
    var bodyFormData = new FormData();
    bodyFormData.append("weeks", weekNum);
    console.log(weekNum);
    axios({
      method: "post",
      url: "/predict",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
      timeout: 600000,
    })
      .then((result) => console.log(result.data))
      .catch((error) => this._isMounted && this.setState({ error }));
  };

  onSearchSubmit = (event) => {
    const { weeksToPredict } = this.state;
    this.setState({ searchKey: weeksToPredict, view: "loading" });

    this.predict(weeksToPredict);

    event.preventDefault();
  };

  onSearchChange = (event) => {
    this.setState({ weeksToPredict: event.target.value });
  };

  updateForecast = (data) => {
    this.setState({
      forecast1: JSON.parse(data["forecast1"]),
      forecastA: JSON.parse(data["forecastA"]),
      forecastB: JSON.parse(data["forecastB"]),
      forecastC: JSON.parse(data["forecastC"]),
      forecastD: JSON.parse(data["forecastD"]),
    });
  };

  fetchCache = () => {
    axios("/api/cached")
      .then((result) => this.updateForecast(result.data))
      .catch((error) => this._isMounted && this.setState({ error }));
  };

  componentDidMount() {
    this.fetchCache();
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 5000);
  }
  render() {
    const {
      isLoading,
      forecast1,
      forecastA,
      forecastB,
      forecastC,
      forecastD,
    } = this.state;

    return (
      <div className="App page">
        {/* Navigation */}
        <nav className="navbar navbar-dark bg-secondary">
          <a className="navbar-brand">Team Sukur</a>
          <form className="form-inline">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Week numbers"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-light my-2 my-sm-0"
              type="submit"
              disabled
            >
              Predict
            </button>
          </form>
        </nav>
        {isLoading ? (
          <Loading />
        ) : (
          <NavTab
            forecast1={forecast1}
            forecastA={forecastA}
            forecastB={forecastB}
            forecastC={forecastC}
            forecastD={forecastD}
          />
        )}
      </div>
    );
  }
}

export default App;
