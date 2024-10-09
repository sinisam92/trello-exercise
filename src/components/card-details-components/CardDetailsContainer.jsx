import React from "react";

import CardDetails from "../card-details-components/CardDetails";

const CardDetailsContainer = () => {
  return (
    <div className="md:w-1/2 md:mx-auto border border-primary bg-[#EDEADE] my-10 drop-shadow-lg shadow-lg">
      <CardDetails />
    </div>
  );
};

export default CardDetailsContainer;
