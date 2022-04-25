import React, { useState, useMemo } from "react";
import { ResidentialAddressInputForm } from "./Residential/ResidentialAddressInputForm";
import { PropertyAddressInputForm } from "./Property/PropertyAddressInputForm";
import { EmploymentAddressInputForm } from "./Employment/EmploymentAddressInputForm";
import { EmploymentTypeForm } from "./Employment/EmploymentTypeForm";
import { ConfirmationComponent } from "./ConfirmationComponent";

export function InputForm() {
  const [page, setPage] = useState(0);
  const [confirmation, setConfirmation] = useState(false);
  const nextPage = () => setPage(page + 1);
  const prevPage = () => setPage(page - 1);

  const getForm = useMemo(() => {
    if (confirmation)
      return <ConfirmationComponent setConfirmation={setConfirmation} />;
    if (page === 0) {
      return <ResidentialAddressInputForm nextPage={nextPage} />;
    } else if (page === 1) {
      return (
        <PropertyAddressInputForm nextPage={nextPage} prevPage={prevPage} />
      );
    } else if (page === 2) {
      return <EmploymentTypeForm nextPage={nextPage} prevPage={prevPage} />;
    } else {
      return (
        <EmploymentAddressInputForm
          nextPage={nextPage}
          prevPage={prevPage}
          employmentPage={page - 3}
          setConfirmation={setConfirmation}
        />
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, confirmation]);
  return <div>{getForm}</div>;
}
