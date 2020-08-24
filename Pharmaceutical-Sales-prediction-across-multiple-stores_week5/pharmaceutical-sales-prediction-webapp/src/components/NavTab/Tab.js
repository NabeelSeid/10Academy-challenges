import React, { Component } from "react";
import classNames from "classnames";

class Tab extends Component {
  render() {
    const { active } = this.props;

    var linkClass = classNames("nav-link", {
      active: active,
    });

    return (
      <li className="nab-item" role="presentation">
        <a
          className={linkClass}
          id={this.props.id + "-tab"}
          data-toggle="tab"
          href={"#" + this.props.id}
          role="tab"
          aria-controls={this.props.id + "-tab"}
          aria-selected="false"
        >
          {this.props.name}
        </a>
      </li>
    );
  }
}

export default Tab;
