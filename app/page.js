"use client";
import { useState, useEffect } from "react";
import {
  getIds,
  getItems,
  getField,
  getBrands,
  getFilterIds,
} from "../lib/actions/items.action";
import { SvgSpinnersClock } from "../components/Loading";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const ITEMS_PER_PAGE = 50;

export default function Home() {
  const [ids, setIds] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIds = async () => {
      setLoading(true);
      const offset = currentPage * ITEMS_PER_PAGE;
      const fetchedIds = await getIds(offset, ITEMS_PER_PAGE);
      const uniqueIds = Array.from(new Set(fetchedIds.result));
      setIds(uniqueIds);
    };

    fetchIds();
  }, [currentPage]);

  useEffect(() => {
    if (ids.length > 0) {
      const fetchItems = async () => {
        const fetchedItems = await getItems(ids);
        const uniqueItems = fetchedItems.result.filter(
          (item, index, self) =>
            index === self.findIndex((t) => t.id === item.id)
        );
        setItems(uniqueItems);
        setLoading(false);
      };

      fetchItems();
    }
  }, [ids]);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <section className="flex flex-col  gap-4 h-full bg-stone-50 max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
      {loading && items ? (
        <div className="relative w-full h-[70vh] flex justify-center items-center">
          <SvgSpinnersClock />
        </div>
      ) : (
        <>

        <h2 className="text-xl font-bold text-center">All Products</h2>
        
          {items && (
            <div>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2 my-2 p-5 border border-gray-800 bg-gray-200 rounded-md shadow-md"
                >
                  <p className="text-center font-bold py-4 border-b border-gray-800">
                    {item.product}
                  </p>
                  <div className="flex justify-between  gap-2">
                    <p>
                      <span className="font-bold">Brand:</span>{" "}
                      {item.brand !== null ? item.brand : "No brand"}
                    </p>
                    <p>
                      <span className="font-bold">Price:</span>{" "}
                      <span className="font-bold">₽</span>{" "}
                      {item.price.toLocaleString()}
                    </p>
                  </div>
                  <p className="text-gray-500">
                    <span className="font-bold">ID:</span> {item.id}
                  </p>
                </div>
              ))}
            </div>
          )}
          {items && items.length > 0 && (
            <div className="flex items-center justify-between mb-5">
              <button onClick={handlePreviousPage} disabled={currentPage === 0}>
                <FaArrowAltCircleLeft className="w-10 h-10 hover:scale-110" />
              </button>
              <div className="flex gap-2 justify-center items-center">
                {currentPage > 0 && (
                  <span className="text-gray-600"> {currentPage - 1}</span>
                )}
                <span className="font-bold text-xl">{currentPage}</span>
                <span className="text-gray-600">{currentPage + 1}</span>
              </div>
              <button onClick={handleNextPage}>
                <FaArrowAltCircleRight className="w-10 h-10 hover:scale-110" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
