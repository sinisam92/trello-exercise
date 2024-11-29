import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCardById } from "../../reducers/cardSlice";
import { fetchProject } from "../../reducers/projectSlice";
import { fetchUsersByIds } from "../../reducers/userSlice";
import CardDetails from "../card-details-components/CardDetails";

const CardDetailsContainer = ({ cardId, projectId }) => {
  const [currCard, setCurrCard] = useState(null);
  // const { currentCard } = useSelector((state) => state.cards);
  const { projects, currentProject } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    try {
      if (projectId) {
        await dispatch(fetchProject(projectId));
      }
      if (cardId) {
        await dispatch(fetchCardById(cardId));
        // setCurrCard(fetchedCard.payload);
      }
    } catch (err) {
      console.error("Error fetching initial data:", err);
    }
  }, [dispatch, projectId, cardId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (currentProject && currentProject.membersId) {
      dispatch(fetchUsersByIds(currentProject.membersId));
    }
  }, [dispatch, currentProject]);
  console.log("asdasdasds in PARENT", currCard);

  return (
    <div className="md:w-1/2 md:mx-auto border border-primary bg-[#EDEADE] my-10 drop-shadow-lg shadow-lg">
      <CardDetails
        cardId={cardId}
        projectId={projectId}
        // currentCard={currentCard}
        setCurrCard={setCurrCard}
        currCard={currCard}
        currentProject={currentProject}
        projects={projects}
      />
    </div>
  );
};

export default CardDetailsContainer;

CardDetailsContainer.propTypes = {
  cardId: PropTypes.string,
  projectId: PropTypes.string,
};
