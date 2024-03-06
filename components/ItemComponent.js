import React from 'react'

const ItemComponent = ({ item }) => {
  return (
    <div
      key={item.id}
      className="flex cursor-pointer hover:scale-105  hover:shadow-transparent transition-all delay-100 ease-in-out flex-col gap-2 my-2 p-5 border border-gray-800 bg-gray-200 rounded-md shadow-md"
    >
      <p className="text-center font-bold py-4 border-b border-gray-800">
        {item.product}
      </p>
      <div className="flex justify-between gap-2">
        <p>
          <span className="font-bold">Brand:</span>{" "}
          {item.brand !== null ? item.brand : "No brand"}
        </p>
        <p>
          <span className="font-bold">Price:</span>{" "}
          <span className="font-bold">₽</span> {item.price.toLocaleString()}
        </p>
      </div>
      <p className="text-gray-500">
        <span className="font-bold">ID:</span> {item.id}
      </p>
    </div>
  );
}

export default ItemComponent