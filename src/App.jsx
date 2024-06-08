import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?title_like=${query}`);
        setData(response.data);
        console.log('Data fetched:', response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [query]);

  const filteredData = data.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="container">
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          onChange={handleChange}
          value={query}
        />
      </div>
      <div className="results">
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && filteredData.length > 0 ? (
          filteredData.map(item => (
            <div key={item.id} className="result-item">
              <h1>{item.title}</h1>
              <p>{item.body}</p>
            </div>
          ))
        ) : (
          !loading && <p>No results available</p>
        )}
      </div>
    </div>
  );
};

export default App;
