import React, { useEffect, useState } from "react";

const TestPage = () => {
  const [category, setCategory] = useState(undefined);
  const [products, setProducts] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [image, setImage] = useState(
    "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg"
  );

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        const _categoryList = data
          .map((item) => {
            return item.category;
          })
          .filter((item, index, array) => {
            return array.indexOf(item) === index;
          });
        setCategoryList(_categoryList);
      });
  }, []);

  const selectedProducts = category
    ? products.filter((product) => {
        return product.category === category;
      })
    : products;

  return (
    <>
      <FullScreenPhotoModal setImage={setImage} image={image} />
      <div
        style={{
          paddingTop: "20em",
          padding: "3em",
        }}
      >
        <p>TestPage</p>
        <ul>
          <li>agsdgsdgds</li>
          <li>agsdgsdgds</li>
          <li>agsdgsdgds</li>
          <li>agsdgsdgds</li>
          <li>agsdgsdgds</li>
        </ul>
        <div>Выбранная категория {category ?? "None"}</div>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {categoryList.map((item, index) => (
            <Button
              key={index}
              onClick={() => {
                setCategory(item);
              }}
              title={item}
            />
          ))}
          <Button
            onClick={() => {
              setCategory(undefined);
            }}
            title="Reset"
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1em",
          }}
        >
          {selectedProducts.map((product, index) => {
            return (
              <Card
                openImage={() => {
                  setImage(product.image);
                }}
                key={index}
                image={product.image}
                category={product.category}
                title={product.title}
                descripton={product.description}
                price={product.price}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const Card = ({
  title = "NO TITLE",
  descripton = "NO DESCRIPTION",
  price,
  category,
  index,
  image,
  openImage,
}) => {
  const [startDragCoordinates, setStartDragCoordinates] = React.useState([
    0, 0,
  ]);
  const [currentDragCoordinates, setCurrentDragCoordinates] = React.useState([
    0, 0,
  ]);
  const [isDragging, setIsDragging] = React.useState(false);

  const x = isDragging
    ? -startDragCoordinates[0] + currentDragCoordinates[0]
    : 0;

  const y = isDragging
    ? -startDragCoordinates[1] + currentDragCoordinates[1]
    : 0;

  return (
    <div
      onMouseDown={({ pageX, pageY }) => {
        setStartDragCoordinates([pageX, pageY]);
        setIsDragging(true);
      }}
      onMouseMove={({ pageX, pageY }) => {
        setCurrentDragCoordinates([pageX, pageY]);
      }}
      onMouseLeave={() => {
        setIsDragging(false);
        setCurrentDragCoordinates([0, 0]);
        setStartDragCoordinates([0, 0]);
      }}
      onMouseUp={() => {
        setIsDragging(false);
        setCurrentDragCoordinates([0, 0]);
        setStartDragCoordinates([0, 0]);
      }}
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        gap: "1em",
        backgroundColor: "#f2f2f2",
        borderRadius: 20,
        overflow: "hidden",
        zIndex: isDragging ? 100 : 0,
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <img onClick={openImage} width={300} height={300} src={image} />
      <div style={{ display: "block" }}>
        <div style={{ width: "100%" }}>
          <h3 style={{ width: "100%" }}>
            {title} | {category}
          </h3>
          <p style={{ width: "100%" }}>{descripton}</p>
          {!!price ? (
            <span style={{ color: "green" }}>{price}$ price</span>
          ) : (
            <span>Цена не указана</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Button = ({ onClick = () => {}, title = "" }) => {
  const [isMouseDown, setIsMouseDown] = React.useState(false);

  return (
    <div
      style={{
        cursor: "pointer",
        userSelect: "none",
        background: "#f2f2f2",

        transition: "200ms",
        transform: [isMouseDown ? "scale(0.8)" : "scale(1)"],
        color: "green",
        width: "fit-content",
        padding: ".5em 1em",
        borderRadius: 8,
        marginBottom: 10,
        marginRight: 10,
      }}
      onClick={onClick}
      onMouseDown={() => {
        setIsMouseDown(true);
      }}
      onMouseLeave={() => {
        setIsMouseDown(false);
      }}
      onMouseUp={() => {
        setIsMouseDown(false);
      }}
    >
      <span>{title}</span>
    </div>
  );
};

const FullScreenPhotoModal = ({ image, setImage = () => {} }) => {
  return (
    <div
      style={{
        display: image ? "flex" : "none",
        position: "fixed",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: "white",
        zIndex: 1000,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        style={{ width: 500, height: 500, objectFit: "contain" }}
        src={image}
      />
      <div
        style={{ position: "absolute", top: 0, right: 0 }}
        onClick={() => {
          setImage(undefined);
        }}
      >
        x
      </div>
    </div>
  );
};

export default TestPage;
