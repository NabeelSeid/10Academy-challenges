import React, { Component } from "react";

import Tab from "./Tab";
import TabContent from "./TabContent";
import Table from "../Table";

class InnerNavTab extends Component {
  render() {
    const { forecast, name } = this.props;

    return (
      <div className="container pt-3">
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <Tab id={name + "dashboard"} name="Dashboard" active={true} />
          <Tab id={name + "salesplot"} name="Sales Plot" />
          <Tab id={name + "trendplot"} name="Trend Plot" />
          <Tab id={name + "holidayplot"} name="Holiday Plot" />
          <Tab id={name + "weeklyplot"} name="Weekly Plot" />
          <Tab id={name + "yearlyplot"} name="Yearly Plot" />
        </ul>
        <div className="tab-content" id="myTabContent">
          <TabContent id={name + "dashboard"} active={true}>
            <Table forecast={forecast} />
          </TabContent>
          <TabContent id={name + "salesplot"}>
            <img src={"api/plot/" + name + "/sales"} />
          </TabContent>
          <TabContent id={name + "trendplot"}>
            <img src={"api/plot/" + name + "/trend"} />
          </TabContent>
          <TabContent id={name + "holidayplot"}>
            <img src={"api/plot/" + name + "/holiday"} />
          </TabContent>
          <TabContent id={name + "weeklyplot"}>
            <img src={"api/plot/" + name + "/weekly"} />
          </TabContent>
          <TabContent id={name + "yearlyplot"}>
            <img src={"api/plot/" + name + "/yearly"} />
          </TabContent>
        </div>
      </div>
    );
  }
}

export default InnerNavTab;
