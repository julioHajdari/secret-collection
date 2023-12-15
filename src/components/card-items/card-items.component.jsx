import "./card-items.style.scss";

const CardItems = ({ category }) => {
  const { imageUrl, title } = category;

  return (
    <div className="category-container">
      <div
        className="background-img"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="body-container">
        <h2>{title}</h2>
        <p>shop now</p>
      </div>
    </div>
  );
};

export default CardItems;
