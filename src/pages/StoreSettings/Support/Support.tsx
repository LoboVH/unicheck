import React from "react";
import { Row, Col } from "react-bootstrap";

const Support = () => {
  return (
    <div className="generalSettings support">
      <Row>
        <Col lg={12}>
          <h3>Support</h3>
          <p className="mt-5">
            For any queries, please contact us at support@unicus.com
          </p>
          <p>For Premium Support, please upgrade your plan.</p>
        </Col>
      </Row>
    </div>
  );
};

export default Support;
