import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Table } from "reactstrap";
import "react-tabs/style/react-tabs.css";
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
          <p>{detail?.description}</p>
        </TabPanel>
        {/* <TabPanel>
          <h2 className="pb-4 product-description-tab">
            Additional Information
          </h2>
          <Table bordered>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Table>
        </TabPanel> */}
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
