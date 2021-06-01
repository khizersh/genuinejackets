import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Table } from "reactstrap";
import "react-tabs/style/react-tabs.css";
import Skeleton from "react-loading-skeleton";
const Index = forwardRef(({ detail, indexNumber }, ref) => {
  const [tabIndex, setTabIndex] = useState(0);
  const test = () => {
    setTabIndex(1);
  };
  useImperativeHandle(ref, () => ({
    test() {
      setTabIndex(1);
    },
  }));
  return (
    <div>
      <Tabs
        selectedIndex={tabIndex}
      >
        <TabList>
          <Tab onClick={()=>setTabIndex(0)}>DESCRIPTION</Tab>
          <Tab onClick={()=>setTabIndex(1)}>REVIEWS (0)</Tab>
          <Tab onClick={()=>setTabIndex(2)}>Rating </Tab>
          <Tab onClick={()=>setTabIndex(3)}>Shipping Details </Tab>
        </TabList>

        <TabPanel className="mt-5">
          <h2 className="pb-4 product-description-tab">Description</h2>
          {!detail?.description ? (
            <Skeleton className="description_Skeleton" height={100} />
          ) : (
            <p dangerouslySetInnerHTML={{__html: detail?.description}}></p>
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
        <TabPanel>
          <h2 className="pb-4 product-description-tab">Rating</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            quas ipsam earum fuga deserunt aliquid iste ducimus libero, eum
            molestias sapiente modi vel natus, omnis in. Velit vitae ipsa magnam
            illo. Debitis, ut culpa! Quisquam molestiae unde fuga? Molestiae
            atque illum earum ipsa praesentium qui aut est dolorum recusandae
            harum.
          </p>
        </TabPanel>
        <TabPanel>
          <h2 className="pb-4 product-description-tab">Shipping Details</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            quas ipsam earum fuga deserunt aliquid iste ducimus libero, eum
            molestias sapiente modi vel natus, omnis in. Velit vitae ipsa magnam
            illo. Debitis, ut culpa! Quisquam molestiae unde fuga? Molestiae
            atque illum earum ipsa praesentium qui aut est dolorum recusandae
            harum.
          </p>
        </TabPanel>
      </Tabs>
    </div>
  );
});

export default Index;
