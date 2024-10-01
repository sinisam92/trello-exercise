import React from "react";
import Clock from "../../assets/icons/clock2.svg";
import moment from "moment";
import PropTypes from "prop-types";

const Timestap = ({ thisCard }) => {
  return (
    <>
      <div className="flex-shrink-0">
        <img src={Clock} alt="clock icon" />
      </div>
      <div>
        <h2 className="mb-3">Timestamps</h2>

        <p>Created: {moment(thisCard.dateAdded).format("llll")}</p>
        {thisCard.dueDate && (
          <p>Duo Date: {moment(thisCard.dueDate).format("llll")}</p>
        )}
      </div>
    </>
  );
};

export default Timestap;

Timestap.propTypes = {
  thisCard: PropTypes.object,
};
