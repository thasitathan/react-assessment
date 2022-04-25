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
import { TextInputField } from "../TextInputField";
import { PROVINCES, EXCLUDED_PROPERTY_PROV } from "../../constants";
import { setPropertyAddress } from "./propertyAddressSlice";

export function PropertyAddressInputForm({ nextPage, prevPage }) {
  const dispatch = useDispatch();
  const { propertyAddress } = useSelector((state) => state);
  const [streetNum, setStreetNum] = useState(propertyAddress.streetNum);
  const [streetName, setStreetName] = useState(propertyAddress.streetName);
  const [city, setCity] = useState(propertyAddress.city);
  const [prov, setProv] = useState(propertyAddress.prov);
  const [code, setCode] = useState(propertyAddress.code);
  const [disableNext, setDisableNext] = useState(true);
  // const [goNext, setGoNext] = useState(false);

  useEffect(() => {
    if (
      streetNum &&
      streetName &&
      city &&
      code &&
      prov &&
      !EXCLUDED_PROPERTY_PROV.includes(prov)
    ) {
      setDisableNext(false);
    } else setDisableNext(true);
  }, [streetNum, streetName, city, prov, code, dispatch]);

  const handleClick = (ifNext) => {
    dispatch(setPropertyAddress({ streetNum, streetName, city, prov, code }));
    ifNext && nextPage();
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formPropertyAddress">
        <Form.Label>Property Address</Form.Label>
        <br></br>
        <TextInputField
          label="Street Number"
          value={streetNum}
          onChangeFnc={setStreetNum}
          onlyNumbers
        />
        <TextInputField
          label="Street Name"
          value={streetName}
          onChangeFnc={setStreetName}
          onlyString
        />
        <TextInputField
          label="City"
          value={city}
          onChangeFnc={setCity}
          onlyString
        />

        <Row className="my-2">
          <Col>
            <Form.Label>Province: </Form.Label>
          </Col>
          <Col>
            <DropdownButton title={prov || "Select Province"}>
              {PROVINCES.map((provName) => (
                <Dropdown.Item
                  key={provName}
                  onClick={() => {
                    setProv(provName);
                  }}
                >
                  {provName}
                </Dropdown.Item>
              ))}
            </DropdownButton>
            {prov && EXCLUDED_PROPERTY_PROV.includes(prov) && (
              <div>* cannot select Quebec</div>
            )}
          </Col>
        </Row>

        <TextInputField
          label="Postal Code"
          value={code}
          onChangeFnc={setCode}
          valueLength={6}
        />
      </Form.Group>
      <Button variant="primary" onClick={() => prevPage()}>
        Previous
      </Button>
      <Button
        variant="primary"
        disabled={disableNext}
        onClick={() => handleClick(false)}
      >
        Save
      </Button>
      <Button
        variant="primary"
        disabled={disableNext}
        onClick={() => handleClick(true)}
      >
        Next
      </Button>
    </Form>
  );
}
