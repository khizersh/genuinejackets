import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useParams } from "react-router";
import "react-tabs/style/react-tabs.css";

import PrivacyPolicy from "../../Components/Help/PrivacyPolicy";
import TermsCondition from "../../Components/Help/TermsCondition";
import RefundReturn from "../../Components/Help/RefundReturn";
import FAQ from "../Faq";

import "./style.css";

export default () => {
  const [defaults, setDefault] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setDefault(returnData(id));
    }
  }, [id]);

  function returnData(id) {
    if (id === "faq") {
      return 0;
    } else if (id === "refund&return") {
      return 1;
    } else if (id === "privacy-policy") {
      return 2;
    } else if (id === "term&condition") {
      return 3;
    } else {
      return 0;
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 mt-5">
          {defaults !== null ? (
            <Tabs defaultIndex={defaults}>
              <TabList className="d-flex justify-content-around">
                <Tab>FAQ</Tab>
                <Tab>Refund & Return</Tab>
                <Tab>Privacy Policy</Tab>
                <Tab>Term & Condition</Tab>
              </TabList>

              <TabPanel>
                <FAQ />
              </TabPanel>
              <TabPanel>
                <RefundReturn />
              </TabPanel>
              <TabPanel>
                <PrivacyPolicy />
              </TabPanel>
              <TabPanel>
                <TermsCondition />
              </TabPanel>
            </Tabs>
          ) : null}
        </div>
      </div>
    </div>
  );
};
