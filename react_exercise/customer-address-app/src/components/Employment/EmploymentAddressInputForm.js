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
import { PROVINCES, EMPTY_ADDRESS } from "../../constants";
import { setEmploymentData } from "./employmentSlice";

export function EmploymentAddressInputForm({
  nextPage,
  prevPage,
  employmentPage,
  setConfirmation,
}) {
  const dispatch = useDispatch();
  const {
    employment: { employmentLocations },
  } = useSelector((state) => state);
  const [streetNum, setStreetNum] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [prov, setProv] = useState("");
  const [code, setCode] = useState("");
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    // page changed so now reset form fields or retrieve correct values from redux

    const currEmploymentAddress =
      employmentPage < employmentLocations.length
        ? { ...employmentLocations[employmentPage] }
        : { ...EMPTY_ADDRESS };

    setStreetNum(currEmploymentAddress.streetNum);
    setStreetName(currEmploymentAddress.streetName);
    setCity(currEmploymentAddress.city);
    setProv(currEmploymentAddress.prov);
    setCode(currEmploymentAddress.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [employmentPage]);

  useEffect(() => {
    if (streetNum && streetName && city && code && prov) {
      setDisableNext(false);
    } else setDisableNext(true);
  }, [streetNum, streetName, city, prov, code, dispatch]);

  const handleClick = (ifNext) => {
    if (employmentPage >= employmentLocations.length) {
      // current page is a new employment and append to employment list
      dispatch(
        setEmploymentData({
          employmentLocations: [
            ...employmentLocations,
            { streetNum, streetName, city, prov, code },
          ],
        })
      );
    } else {
      // employement info was from redux, update redux with current values in case changes
      const newLocations = [...employmentLocations];
      newLocations.splice(employmentPage, 1, {
        streetNum,
        streetName,
        city,
        prov,
        code,
      });

      dispatch(
        setEmploymentData({
          employmentLocations: newLocations,
        })
      );
    }
    ifNext && nextPage();
  };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formEmploymentAddress">
        <Form.Label>Employment Address</Form.Label>
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
      <Button variant="primary" onClick={() => prevPage()}>
        Previous
      </Button>
      <Button
        variant="primary"
        disabled={disableNext}
        onClick={() => {
          employmentPage + 1 === employmentLocations.length
            ? setConfirmation(true)
            : handleClick(false);
        }}
      >
        {employmentPage + 1 === employmentLocations.length
          ? "Confirmation Page"
          : "Save"}
      </Button>
      <Button
        variant="primary"
        disabled={disableNext}
        onClick={() => handleClick(true)}
      >
        {employmentPage + 1 < employmentLocations.length
          ? "Next"
          : "Add Another Employment"}
      </Button>
    </Form>
  );
}
