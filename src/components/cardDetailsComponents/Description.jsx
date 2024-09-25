import React from "react";
import DescriptionIcon from "../../assets/icons/description.svg";

const Description = ({ thisCard }) => {
  return (
    <>
      <div className="flex-shrink-0">
        <img src={DescriptionIcon} alt="description icon" />
      </div>
      <div>
        <h2 className="mb-3">Description</h2>
        {thisCard.description ? (
          <p>{thisCard.description}</p>
        ) : (
          <p>No description.</p>
        )}
      </div>
    </>
  );
};

export default Description;
