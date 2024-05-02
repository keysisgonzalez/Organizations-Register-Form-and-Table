import React, { useState, useEffect } from "react";
import debug from "sabio-debug";
import toastr from "toastr";
import organizationsService from "services/organizationsService";
import lookUpService from "services/lookUpService";
import { mapLookUpItem } from "helpers/utils";
import "./organizationstable.css";
import Modal from "react-bootstrap/Modal";
import { Fade } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import OrganizationRow from "./OrganizationRow";

const _logger = debug.extend("OrganizationsTable");

function OrganizationsTable() {
  const [orgData, setOrgData] = useState({
    arrayOfOrgs: [],
    orgComponents: [],
    modal: [],
    search: "",
    orgType: "0",
    isActive: "0",
    arrayOfTypeList: [],
  });

  const [paginateData, setPaginateData] = useState({
    currentPage: 1,
    totalPages: 1,
  });

  const [selectedOrg, setSelectedOrg] = useState({
    organizationTypeId: "",
    name: "",
    headline: "",
    description: "",
    logo: null,
    locationInfo: "",
    phone: "",
    siteUrl: "",
  });

  const [lookupData, setLookupData] = useState({
    organizationType: [],
    mappedOrgType: [],
  });

  const [modalShow, setModalShow] = useState(false);

  const [orgFilterTracks, setOrgFilterTracks] = useState({
    orgTypeTrack: "0",
    orgStatusTrack: "0",
  });

  useEffect(() => {
    getOrganizations(paginateData.currentPage);

    const onLookUpSuccess = (response) => {
      let organizationType = response.item.organizationTypes;

      setLookupData((prevState) => {
        const newState = { ...prevState };
        newState.organizationType = organizationType;
        newState.mappedOrgType = organizationType.map(mapLookUpItem);
        return newState;
      });
      const mapperTypeList = (typeListObj) => {
        return typeListObj.name;
      };

      let modifiedOrganizationType = [{ name: "type" }, ...organizationType];
      setOrgData((prevState) => {
        const newState = { ...prevState };
        newState.arrayOfTypeList = modifiedOrganizationType.map(mapperTypeList);
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

  useEffect(() => {
    if (orgData.orgType === "0" && orgData.isActive === "0") {
      getOrganizations(paginateData.currentPage);
    } else if (orgData.orgType !== "0") {
      getOrganizationsByType(orgData.orgType, paginateData.currentPage);
    } else {
      getOrganizationsByStatus(orgData.isActive, paginateData.currentPage);
    }
  }, [orgData.orgType, orgData.isActive, paginateData.currentPage]);

  const getOrganizations = (page) => {
    const index = page - 1;

    if (
      orgFilterTracks.orgTypeTrack === "0" &&
      orgFilterTracks.orgStatusTrack === "0"
    ) {
      organizationsService
        .getAllOrg(index, 10)
        .then(onGetAllOrgSuccess)
        .catch(onGetAllOrgError);
    } else {
      if (orgFilterTracks.orgStatusTrack === "0") {
        getOrganizationsByType(orgFilterTracks.orgTypeTrack, page);
      } else {
        getOrganizationsByStatus(orgFilterTracks.orgStatusTrack, page);
      }
    }
  };

  const onGetAllOrgSuccess = (response) => {
    let orgsArray = response.item.pagedItems;
    let totalItems = response.item.totalCount;
    let orgTotalPages = Math.ceil(totalItems / 10);

    setOrgData((prevState) => {
      const newState = { ...prevState };
      newState.arrayOfOrgs = orgsArray;
      newState.orgComponents = orgsArray.map(mapOrgs);
      return newState;
    });

    setPaginateData((prevState) => {
      let newState = { ...prevState };
      newState.totalPages = orgTotalPages;
      return newState;
    });
  };

  const onGetAllOrgError = (error) => {
    _logger("onGetAllOrgError: ", error);
    toastr.error("An error has occurred.");
  };

  const orgRerender = () => {
    if (orgData.orgType === "0" && orgData.isActive === "0") {
      getOrganizations(paginateData.currentPage);
    } else if (orgData.orgType !== "0") {
      getOrganizationsByType(orgData.orgType, paginateData.currentPage);
    } else {
      getOrganizationsByStatus(orgData.isActive, paginateData.currentPage);
    }
  };

  const onDisableOrgSuccess = (response) => {
    _logger("onDisableOrgSuccess: ", response);
    if (orgData.search !== "") {
      onSearchBtnClicked(paginateData.currentPage);
    } else {
      orgRerender();
    }
  };

  const onDisableOrgError = (error) => {
    _logger("onDisableOrgError", error);
    toastr.error("An error has occurred, please try again.");
  };

  const onUpdateOrgSuccess = (response) => {
    _logger("onUpdateOrgSuccess: ", response);
    if (orgData.search !== "") {
      onSearchBtnClicked(paginateData.currentPage);
    } else {
      orgRerender();
    }
  };

  const onUpdateOrgError = (error) => {
    _logger("onUpdateOrgError", error);
    toastr.error("An error has occurred, please try again.");
  };

  const handleClose = () => setModalShow(false);

  const onSearchFieldChanged = (e) => {
    e.preventDefault();
    const newValue = e.target.value;

    setOrgData((prevState) => {
      const newState = { ...prevState };
      newState.search = newValue;

      return newState;
    });

    if (newValue === "") {
      getOrganizations(paginateData.currentPage);
    }
  };

  const onSearchBtnClicked = (page) => {
    const index = page - 1;

    organizationsService
      .getOrgByName(index, 10, orgData.search)
      .then(onGetOrgByNameSuccess)
      .catch(onGetOrgByNameError);
  };

  const handleSearchButtonClick = () => {
    onSearchBtnClicked(1);
  };

  const onSearchFieldKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearchBtnClicked(1);
    }
  };

  const onGetOrgByNameSuccess = (response) => {
    const orgsArray = response.item.pagedItems;
    let totalItems = response.item.totalCount;
    let orgTotalPages = Math.ceil(totalItems / 10);

    setOrgFilterTracks((prevState) => ({
      ...prevState,
      orgTypeTrack: "0",
      orgStatusTrack: "0",
    }));

    setOrgData((prevState) => {
      const newState = { ...prevState };
      newState.arrayOfOrgs = orgsArray;
      newState.isActive = "0";
      newState.orgType = "0";
      newState.orgComponents = orgsArray.map(mapOrgs);

      return newState;
    });

    setPaginateData((prevState) => {
      let newState = { ...prevState };
      newState.totalPages = orgTotalPages;
      newState.currentPage = response.item.pageIndex + 1;
      return newState;
    });
  };

  const onGetOrgByNameError = (error) => {
    _logger("onGetOrgByNameError", error);
    toastr.error("An error has occurred, please try again.");
  };

  const onDropdownIsActiveChange = (e) => {
    const value = e.target.value;

    setOrgFilterTracks((prevState) => ({
      ...prevState,
      orgStatusTrack: value,
    }));

    setOrgData((prevState) => {
      const newState = { ...prevState };
      newState.isActive = value;
      newState.orgType = "0";
      newState.search = "";
      return newState;
    });

    if (value === "0") {
      setPaginateData((prevState) => {
        let newState = { ...prevState };
        newState.currentPage = 1;
        return newState;
      });
      getOrganizations(1);
    } else {
      getOrganizationsByStatus(value, 1);
    }
  };

  const getOrganizationsByStatus = (isActive, page) => {
    const index = page - 1;
    organizationsService
      .getOrgByStatus(index, 10, isActive)
      .then(onGetOrgByStatusSuccess)
      .catch(onGetOrgByStatusError);
  };

  const onGetOrgByStatusSuccess = (response) => {
    const orgsArray = response.item.pagedItems;
    let totalItems = response.item.totalCount;
    let orgTotalPages = Math.ceil(totalItems / 10);

    setOrgFilterTracks((prevState) => ({
      ...prevState,
      orgTypeTrack: "0",
    }));

    setOrgData((prevState) => ({
      ...prevState,
      arrayOfOrgs: orgsArray,
      orgType: "0",
      orgComponents: orgsArray.map(mapOrgs),
    }));

    setPaginateData((prevState) => {
      let newState = { ...prevState };
      newState.totalPages = orgTotalPages;
      newState.currentPage = response.item.pageIndex + 1;
      return newState;
    });
  };

  const onGetOrgByStatusError = (error) => {
    _logger("onGetOrgByStatusError", error);
    toastr.error("An error has occurred, please try again.");
  };

  const getOrganizationsByType = (type, page) => {
    const index = page - 1;

    if (type === "0") {
      getOrganizations(page);
    } else {
      organizationsService
        .getOrgByType(index, 10, orgData.arrayOfTypeList[type])
        .then(onGetOrgByTypeSuccess)
        .catch(onGetOrgByTypeError);
    }
  };

  const onDropdownTypeChange = (e) => {
    const selectedOrgType = e.target.value;

    setOrgFilterTracks((prevState) => ({
      ...prevState,
      orgTypeTrack: selectedOrgType,
    }));

    setOrgData((prevState) => {
      const newState = { ...prevState };
      newState.orgType = selectedOrgType;
      newState.isActive = "0";
      newState.search = "";
      return newState;
    });

    if (selectedOrgType === "0") {
      setPaginateData((prevState) => {
        let newState = { ...prevState };
        newState.currentPage = 1;
        return newState;
      });

      organizationsService
        .getAllOrg(0, 10)
        .then(onGetAllOrgSuccess)
        .catch(onGetAllOrgError);
    } else {
      getOrganizationsByType(selectedOrgType, 1);
    }
  };

  const onGetOrgByTypeSuccess = (response) => {
    const orgsArray = response.item.pagedItems;
    let totalItems = response.item.totalCount;
    let orgTotalPages = Math.ceil(totalItems / 10);

    setOrgFilterTracks((prevState) => ({
      ...prevState,
      orgStatusTrack: "0",
    }));

    setOrgData((prevState) => {
      const newState = { ...prevState };
      newState.arrayOfOrgs = orgsArray;
      newState.isActive = "0";
      newState.orgComponents = orgsArray.map(mapOrgs);

      return newState;
    });

    setPaginateData((prevState) => {
      let newState = { ...prevState };
      newState.totalPages = orgTotalPages;
      newState.currentPage = response.item.pageIndex + 1;
      return newState;
    });
  };

  const onGetOrgByTypeError = (error) => {
    _logger("onGetOrgByTypeError", error);
  };

  const handleModalDisplay = (modalObj) => {
    _logger("INSIDE THE MODAL::::", modalObj);
    setSelectedOrg(modalObj);

    setModalShow(true);
  };

  const handlePageChange = (page) => {
    setPaginateData((prevState) => {
      let newState = { ...prevState };
      newState.currentPage = page;
      return newState;
    });

    if (orgFilterTracks.orgTypeTrack === "0") {
      if (orgFilterTracks.orgStatusTrack === "0") {
        getOrganizations(page);
      } else {
        getOrganizationsByStatus(orgFilterTracks.orgStatusTrack, page);
      }
    } else {
      getOrganizationsByType(orgFilterTracks.orgTypeTrack, page);
    }
  };

  const handleOrgStatus = (orgObj) => {
    _logger("orgObj:::", orgObj);
    if (orgObj.active) {
      organizationsService
        .disableOrg(orgObj.id)
        .then(onDisableOrgSuccess)
        .catch(onDisableOrgError);
    } else {
      const orgPayload = {
        Id: orgObj.id,
        OrganizationTypeId: orgObj.organizationTypeId.id,
        Name: orgObj.name,
        Headline: orgObj.headline,
        Description: orgObj.description,
        Logo: orgObj.logo,
        LocationId: orgObj.locationInfo.id,
        Phone: orgObj.phone,
        SiteUrl: orgObj.siteUrl,
        Active: true,
      };
      organizationsService
        .updateOrg(orgPayload, orgObj.id)
        .then(onUpdateOrgSuccess)
        .catch(onUpdateOrgError);
    }
  };

  const prevPage = () => {
    handlePageChange(paginateData.currentPage - 1);
  };

  const nextPage = () => {
    handlePageChange(paginateData.currentPage + 1);
  };

  const mapOrgs = (aOrg) => {
    return (
      <OrganizationRow
        key={aOrg.id}
        aOrg={aOrg}
        handleModalDisplay={handleModalDisplay}
        handleOrgStatus={handleOrgStatus}
      />
    );
  };

  return (
    <React.Fragment>
      <div className="modal-container">
        <Modal show={modalShow} onHide={handleClose} animation={Fade}>
          <div className="org-modal">
            <Modal.Header className="modal-header" closeButton>
              <Modal.Title>{selectedOrg.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="org-info">
                <img
                  src={selectedOrg.logo}
                  alt="Organization Logo"
                  className="org-modal-logo"
                />
                <div className="org-details">
                  <h4>
                    <strong>Headline:</strong> {selectedOrg.headline}
                  </h4>
                  <p>
                    <strong>Description:</strong> {selectedOrg.description}
                  </p>
                  <p>
                    <strong>Organization type:</strong>{" "}
                    {selectedOrg.organizationTypeId.name}
                  </p>
                  <p>
                    <strong>Location: </strong>
                    {selectedOrg.locationInfo.lineOne}{" "}
                    {selectedOrg.locationInfo.lineTwo}{" "}
                    <p>
                      {selectedOrg.locationInfo.city}
                      {", "}
                      {selectedOrg.locationInfo.state}{" "}
                      {selectedOrg.locationInfo.zip}{" "}
                    </p>
                  </p>
                  <p>
                    <strong>Phone Number:</strong> {selectedOrg.phone}
                  </p>
                  <p>
                    <strong>Site:</strong> {selectedOrg.siteUrl}
                  </p>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>

      <div className="org-main-container">
        <section className="org-table-header">
          <h1> Organizations Information </h1>
        </section>
        <div className="org-filters">
          <div className="org-search-bar">
            <input
              type="text"
              className="form-control"
              id="search"
              placeholder="Search by name..."
              name="search"
              value={orgData.search}
              onChange={onSearchFieldChanged}
              onKeyDown={onSearchFieldKeyPress}
            />

            <button type="submit" onClick={handleSearchButtonClick}>
              <FontAwesomeIcon
                type="button"
                className="org-search-icon"
                icon={faSearch}
              />
            </button>
          </div>

          <div className="org-dropdown-type">
            <select
              className="org-select-type"
              value={orgData.orgType}
              onChange={onDropdownTypeChange}
            >
              <option value={"0"}>Type</option>

              {lookupData.mappedOrgType}
            </select>
          </div>

          <div className="org-dropdown-isActive">
            <select
              className="org-select-isActive"
              value={orgData.isActive}
              onChange={onDropdownIsActiveChange}
            >
              <option value={"0"}>Status</option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
        </div>

        <div className="org-table-container">
          <table className="table org-table-hover mt-3 shadow-lg">
            <thead>
              <tr className="org-bg-headers">
                <th className="table-org-logo" scope="col">
                  Logo
                </th>
                <th scope="col">Name</th>
                <th scope="col">Headline</th>
                <th scope="col">Type</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody className="table-body org-table-body">
              {orgData.orgComponents}
            </tbody>
          </table>
        </div>
        <div className="org-pagination">
          <button
            className="org-pagination-btn-right"
            onClick={prevPage}
            disabled={paginateData.currentPage === 1}
          >
            ←
          </button>
          <span>{paginateData.currentPage}</span> /{" "}
          <span>{paginateData.totalPages}</span>
          <button
            className="org-pagination-btn-left"
            onClick={nextPage}
            disabled={paginateData.currentPage === paginateData.totalPages}
          >
            →
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default OrganizationsTable;
