import Plus from "../assets/icons/plus.svg";

const AddNewCard = ({setSelectedList, setIsModalOpen, list, setIsCardEditing}) => {
  const openModal = (list) => {
    setSelectedList(list);
    setIsCardEditing(false);
    setIsModalOpen(true);
  };

  return (
    <div>
      <button
        className="bg-primaryDark p-4 text-white rounded-bl-[20px] flex justify-start items-center gap-x-4 cursor-pointer"
        onClick={() => openModal(list)}
      >
        <img src={Plus} alt="add card" />
        <h2 className="text-white">Add new card</h2>
      </button>
    </div>
  );
};

export default AddNewCard;
