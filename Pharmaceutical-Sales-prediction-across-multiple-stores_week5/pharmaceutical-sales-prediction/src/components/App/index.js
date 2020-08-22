import React, { Component } from "react";
import axios from "axios";
import "./index.css";

// FontAwesome
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//COMPONENTS
import Search from "../Search";
// import Table from '../Table'
import Button from "../Button";

const Loading = () => (
  <label>
    <FontAwesomeIcon icon={faSpinner} spin={true} size="lg" />
    &nbsp;Loading...
  </label>
);

class App extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      result: null,
      searchKey: "",
      weeksToPredict: null,
      error: null,
      isLoading: false,
    };
  }

  predict = (weeks) => {
    this.setState({ isLoading: true });

    const url = "./predict";
    var bodyFormData = new FormData();
    bodyFormData.append("weeks", weeks);
    axios({ method: "post", url: url, data: bodyFormData })
      .then((result) => console.log(result.data))
      .catch((error) => this._isMounted && this.setState({ error }));
  };

  onSearchSubmit = (event) => {
    const { weeksToPredict } = this.state;
    this.setState({ searchKey: weeksToPredict });

    this.predict(weeksToPredict);

    event.preventDefault();
  };

  onSearchChange = (event) => {
    this.setState({ weeksToPredict: event.target.value });
  };

  render() {
    const { weeksToPredict, result } = this.state;

    return (
      <div className="App page">
        <div className="interactions">
          <div className="interactions">
            <Search
              value={weeksToPredict}
              onChange={this.onSearchChange}
              onSubmit={this.onSearchSubmit}
            >
              {/* Components can also be passed to another Component via props */}
              Search
            </Search>
            <Loading />

            {/* <Button onClick={() => this.predict(1)}>Time</Button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
