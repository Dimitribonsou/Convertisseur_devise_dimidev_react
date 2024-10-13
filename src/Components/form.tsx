import React, { useState, useEffect } from "react";

// Ajoutez cette ligne en haut du fichier, juste après les imports
const API_KEY = "cur_live_p878vYcG7eq4mKObsPRWPBvBz14TbApCESvzL2Nh";

const CurrencyConverter = () => {
  // États pour gérer les données du convertisseur
  const [amount, setAmount] = useState<number>(1); // Montant à convertir
  const [fromCurrency, setFromCurrency] = useState<string>("EUR"); // Devise de départ
  const [toCurrency, setToCurrency] = useState<string>("USD"); // Devise d'arrivée
  const [currencies, setCurrencies] = useState<string[]>([]); // Liste des devises disponibles
  const [result, setResult] = useState<string>(""); // Résultat de la conversion

  // Effet pour charger les devises au montage du composant
  useEffect(() => {
    fetchCurrencies();
  }, []);

  // Fonction pour récupérer la liste des devises depuis l'API
  const fetchCurrencies = async () => {
    try {
      const response = await fetch(
        `https://api.currencyapi.com/v3/currencies?apikey=${API_KEY}`
      );
      const data = await response.json();
      setCurrencies(Object.keys(data.data));
    } catch (error) {
      console.error("Erreur lors de la récupération des devises:", error);
    }
  };

  // Fonction pour inverser les devises sélectionnées
  const handleSwitch = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Fonction pour effectuer la conversion
  const handleConvert = async () => {
    try {
      const response = await fetch(
        `https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${fromCurrency}&currencies=${toCurrency}`
      );
      const data = await response.json();
      const rate = data.data[toCurrency].value;
      const convertedAmount = amount * rate;
      setResult(
        `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`
      );
    } catch (error) {
      console.error("Erreur lors de la conversion:", error);
      setResult("Erreur lors de la conversion. Veuillez réessayer.");
    }
  };

  // Rendu du composant
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Convertisseur de devises
      </h2>

      {/* Champ de saisie du montant */}
      <div className="mb-4">
        <label
          htmlFor="amount"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Montant:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Sélection des devises et bouton d'inversion */}
      <div className="flex items-center mb-4">
        {/* Devise de départ */}
        <div className="w-5/12">
          <label
            htmlFor="fromCurrency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            De:
          </label>
          <select
            id="fromCurrency"
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        {/* Bouton d'inversion des devises */}
        <button
          onClick={handleSwitch}
          className="mx-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          ↔️
        </button>

        {/* Devise d'arrivée */}
        <div className="w-5/12">
          <label
            htmlFor="toCurrency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            À:
          </label>
          <select
            id="toCurrency"
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Bouton de conversion */}
      <button
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
        onClick={handleConvert}
      >
        Convertir
      </button>

      {/* Affichage du résultat */}
      <div className="mt-4 p-3 bg-gray-100 rounded-md">
        <p className="text-center font-semibold">{result}</p>
      </div>
    </div>
  );
};

export default CurrencyConverter;
