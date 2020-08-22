import React, { Component } from "react";
import { sortBy } from "lodash";
import classNames from "classnames";

import Button from "../Button";

import { faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const largeColumn = {
  width: "40%",
};
const midColumn = {
  width: "30%",
};
const smallColumn = {
  width: "10%",
};

class Table extends Component {
  render() {
    const { list } = this.props;

    return (
      <div className="table">
        <div className="table-header">
          <span style={smallColumn}>Date</span>
          <span style={smallColumn}>Trend</span>
          <span style={smallColumn}>Yhat lower</span>
          <span style={smallColumn}>Yhat</span>
          <span style={smallColumn}>Yhat upper</span>
        </div>
        {list.map((item) => (
          <div key={item.ds} className="table-row">
            <span style={smallColumn}>{new Date(item.ds).toDateString()}</span>
            <span style={smallColumn}>{Math.round(item.trend)}</span>
            <span style={smallColumn}>{Math.round(item.yhat_lower)}</span>
            <span style={smallColumn}>{Math.round(item.yhat)}</span>
            <span style={smallColumn}>{Math.round(item.yhat_upper)}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default Table;
