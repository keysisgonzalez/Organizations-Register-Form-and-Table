import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import "./organizationstable.css";

function OrganizationRow({ aOrg, handleModalDisplay, handleOrgStatus }) {
  const handleInfoClick = () => handleModalDisplay(aOrg);
  const onDisableBtnClick = () => handleOrgStatus(aOrg);

  return (
    <tr className={aOrg.active ? "" : "org-disabled-info"} key={aOrg.id}>
      <td>
        <img src={aOrg.logo} className="org-img" alt="organization logo" />
      </td>
      <td>{aOrg.name}</td>
      <td>{aOrg.headline}</td>
      <td>{aOrg.organizationTypeId.name}</td>
      <td>
        <div className="org-button-container">
          <FontAwesomeIcon
            onClick={handleInfoClick}
            className="btn org-table-btn"
            icon={faInfo}
          />
          <FontAwesomeIcon
            onClick={onDisableBtnClick}
            className={
              aOrg.active
                ? "btn org-table-btn-active"
                : "btn org-table-btn-inactive"
            }
            icon={faPowerOff}
          />
        </div>
      </td>
    </tr>
  );
}

OrganizationRow.propTypes = {
  aOrg: PropTypes.shape({
    id: PropTypes.number.isRequired,
    logo: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    headline: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    organizationTypeId: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  handleModalDisplay: PropTypes.func.isRequired,
  handleOrgStatus: PropTypes.func.isRequired,
};

export default OrganizationRow;
