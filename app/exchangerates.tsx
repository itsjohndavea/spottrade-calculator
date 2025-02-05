import { useEffect, useState } from "react";

const useExchangeRates = () => {
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(
          "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.min.json"
        );
        const data = await response.json();
        setExchangeRates(data.usd || {});
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
      } 
    };
    
    fetchExchangeRates();
  }, []);

  return { exchangeRates };
};

export default useExchangeRates;
