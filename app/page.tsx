"use client";

import { useEffect, useState } from "react";
import MessageDialog from "./messagedialog"; // Import the MessageDialog component
import useExchangeRates from "./exchangerates";
import { FaChevronDown } from 'react-icons/fa'; // Import dropdown icon

export default function Home() {
  const [yourMoney, setYourMoney] = useState<string>("");
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [fees, setFees] = useState<string>("");
  const [profit, setProfit] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: "info" as "error" | "success" | "info",
    message: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { exchangeRates } = useExchangeRates();

  const clearFields = () => {
    setYourMoney("");
    setBuyPrice("");
    setSellPrice("");
    setQuantity("");
    setFees("");
    setProfit(null);
    setSelectedCurrency("USD");
  };
  const filteredCurrencies = Object.keys(exchangeRates).filter((currency) =>
    currency.toUpperCase().includes(searchTerm.toUpperCase())
  );

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setIsModalOpen(false);
  };

  const calculateProfit = () => {
    const buy = parseFloat(buyPrice);
    const sell = parseFloat(sellPrice);
    const qty = parseFloat(quantity);
    const fee = parseFloat(fees);
    if (isNaN(buy) || buy < 0) {
      setDialogState({
        isOpen: true,
        type: "error",
        message: "Please enter a valid funds price.",
      });
      return;
    }
    if (isNaN(buy) || buy < 0) {
      setDialogState({
        isOpen: true,
        type: "error",
        message: "Please enter a valid buy price.",
      });
      return;
    }
    if (isNaN(sell) || sell < 0) {
      setDialogState({
        isOpen: true,
        type: "error",
        message: "Please enter a valid sell price.",
      });
      return;
    }
    if (isNaN(fee) || fee < 0) {
      setDialogState({
        isOpen: true,
        type: "error",
        message: "Please enter a valid fee.",
      });
      return;
    }

    // Calculate profit and convert to the selected currency
    const baseProfit = (sell - buy) * qty - fee;
    const convertedProfit = baseProfit * (exchangeRates[selectedCurrency] || 1);
    setProfit(convertedProfit.toFixed(2));
    console.log(`value: ${convertedProfit}`);
  };

  const closeDialog = () => {
    setDialogState({ ...dialogState, isOpen: false });
  };

  useEffect(() => {
    const money = parseFloat(yourMoney);
    const price = parseFloat(buyPrice);

    // Check if values are valid numbers
    if (!isNaN(money) && !isNaN(price) && price > 0) {
      setQuantity((money / price).toFixed(2)); 
    } else {
      setQuantity(""); 
    }
  }, [yourMoney, buyPrice]); 

  return (
    <div className="h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md transition-colors duration-300">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4 text-center">
          Spot Trade Calculator
        </h1>
        <div className="space-y-4">
        {/* Your Money*/}
        <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
            Available Funds
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              value={yourMoney}
              onChange={(e) => setYourMoney(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300 pr-14"
              placeholder="Enter funds price"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-200">
              USD
            </span>
          </div>
          {/* Buy Price */}
          <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
              Buy Price
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              value={buyPrice}
              onChange={(e) => setBuyPrice(e.target.value)}
              className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300 pr-14"
              placeholder="Enter buy price"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-200">
              USD
            </span>
          </div>
          {/* Sell Price */}
          <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
              Sell Price
            </label>
          </div>
          <div className="relative">
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300 pr-14"
            placeholder="Enter sell price"
          />
           <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-200">
              USD
            </span>
         </div>

          {/* Quantity */}
          <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
              Quantity
            </label>
          </div>
          <input
            type="number"
            value={quantity}
            disabled
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300"
            placeholder="0"
          />
          {/* Fees */}
          <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
              Trading Fees
            </label>
          </div>
          <div className="relative">
          <input
            type="number"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300 pr-14"
            placeholder="Enter trading fees"
          />
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black dark:text-gray-200">
              USD
            </span>
          </div>
          {/* Currency Selection */}
      <div className="flex flex-col w-full">
      <label className="font-medium text-black dark:text-gray-200">
        Currency Profits
      </label>
      </div>
      <div className="flex items-center w-full">
        <button
          onClick={() => setIsModalOpen(true)} // Open modal on button click
          className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300 flex items-center justify-between"
        >
          {/* Display selected currency on the left */}
          <span>{selectedCurrency.toUpperCase()}</span>
          {/* Display the dropdown icon on the right */}
          <FaChevronDown className="ml-2" />
        </button>
    </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-black dark:text-gray-200">
                Select Currency Profit
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-sm text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors duration-300"
              >
                X
              </button>
            </div>
            <input
              type="text"
              placeholder="Search currency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full mb-4 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-gray-200 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700"
            />
            <div className="max-h-48 overflow-y-auto custom-scrollbar">
              <ul>
                {filteredCurrencies.map((currency) => (
                  <li
                    key={currency}
                    onClick={() => handleCurrencySelect(currency)}
                    className="cursor-pointer px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {currency.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
        <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4A5568; /* Dark grey */
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #2D3748; /* Slightly darker grey */
        }

        .custom-scrollbar::-webkit-scrollbar-button {
          display: none;
        }
        `}
        </style>
      {/* Profits Section */}
      <div className="flex justify-between items-center">
        <label className="font-medium text-black dark:text-gray-200">
          Profits
        </label>
        <span
          className="mr-1 hover:dark:border-gray-300 hover:border-gray-500 cursor-pointer text-gray-500 dark:text-gray-300 flex items-center justify-center w-6 h-6 rounded-full border border-gray-300 dark:border-gray-700 text-center"
          title="This shows the calculated profit based on the input values."
        >
          ?
        </span>
      </div>
      <div className="relative">
            <input
              type="number"
              placeholder="0.0"
              value={profit !== null ? profit : ""}
              readOnly
              className={`w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded px-3 py-2 pr-3 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300 
              ${profit !== null
                ? parseFloat(profit) > 0
                  ? "text-green-500"
                  : parseFloat(profit) < 0
                  ? "text-red-500"
                  : "text-yellow-500"
                : ""}`}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2"> 
              {selectedCurrency.toUpperCase()}
              </span>
              </div>
          {/* Buttons */}
          <button
            onClick={calculateProfit}
            className="w-full bg-blue-500 dark:bg-blue-700 text-white rounded px-4 py-2 hover:bg-blue-600 dark:hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300"
          >
          Calculate Profit
          </button>

          <button
            onClick={clearFields}
            className="w-full bg-black text-white dark:bg-white dark:text-black rounded px-4 py-2 hover:bg-gray-300 hover:text-black dark:hover:bg-gray-500 hover:dark:text-white focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-gray-700 transition-colors duration-300"
          >
            Clear Fields
          </button>
          <p className="text-sm text-center">
      Made with ❤️ & NextJS By: <span className="font-bold">John Dave Aquino</span>
    </p>
        </div>
      </div>
      <MessageDialog
        isOpen={dialogState.isOpen}
        type={dialogState.type}
        message={dialogState.message}
        onClose={closeDialog}
      />
      
    </div>
    
  );
  
}
