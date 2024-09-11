import { useState, useEffect } from "react";
import Card from "../../stories/Card";

const UsersCards = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const projects = JSON.parse(localStorage.getItem("projects")) || [];

    const getAllCards = projects
      .filter((project) => project.lists)
      .flatMap((project) => project.lists)
      .flatMap((list) => list.cards || []);

    const userCards = getAllCards.filter((card) =>
      card.assigned.includes(currentUser.username)
    );
    setCards(userCards);
  }, []);

  return (
    <>
      {cards.length > 0 ? (
        <div className="grid place-content-center w-[85%] mx-auto md:grid-cols-2 lg:w-[90%] lg:grid-cols-3 lg:gap-4 xl:w-3/4 xl:max-w-3/4">
          {cards.map((card) => (
            <Card key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="w-full h-[calc(100vh-300px)] flex items-center justify-center">
          <p className="text-center text-lg text-primary">
            No cards assigned to you yet!
          </p>
        </div>
      )}
    </>
  );
};

export default UsersCards;
