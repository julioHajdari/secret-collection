import CardItems from "../card-items/card-items.component";
import "./directory.style.scss";

const Directory = ({ categories }) => {
  return (
    <div className="categories-container">
      {categories.map((category) => (
        <CardItems category={category} key={category.id} />
      ))}
    </div>
  );
};

export default Directory;
