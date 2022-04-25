import React from "react";
import { useSelector } from "react-redux";
import { Row, Col, Button } from "react-bootstrap";
import { DATA_MAPPING } from "../constants";

export function ConfirmationComponent({ setConfirmation }) {
  // final summary page which diplays all addresses entered by user
  const {
    residentialAddress,
    propertyAddress,
    employment: { employmentLocations },
  } = useSelector((state) => state);

  return (
    <div>
      <div>
        <Row>
          <Col>Residential Address</Col>
        </Row>
        {DATA_MAPPING.map(({ key, label }) => {
          return (
            <Row key={`residential${key}`}>
              <Col>{label}</Col>
              <Col>{residentialAddress[key]}</Col>
            </Row>
          );
        })}
      </div>
      <div>
        <Row>
          <Col>Property Address</Col>
        </Row>
        {DATA_MAPPING.map(({ key, label }) => {
          return (
            <Row key={`property${key}`}>
              <Col>{label}</Col>
              <Col>{propertyAddress[key]}</Col>
            </Row>
          );
        })}
      </div>
      {employmentLocations.map((location, i) => {
        return (
          <div>
            <Row>
              <Col>Employment Address {i + 1}</Col>
            </Row>
            {DATA_MAPPING.map(({ key, label }) => {
              return (
                <Row key={`employment${i}${key}`}>
                  <Col>{label}</Col>
                  <Col>{location[key]}</Col>
                </Row>
              );
            })}
          </div>
        );
      })}
      <Button variant="primary" onClick={() => setConfirmation(false)}>
        Previous
      </Button>
    </div>
  );
}
