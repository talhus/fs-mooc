import { useEffect, useState } from "react";
import { getAllCountries, getCountry } from "../axios";
import SpecificCountry from "./components/SpecificCountry";
function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [specificCountry, setSpecificCountry] = useState(null);

  useEffect(() => {
    getAllCountries().then((data) => setCountries(data));
  }, []);

  const filteredList = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    if (filteredList.length === 1) {
      getCountry(filteredList[0].name.common).then((data) =>
        setSpecificCountry(data),
      );
    } else {
      setSpecificCountry(null);
    }
  }, [search]);

  const handleChange = (e) => {
    setSearch(e.target.value); 
  };

  const handleShow = (country) => {
    getCountry(country.name.common).then((data) => setSpecificCountry(data));
  };

  return (
    <div>
      find countries <input onChange={handleChange} value={search} />
      <div>
        {specificCountry ? (
          <SpecificCountry data={specificCountry} />
        ) : filteredList.length > 10 ? (
          <p>too many matches, specify another filter</p>
        ) : (
          filteredList.map((country) => (
            <p key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => handleShow(country)}>Show</button>
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
