import PropTypes from "prop-types";
import React from "react";

import TagsIcon from "../../assets/icons/tags.svg";
import Tag from "./Tag";

const Tags = ({ thisCard }) => {
  return (
    <>
      <div className="flex-shrink-0">
        <img src={TagsIcon} alt="tags icon" />
      </div>
      <div>
        <h2 className="mb-3">Tags</h2>
        {thisCard.tags.length === 0 ? (
          <p>No tags added.</p>
        ) : (
          <div className="flex flex-wrap gap-y-2">
            {thisCard.tags.map((tag) => {
              return (
                <Tag key={tag} tag={tag} className="p-2 rounded-lg mr-2" />
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Tags;

Tags.propTypes = {
  thisCard: PropTypes.object,
};
