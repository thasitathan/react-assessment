import React, { useState } from "react";
import { Row, Col, Form } from "react-bootstrap";

export function TextInputField({
  label,
  onChangeFnc,
  value,
  onlyNumbers,
  onlyString,
  valueLength,
}) {
  const [error, setError] = useState(false);
  const checkIfValid = (value) => {
    if (onlyNumbers) {
      if (isNaN(value)) {
        setError(true);
        return false;
      }
    }
    if (onlyString) {
      const hasNumber = /\d/; // regex to check if string has a number
      if (hasNumber.test(value)) {
        setError(true);
        return false;
      }
    }
    if (value.length > valueLength) {
      return false;
    }
    setError(false);
    return true;
  };

  return (
    <Row className="my-2">
      <Col>
        <Form.Label>{label}: </Form.Label>
      </Col>
      <Col>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder={`Enter ${label}`}
            onChange={({ target: { value } }) =>
              checkIfValid(value) && onChangeFnc(value)
            }
            value={value}
            isInvalid={error}
          />
          <Form.Control.Feedback type="invalid" tooltip>
            Please enter a valid value
          </Form.Control.Feedback>
        </Form.Group>
      </Col>
    </Row>
  );
}
