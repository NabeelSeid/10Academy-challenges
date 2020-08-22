import React, { Component } from "react";
import axios from "axios";
import "./index.css";

// FontAwesome
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//COMPONENTS
import Search from "../Search";
import Table from "../Table";
import Button from "../Button";
// import Button from "../Button";

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
      view: "dashboard",
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

  viewDashboard = () => {
    this.setState({ view: "dashboard" });
  };

  viewPlot = () => {
    axios("/time").then((result) => console.log(result.data));
    this.setState({ view: "plot" });
  };

  list = [
    {
      ds: 1357084800000,
      trend: 4982.8850574483,
      yhat_lower: 3908.4942708652,
      yhat_upper: 7114.5923467278,
      trend_lower: 4982.8850574483,
      trend_upper: 4982.8850574483,
      additive_terms: 497.1494742392,
      additive_terms_lower: 497.1494742392,
      additive_terms_upper: 497.1494742392,
      holidays: 416.1916644573,
      holidays_lower: 416.1916644573,
      holidays_upper: 416.1916644573,
      school_holiday: 416.1916644573,
      school_holiday_lower: 416.1916644573,
      school_holiday_upper: 416.1916644573,
      state_holiday: 0,
      state_holiday_lower: 0,
      state_holiday_upper: 0,
      weekly: -265.7842282004,
      weekly_lower: -265.7842282004,
      weekly_upper: -265.7842282004,
      yearly: 346.7420379823,
      yearly_lower: 346.7420379823,
      yearly_upper: 346.7420379823,
      multiplicative_terms: 0,
      multiplicative_terms_lower: 0,
      multiplicative_terms_upper: 0,
      yhat: 5480.0345316875,
    },
    {
      ds: 1357171200000,
      trend: 4981.6018824527,
      yhat_lower: 3798.7234155821,
      yhat_upper: 7033.9587786525,
      trend_lower: 4981.6018824527,
      trend_upper: 4981.6018824527,
      additive_terms: 288.7462428359,
      additive_terms_lower: 288.7462428359,
      additive_terms_upper: 288.7462428359,
      holidays: 416.1916644573,
      holidays_lower: 416.1916644573,
      holidays_upper: 416.1916644573,
      school_holiday: 416.1916644573,
      school_holiday_lower: 416.1916644573,
      school_holiday_upper: 416.1916644573,
      state_holiday: 0,
      state_holiday_lower: 0,
      state_holiday_upper: 0,
      weekly: -362.0918193023,
      weekly_lower: -362.0918193023,
      weekly_upper: -362.0918193023,
      yearly: 234.6463976809,
      yearly_lower: 234.6463976809,
      yearly_upper: 234.6463976809,
      multiplicative_terms: 0,
      multiplicative_terms_lower: 0,
      multiplicative_terms_upper: 0,
      yhat: 5270.3481252886,
    },
    {
      ds: 1357257600000,
      trend: 4980.3187074572,
      yhat_lower: 3685.3136594941,
      yhat_upper: 7054.2787578388,
      trend_lower: 4980.3187074572,
      trend_upper: 4980.3187074572,
      additive_terms: 428.6629890838,
      additive_terms_lower: 428.6629890838,
      additive_terms_upper: 428.6629890838,
      holidays: 416.1916644573,
      holidays_lower: 416.1916644573,
      holidays_upper: 416.1916644573,
      school_holiday: 416.1916644573,
      school_holiday_lower: 416.1916644573,
      school_holiday_upper: 416.1916644573,
      state_holiday: 0,
      state_holiday_lower: 0,
      state_holiday_upper: 0,
      weekly: -119.2756101545,
      weekly_lower: -119.2756101545,
      weekly_upper: -119.2756101545,
      yearly: 131.746934781,
      yearly_lower: 131.746934781,
      yearly_upper: 131.746934781,
      multiplicative_terms: 0,
      multiplicative_terms_lower: 0,
      multiplicative_terms_upper: 0,
      yhat: 5408.981696541,
    },
    {
      ds: 1357344000000,
      trend: 4979.0355324616,
      yhat_lower: 4065.7349057098,
      yhat_upper: 7354.6601624075,
      trend_lower: 4979.0355324616,
      trend_upper: 4979.0355324616,
      additive_terms: 728.3387120951,
      additive_terms_lower: 728.3387120951,
      additive_terms_upper: 728.3387120951,
      holidays: 416.1916644573,
      holidays_lower: 416.1916644573,
      holidays_upper: 416.1916644573,
      school_holiday: 416.1916644573,
      school_holiday_lower: 416.1916644573,
      school_holiday_upper: 416.1916644573,
      state_holiday: 0,
      state_holiday_lower: 0,
      state_holiday_upper: 0,
      weekly: 273.0914847189,
      weekly_lower: 273.0914847189,
      weekly_upper: 273.0914847189,
      yearly: 39.0555629189,
      yearly_lower: 39.0555629189,
      yearly_upper: 39.0555629189,
      multiplicative_terms: 0,
      multiplicative_terms_lower: 0,
      multiplicative_terms_upper: 0,
      yhat: 5707.3742445567,
    },
    {
      ds: 1357516800000,
      trend: 4976.4691824705,
      yhat_lower: 3983.3041250369,
      yhat_upper: 7277.4791510317,
      trend_lower: 4976.4691824705,
      trend_upper: 4976.4691824705,
      additive_terms: 653.2389591025,
      additive_terms_lower: 653.2389591025,
      additive_terms_upper: 653.2389591025,
      holidays: 416.1916644573,
      holidays_lower: 416.1916644573,
      holidays_upper: 416.1916644573,
      school_holiday: 416.1916644573,
      school_holiday_lower: 416.1916644573,
      school_holiday_upper: 416.1916644573,
      state_holiday: 0,
      state_holiday_lower: 0,
      state_holiday_upper: 0,
      weekly: 349.8228876393,
      weekly_lower: 349.8228876393,
      weekly_upper: 349.8228876393,
      yearly: -112.775592994,
      yearly_lower: -112.775592994,
      yearly_upper: -112.775592994,
      multiplicative_terms: 0,
      multiplicative_terms_lower: 0,
      multiplicative_terms_upper: 0,
      yhat: 5629.708141573,
    },
  ];

  render() {
    const { weeksToPredict, view, result } = this.state;

    let body;

    if (view == "loading") {
      body = <Loading />;
    }

    if (view == "dashboard") {
      body = (
        <div>
          <Table list={this.list} />
        </div>
      );
    }

    if (view == "plot") {
      body = <img src="/plot" />;
    }

    return (
      <div className="App page">
        <Search
          value={weeksToPredict}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          placeholder="Week number"
        >
          {/* Components can also be passed to another Component via props */}
          Predict
        </Search>
        <Button className="button-margin" onClick={this.viewDashboard}>
          Dashboard
        </Button>
        <Button className="button-margin" onClick={this.viewPlot}>
          Graphs
        </Button>

        <div className="interactions">{body}</div>
      </div>
    );
  }
}

export default App;
