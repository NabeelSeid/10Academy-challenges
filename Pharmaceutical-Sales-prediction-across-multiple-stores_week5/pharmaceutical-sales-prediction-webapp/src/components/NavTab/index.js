import React, { Component } from "react";

import Tab from "./Tab";
import TabContent from "./TabContent";
import InnerNavTab from "./InnerNavTab";

class NavTabs extends Component {
  render() {
    const {
      forecast1,
      forecastA,
      forecastB,
      forecastC,
      forecastD,
    } = this.props;
    return (
      <div className="container pt-5">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <Tab id="store1" name="Store1" />
          <Tab id="storeA" name="Store Type A" />
          <Tab id="storeB" name="Store Type B" />
          <Tab id="storeC" name="Store Type C" />
          <Tab id="storeD" name="Store Type D" />
        </ul>
        <div className="tab-content" id="myTabContent">
          <TabContent active={true}>
            <div className="pt-5">
              <h2 className="text-secondary text-center p-4">
                Heroku has a request timeout limit of 30 sec and the model takes
                more than 3 mins to make a forecast, thus we made a forecast 6
                weeks in advance and cached it. It takes maximum of 10 sec to
                load the forecast. Select Store from navigation tabs to get forecast
                and descriptive plots. <stron>Store1</stron> is a single randome store,
                other options are based on store type. 
              </h2>
            </div>
          </TabContent>
          <TabContent id="store1">
            <InnerNavTab forecast={forecast1} name="store1" />
          </TabContent>
          <TabContent id="storeA">
            <InnerNavTab forecast={forecastA} name="storeA" />
          </TabContent>
          <TabContent id="storeB">
            <InnerNavTab forecast={forecastB} name="storeB" />
          </TabContent>
          <TabContent id="storeC">
            <InnerNavTab forecast={forecastC} name="storeC" />
          </TabContent>
          <TabContent id="storeD">
            <InnerNavTab forecast={forecastD} name="storeD" />
          </TabContent>
        </div>
      </div>
    );
  }
}

export default NavTabs;
