"use client";

import { useState } from "react";
import MessageDialog from "./messagedialog"; // Import the MessageDialog component

export default function Home() {
  const [buyPrice, setBuyPrice] = useState<string>("");
  const [sellPrice, setSellPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [fees, setFees] = useState<string>("");
  const [profit, setProfit] = useState<string | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("$");
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    type: "info" as "error" | "success" | "info",
    message: "",
  });

  // Static exchange rates for simplicity (in real-world apps, fetch from an API)
  const exchangeRates: Record<string, number> = {
    USD: 1, // Base currency
    EUR: 0.85,
    GBP: 0.75,
    JPY: 110,
    AUD: 1.35,
  };

  const clearFields = () => {
    setBuyPrice("");
    setSellPrice("");
    setQuantity("");
    setFees("");
    setProfit(null);
    setSelectedCurrency("$");
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
    if (isNaN(qty) || qty < 0) {
      setDialogState({
        isOpen: true,
        type: "error",
        message: "Please enter a valid quantity.",
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
  };

  const closeDialog = () => {
    setDialogState({ ...dialogState, isOpen: false });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md transition-colors duration-300">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-4 text-center">
          Spot Trade Calculator
        </h1>
        <div className="space-y-4">
          {/* Buy Price */}
          <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
              Buy Price
            </label>
          </div>
          <input
            type="number"
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300"
            placeholder="Enter buy price"
          />

          {/* Sell Price */}
          <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
              Sell Price
            </label>
          </div>
          <input
            type="number"
            value={sellPrice}
            onChange={(e) => setSellPrice(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300"
            placeholder="Enter sell price"
          />

          {/* Quantity */}
          <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
              Quantity
            </label>
          </div>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300"
            placeholder="Enter quantity"
          />

          {/* Fees */}
          <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
              Trading Fees
            </label>
          </div>
          <input
            type="number"
            value={fees}
            onChange={(e) => setFees(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300"
            placeholder="Enter trading fees"
          />
      <div className="space-y-4">
          {/* Currency Selection */}
          <div className="flex justify-between items-center">
            <label className="font-medium text-black dark:text-gray-200">
              Currency
            </label>
            <select
              value={selectedCurrency}
              onChange={(e) => setSelectedCurrency(e.target.value)}
              disabled = {true}
              className="border border-gray-300 dark:border-gray-700 text-black dark:text-gray-200 bg-white dark:bg-gray-700 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300"
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="¥">JPY (¥)</option>
            </select>
          </div>

          {/* Buy Price Section */}
          {/* Rest of your code remains the same... */}

          {/* Profit Section */}
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
              className={`w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded px-3 py-2 pl-10 pr-3 focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300 
              ${profit !== null
                ? parseFloat(profit) > 0
                  ? "text-green-500"
                  : parseFloat(profit) < 0
                  ? "text-red-500"
                  : "text-yellow-500"
                : ""}`}
            />
            <span
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
                profit !== null
                  ? parseFloat(profit) > 0
                    ? "text-green-500"
                    : parseFloat(profit) < 0
                    ? "text-red-500"
                    : "text-yellow-500"
                  : ""
              }`}
            >
              {selectedCurrency}
            </span>
              </div>
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
            className="w-full bg-black text-white dark:bg-white dark:text-black rounded px-4 py-2 hover:bg-gray-300 hover:text-black dark:hover:bg-gray-500 hover:dark:text-white focus:outline-none focus:ring focus:ring-blue-300 dark:focus:ring-blue-700 transition-colors duration-300"
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
