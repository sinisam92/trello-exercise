import React from "react";
import DescriptionIcon from "../../assets/icons/description.svg";
import PropTypes from "prop-types";

const Description = ({ thisCard }) => {
  return (
    <>
      <div className="flex-shrink-0">
        <img src={DescriptionIcon} alt="description icon" />
      </div>
      <div>
        <h2 className="mb-3">Description</h2>
        {thisCard.description ? (
          <div className="break-all">
            <div
              dangerouslySetInnerHTML={{ __html: thisCard.description }}
            ></div>
          </div>
        ) : (
          <p>No description.</p>
        )}
      </div>
    </>
  );
};

export default Description;

Description.propTypes = {
  thisCard: PropTypes.object,
};
