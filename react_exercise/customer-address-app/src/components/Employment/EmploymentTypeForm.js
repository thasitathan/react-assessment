import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  Button,
  Dropdown,
  DropdownButton,
  Row,
  Col,
} from "react-bootstrap";
import { setEmploymentData } from "./employmentSlice";
import { EMPLOYMENT_TYPES } from "../../constants";

export function EmploymentTypeForm({ nextPage, prevPage }) {
  // this is the page which lets user pick their employment type (student, retired, employed)
  const dispatch = useDispatch();
  const {
    employment: { employmentType },
  } = useSelector((state) => state);

  const [disableNext, setDisableNext] = useState(true);
  const [curEmploymentType, setEmploymentType] = useState(employmentType);

  useEffect(() => {
    if (curEmploymentType === "Employed") setDisableNext(false);
    else setDisableNext(true);
  }, [curEmploymentType]);

  const handleNextClick = () => {
    dispatch(setEmploymentData({ employmentType: curEmploymentType }));
    nextPage();
  };

  return (
    <Form>
      <Row className="my-2">
        <Col>
          <Form.Label>Employment Type: </Form.Label>
        </Col>
        <Col>
          <DropdownButton title={curEmploymentType || "Select Employment"}>
            {EMPLOYMENT_TYPES.map((type) => (
              <Dropdown.Item
                key={type}
                onClick={() => {
                  setEmploymentType(type);
                }}
              >
                {type}
              </Dropdown.Item>
            ))}
          </DropdownButton>
          {curEmploymentType && curEmploymentType !== "Employed" && (
            <div>* customer must be employed</div>
          )}
        </Col>
      </Row>
      <Button variant="primary" onClick={() => prevPage()}>
        Previous
      </Button>
      <Button
        variant="primary"
        disabled={disableNext}
        onClick={() => handleNextClick()}
      >
        Next
      </Button>
    </Form>
  );
}
