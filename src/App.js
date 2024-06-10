import React, { useState, useEffect, createContext } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import NavbarComponent from './components/Navbar';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import UniversityPage from './pages/UniversityPage';
import ConferencePage from './pages/ConferencePage';
import ConferenceDetails from './components/ConferenceDetails';
import { Spinner, Alert } from 'react-bootstrap';

export const AppContext = createContext();

function App() {
  const [sidebarShow, setSidebarShow] = useState(false);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [openCity, setOpenCity] = useState(null);

  const toggleSidebar = () => setSidebarShow(!sidebarShow);

  const getConfig = (method, name, data = null) => {
    const config = {
      method: method,
      url: `https://api.vuzconf.ru/${name}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${window.location.search.substr(1)}`
      },
      data: data ? JSON.stringify(data) : null
    };
    return config;
  };

  const fetchCities = async () => {
    const config = getConfig('GET', 'cities');
    const response = await axios.request(config);
    return response.data;
  };

  useEffect(() => {
    const loadCities = async () => {
      try {
        const data = await fetchCities();
        if (data.status === 'success') {
          setCities(data.data.items);
        } else {
          setError('Не удалось загрузить города');
        }
      } catch (error) {
        setError('Не удалось загрузить города');
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, []);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <AppContext.Provider value={{
      getConfig, cities, selectedCity, setSelectedCity,
      selectedUniversity, setSelectedUniversity, openCity, setOpenCity
    }}>
      <Router>
        <div>
          <NavbarComponent toggleSidebar={toggleSidebar} />
          <Sidebar show={sidebarShow} handleClose={toggleSidebar} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/university/:university" element={<UniversityPage />} />
            <Route path="/conference/:university" element={<ConferencePage />} />
            <Route path="/conference/:university/details/:conferenceId" element={<ConferenceDetails />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
