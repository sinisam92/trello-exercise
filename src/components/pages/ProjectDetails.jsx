import { useParams } from "wouter";
import presentationData from "../../data/presentationData";
import Dots from "../../assets/icons/dots.svg";
import Plus from "../../assets/icons/plus.svg";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = presentationData.filter(
    (project) => project.id === parseInt(id, 10)
  );

  const colors = {
    urgent: "bg-myOrange",
    critical: "bg-danger",
    bug: "bg-myBlue",
    feature: "bg-success",
    important: "bg-myPurple",
    default: "bg-disabled",
  };

  const addNewcard = () => {
    console.log("add new card");
  };
  
  return (
    <div className="flex overflow-x-auto overscroll-y-none space-x-4 h-screen">
      {/* LIST */}
      {project[0].lists.map((list) => {
        return (
          <section
            key={list.id}
            className="bg-primaryDark min-w-[340px] h-fit  ml-5 mt-9 rounded-[20px]"
          >
            <div className="flex justify-between rounded-t-lg">
              <h1 className="text-white text-2xl tracking-wider p-4 ">
                {list.name}
              </h1>
              <button>
                <img src={Dots} alt="option dots image" className="pr-3" />
              </button>
            </div>
            {/* CARD */}
            <div>
              {list.cards.map((card) => {
                return (
                  <div
                    key={card.id}
                    className="bg-primary text-white p-4 rounded-lg m-4"
                  >
                    {/* TAGS */}
                    {card.tags && (
                      <div className="flex gap-2">
                        {card.tags.map((tag) => {
                          return (
                            <span
                              key={tag}
                              className={`text-white px-2 py-1 rounded-md text-xs mb-2 ${colors[tag]}`}
                            >
                              {tag}
                            </span>
                          );
                        })}
                      </div>
                    )}
                    {/* END TAGS */}
                    <h1 className="text-white text-xl tracking-wide">
                      {card.title}
                    </h1>
                  </div>
                );
              })}
            </div>
            {/* END CARD */}
            {/* ADD NEW CARD */}
            <div>
              <button className="bg-primaryDark p-4 text-white rounded-bl-[20px] flex justify-start items-center gap-x-4 cursor-pointer" onClick={addNewcard}>
                <img src={Plus} alt="add card" />
                <h2 className="text-white  ">Add new card</h2>
              </button>
            </div>
            {/* END ADD NEW CARD */}
          </section>
        );
      })}
      {/* END LIST */}
    </div>
  );
};

export default ProjectDetails;
