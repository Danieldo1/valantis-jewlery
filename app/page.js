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
import ItemComponent from "@/components/ItemComponent";
import { useRouter } from "next/navigation";
import PleaseWait from "@/components/PleaseWait";
import { CgSpinner } from "react-icons/cg";

const ITEMS_PER_PAGE = 50;

export default function Home() {
  const [ids, setIds] = useState([]);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [maxPrice, setMaxPrice] = useState(0);
  const [filteredItems, setFilteredItems] = useState([]);
  const [buttonColor, setButtonColor] = useState(
    "bg-blue-500 hover:bg-blue-600"
  );
  const[btnLoading, setBtnLoading] = useState(false);

  const router = useRouter();
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

  useEffect(() => {
    const fetchBrands = async () => {
      const brandsData = await getBrands();
      const nonNullBrands = brandsData.result.filter((brand) => brand !== null);
      const uniqueBrandNames = [...new Set(nonNullBrands)];
      const updatedBrands = [
        { name: "Uncategorised", value: null },
        ...uniqueBrandNames.map((name) => ({ name, value: name })),
      ];

      setBrands(updatedBrands);
    };
    fetchBrands();
  }, []);

  const handleBrandChange = (event) => {
    setSelectedBrand(event.target.value);
    setButtonColor(
      event.target.value
        ? "bg-green-400 hover:bg-green-500"
        : "bg-blue-500 hover:bg-blue-600"
    );
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

  const handleFilter = async () => {
    setBtnLoading(true);
    const params = {
      ...(selectedBrand && { brand: selectedBrand }),
      ...(maxPrice && { price: parseFloat(maxPrice) }),
    };
    const filterResult = await getFilterIds(params);
    const ids = filterResult.result;
    setIds(ids);
    setBtnLoading(false);
  };

  const handleClearFilter = () => {
    setIds([]);
    setSelectedBrand(null);
    setMaxPrice(0);
    setFilteredItems([]);
    setButtonColor("bg-blue-500 hover:bg-blue-600");
    router.push("/");
  };

  const isBrowser = () => typeof window !== "undefined";
  function scrollToTop() {
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    scrollToTop();
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    scrollToTop();
  };

  return (
    <section className="flex flex-col px-5  h-full bg-stone-50 max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto">
      {loading && items ? (
        <div className="relative w-full flex flex-col h-[70vh]  justify-center items-center">
          <SvgSpinnersClock />
          <PleaseWait />
        </div>
      ) : (
        <>
          <div className="flex flex-col">
            <div className=" flex flex-col ">
              <label className="font-bold text-sm tracking-wide">Brand</label>
              <select
                onChange={handleBrandChange}
                value={selectedBrand || ""}
                className="border border-gray-300 rounded h-10"
              >
                {brands.map((brand, index) => (
                  <option key={index} value={brand.value}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col ">
              <label className="font-bold text-sm tracking-wide pt-5">
                Max Price
              </label>
              <input
                type="number"
                placeholder="Max price"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="border border-gray-300  rounded h-10"
              />
            </div>
          </div>
          <div className="flex flex-col ">
            <button
              onClick={handleFilter}
              className={`${buttonColor} flex justify-center items-center text-white font-bold py-2 px-4 rounded my-5`}
            >
              {btnLoading ? <CgSpinner className="animate-spin w-8 h-8 text-black" /> : "Apply Filter"}
            </button>
            <button
              type="button"
              onClick={handleClearFilter}
              className="bg-gray-400 hover:bg-gray-500 border border-gray-500 text-white font-bold py-2 px-4 rounded"
            >
              Clear Filter
            </button>
          </div>
          <h2 className="text-xl font-bold text-center my-4">
            {selectedBrand ? `Brand: ${selectedBrand}` : "All Products"}
          </h2>
          {items && (
            <div className="mb-5">
              {items.map((item) => (
                <ItemComponent item={item} />
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
