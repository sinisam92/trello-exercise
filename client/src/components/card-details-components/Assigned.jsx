import PropTypes from "prop-types";
import React from "react";

import AssignedIcon from "../../assets/icons/assigned.svg";
import Avatar from "../common/Avatar";

const Assigned = ({ thisCardsAssigned }) => {
  return (
    <>
      <div className="flex-shrink-0">
        <img src={AssignedIcon} alt="assigned icon" />
      </div>
      <div>
        <h2 className="mb-3">Assigned</h2>
        {thisCardsAssigned.length === 0 ? (
          <p>No one assigned yet.</p>
        ) : (
          <div className="flex gap-x-3">
            {thisCardsAssigned.map((person) => (
              <Avatar
                key={person.id}
                avatarUrl={person.avatarUrl}
                username={person.username}
                defaultAvatar={person.defaultAvatar}
                size={2.5}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Assigned;

Assigned.propTypes = {
  thisCardsAssigned: PropTypes.array,
};
