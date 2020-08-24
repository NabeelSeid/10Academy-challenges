import React, { Component } from "react";

class Table extends Component {
  render() {
    const { forecast } = this.props;
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Trend</th>
            <th scope="col">Lower Sales</th>
            <th scope="col">Sales</th>
            <th scope="col">Upper Sales</th>
            <th scope="col">Weekly</th>
            <th scope="col">Yearly</th>
          </tr>
        </thead>
        <tbody>
          {forecast.map((item) => (
            <tr key={item.ds}>
              <th scope="row">{new Date(item.ds).toDateString()}</th>
              <td>{Math.round(item.trend)}</td>
              <td>{Math.round(item.yhat_lower)}</td>
              <td>{Math.round(item.yhat)}</td>
              <td>{Math.round(item.yhat_upper)}</td>
              <td>{Math.round(item.weekly)}</td>
              <td>{Math.round(item.yearly)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default Table;
