import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllCards } from "../../reducers/cardSlice";
import Card from "./Card";

const UsersCards = () => {
  const { cards } = useSelector((state) => state.cards);
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCards());
  }, []);

  const filteredCards = cards.filter(
    (card) =>
      card.createdByUserId === user._id || card.assigned.includes(user._id),
  );

  return (
    <>
      {cards.length > 0 ? (
        <div className="grid place-content-center w-[85%] mx-auto md:grid-cols-2 lg:w-[90%] lg:grid-cols-3 lg:gap-4 xl:w-3/4 xl:max-w-3/4">
          {filteredCards.map((card) => (
            <Card key={card._id} card={card} users={users} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
          <p className="text-center text-lg text-primaryTextColor">
            No cards assigned to you yet!
          </p>
        </div>
      )}
    </>
  );
};

export default UsersCards;
