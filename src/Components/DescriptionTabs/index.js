import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Table } from "reactstrap";
import "react-tabs/style/react-tabs.css";
import Skeleton from "react-loading-skeleton";
const index = ({ detail }) => {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>DESCRIPTION</Tab>
          {/* <Tab>ADDITIONAL INFORMATION</Tab> */}
          <Tab>REVIEWS (0)</Tab>
        </TabList>

        <TabPanel className="mt-5">
          <h2 className="pb-4 product-description-tab">Description</h2>
          {!detail?.description ? (
            <Skeleton className="description_Skeleton" height={100} />
          ) : (
            <p>{detail?.description}</p>
          )}
        </TabPanel>

        <TabPanel>
          <h2 className="pb-4 product-description-tab">Reviews</h2>
          <p>There are no reviews yet.</p>
          <p style={{ letterSpacing: "2px" }}>
            Be the first to review “Minty Dress
          </p>
          <p>
            You must be <span style={{ color: "#337ab7" }}>logged in</span> to
            post a review
          </p>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default index;
