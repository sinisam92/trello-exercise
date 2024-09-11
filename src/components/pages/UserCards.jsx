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
    <div>
      {cards.map((card) => (
        <Card
        key={card.id}
        card={card}
      />
      ))}
      
    </div>
  );
};

export default UsersCards;
