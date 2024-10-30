import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import organizationsService from "services/organizationsService";
import toastr from "toastr";
import { Formik, Form, Field, ErrorMessage } from "formik";
import debug from "sabio-debug";
import "./organizationsform.css";
import lookUpService from "services/lookUpService";
import { mapLookUpItem } from "helpers/utils";
import organizationsSchema from "./organizationSchema";

const _logger = debug.extend("OrganizationsForm");
console.log("");
function OrganizationsForm() {
  const [orgFormData, setOrgFormData] = useState({
    organizationTypeId: "",
    name: "",
    headline: "",
    description: "",
    logo: "",
    locationId: 52,
    phone: "",
    siteUrl: "",
  });

  const [lookupData, setLookupData] = useState({
    organizationType: [],
    mappedOrganizationType: [],
  });

  useEffect(() => {
    const onLookUpSuccess = (response) => {
      _logger("onLookUpSuccess: ", response.item.organizationTypes);
      let organizationType = response.item.organizationTypes;

      setLookupData((prevState) => {
        const newState = { ...prevState };
        newState.organizationType = organizationType;
        newState.mappedOrganizationType = organizationType.map(mapLookUpItem);
        return newState;
      });
    };

    const onLookUpError = (error) => {
      _logger("onLookUpError: ", error);
      toastr.error("An error has occurred, please try again.");
    };

    lookUpService
      .LookUp(["OrganizationTypes"])
      .then(onLookUpSuccess)
      .catch(onLookUpError);
  }, []);

  const handleSubmit = (payload, { resetForm }) => {
    _logger(payload, "Submit button clicked");

    organizationsService
      .addOrganization(payload)
      .then((response) => {
        onSubmitSuccess(response, resetForm);
      })
      .catch(onSubmitError);
  };

  const onSubmitSuccess = (response, resetForm) => {
    _logger("onSubmitSuccess", response);
    toastr.success("Organization successfully added!");
    resetForm();
    setOrgFormData((prevData) => ({
      ...prevData,
      logo: "",
    }));
  };

  const onSubmitError = (error) => {
    _logger("onSubmitError", error);
    toastr.error("An error has occurred, please try again.");
  };

  const navigate = useNavigate();

  const cancelButton = () => {
    navigate("/");
    _logger("Form cancelled");
  };

  return (
    <React.Fragment>
      <div className="org-container mt-5 fs-2">
        <div className="org-row">
          <div className="col">
            <h1 className="org-title"> New organization </h1>
            <Formik
              enableReinitialize={true}
              initialValues={orgFormData}
              onSubmit={handleSubmit}
              validationSchema={organizationsSchema}
            >
              <Form>
                <div className="org-mb-3">
                  <label className="org-label" htmlFor="name">
                    Name
                  </label>
                  <Field
                    id="name"
                    type="text"
                    name="name"
                    className="org-form-field form-control"
                    placeholder="Name"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="org-has-error"
                  />
                </div>

                <div className="org-mb-3">
                  <label className="org-label" htmlFor="headline">
                    Headline
                  </label>
                  <Field
                    id="headline"
                    type="text"
                    name="headline"
                    className="org-form-field form-control"
                    placeholder="Headline"
                  />
                  <ErrorMessage
                    name="headline"
                    component="div"
                    className="org-has-error"
                  />
                </div>

                <div className="org-mb-3">
                  <label className="org-label" htmlFor="description">
                    Description
                  </label>
                  <Field
                    as="textarea"
                    rows={3}
                    name="description"
                    className="org-form-field form-control"
                    placeholder="Description"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="org-has-error"
                  />
                </div>

                <div className="org-mb-3">
                  <label className="org-label" htmlFor="organizationTypeId">
                    Organization Type
                  </label>
                  <Field
                    as="select"
                    name="organizationTypeId"
                    className="org-form-field form-control form-control-sm"
                    defaultValue="select"
                  >
                    <option disabled value="">
                      Select
                    </option>
                    {lookupData.mappedOrganizationType}
                  </Field>
                </div>
                <ErrorMessage
                  name="organizationTypeId"
                  component="div"
                  className="org-has-error"
                />

                <div className="d-none org-mb-3">
                  <label className="org-label" htmlFor="locationId">
                    Location
                  </label>
                  <Field
                    as="select"
                    name="locationId"
                    className="org-form-field form-control form-control-sm"
                    defaultValue="select"
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option key="1" value="1"></option>
                  </Field>
                </div>
                <ErrorMessage
                  name="locationInfo"
                  component="div"
                  className="org-has-error"
                />

                <div className="org-mb-3">
                  <label className="org-label" htmlFor="logo">
                    Upload Logo
                  </label>
                  <Field
                    id="org-logo"
                    type="text"
                    name="logo"
                    className="org-form-field form-control"
                    placeholder="Logo"
                  />

                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="org-has-error"
                  />
                </div>

                <div className="org-mb-3">
                  <label className="org-label" htmlFor="phone">
                    Phone
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    className="org-form-field form-control"
                    placeholder="Phone"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="org-has-error"
                  />
                </div>

                <div className="org-mb-3">
                  <label className="org-label" htmlFor="siteUrl">
                    Site Url
                  </label>
                  <Field
                    type="url"
                    name="siteUrl"
                    className="org-form-field form-control"
                    placeholder="Site Url"
                  />
                  <ErrorMessage
                    name="siteUrl"
                    component="div"
                    className="org-has-error"
                  />
                </div>
                <div className="org-btn-container">
                  <button type="submit" className="btn org-btn">
                    Submit
                  </button>

                  <button
                    type="button"
                    className="btn org-btn"
                    onClick={cancelButton}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default OrganizationsForm;
