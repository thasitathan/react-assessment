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
import { PROVINCES } from "../../constants";
import { setResidentialAddress } from "./residentialAddressSlice";

export function ResidentialAddressInputForm({ nextPage }) {
  const dispatch = useDispatch();
  const { residentialAddress } = useSelector((state) => state);
  const [streetNum, setStreetNum] = useState(residentialAddress.streetNum);
  const [streetName, setStreetName] = useState(residentialAddress.streetName);
  const [city, setCity] = useState(residentialAddress.city);
  const [prov, setProv] = useState(residentialAddress.prov);
  const [code, setCode] = useState(residentialAddress.code);
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    if (streetNum && streetName && city && prov && code) {
      setDisableNext(false);
    } else setDisableNext(true);
  }, [streetNum, streetName, city, prov, code, dispatch]);

  const handleClick = (ifNext) => {
    dispatch(
      setResidentialAddress({ streetNum, streetName, city, prov, code })
    );
    ifNext && nextPage();
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formResidentialAddress">
        <Form.Label>Residential Address</Form.Label>
        <br></br>
        {/* street num sometimes have characters, so allowing any string input */}
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
          </Col>
        </Row>

        <TextInputField
          label="Postal Code"
          value={code}
          onChangeFnc={setCode}
          valueLength={6}
        />
      </Form.Group>
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
