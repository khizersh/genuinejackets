import React from "react";
import { UncontrolledCollapse, Button, CardBody, Card } from "reactstrap";
import "../../App.css";
const Example = () => (
  <div className="mt-5 d-flex justify-content-center align-items-center w-100 flex-column">
    <h1 className="my-3">Help - frequently asked questions</h1>
    <Button
      className="w-75 text-left outline-none accordionButton"
      id="toggler1"
      style={{ marginBottom: "1rem" }}
    >
      When can I order?
    </Button>
    <UncontrolledCollapse toggler="#toggler1" className="w-75 mb-3">
      <Card>
        <CardBody>
          <p>
            Order around the clock. There are no opening hours on the
            internet.You can place an order online 24 hours a day, 7 days a
            week. You can, of course, also reach us personally via the following
            numbers:
          </p>
          <p>
            <b>Service line + telephone orders:</b>
          </p>
          <p>0049-44 02799929</p>
          <p>Monday to Friday 07.00 am -10.00 pm</p>
          <p>E-mail: service@popken.de</p>
        </CardBody>
      </Card>
    </UncontrolledCollapse>
    <Button
      className="w-75 text-left outline-none accordionButton"
      id="toggler2"
      style={{ marginBottom: "1rem" }}
    >
      How about deliveries abroad?
    </Button>
    <UncontrolledCollapse toggler="#toggler2" className="mb-3 w-75">
      <Card>
        <CardBody>
          <p>
            We are happy to deliver your order abroad. Please, consider,
            however, that in certain instances not only an increased delivery
            charge applies, but also costs for customs and VAT may be added.
            This will be done according to the respective regulations of the
            country the goods are sent to.
          </p>
        </CardBody>
      </Card>
    </UncontrolledCollapse>
    <Button
      className="w-75 text-left outline-none accordionButton"
      id="toggler3"
      style={{ marginBottom: "1rem" }}
    >
      How do I revoke a contract of purchase?
    </Button>
    <UncontrolledCollapse toggler="#toggler3" className="mb-3 w-75">
      <Card>
        <CardBody>
          You have the right to withdraw from this contract within 14 days
          without giving any reason. The withdrawal period will expire after 14
          days from the day on which you acquire, or a third party other than
          the carrier and indicated by you acquires, physical possession of the
          last good. To exercise the right of withdrawal, you must inform us
          Popken Fashion GmbH, Customer Support, Am Waldrand 19, 26180 Rastede
          of your decision to withdraw from this contract by an unequivocal
          statement (e.g. a letter sent by post, fax or e-mail). You may use the
          attached model withdrawal form (Download here), but it is not
          obligatory. To meet the withdrawal deadline, it is sufficient for you
          to send your communication concerning your exercise of the right of
          withdrawal before the withdrawal period has expired.
        </CardBody>
      </Card>
    </UncontrolledCollapse>
  </div>
);

export default Example;
