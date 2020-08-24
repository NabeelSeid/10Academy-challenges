import React, { Component } from "react";
import classNames from "classnames";

class TabContent extends Component {
  render() {
    const { active } = this.props;

    var tabContentClass = classNames("tab-pane", "fade", {
      active: active,
      show: active,
    });

    return (
      <div
        className={tabContentClass}
        id={this.props.id}
        role="tabpanel"
        aria-labelledby={this.props.id + "-tab"}
      >
        {this.props.children}
      </div>
    );
  }
}

// TabContent.defaultProps = {
//   acive: false,
// };

export default TabContent;
