import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import { Accordion, Alert, ListGroup, Offcanvas, Spinner } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from '../App';

const Sidebar = ({ show, handleClose }) => {
  const { getConfig, cities, setSelectedCity, selectedUniversity, setSelectedUniversity, openCity, setOpenCity } = useContext(AppContext);
  const [universities, setUniversities] = useState({});
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const location = useLocation();

  const getUniversities = async (cityUid) => {
    setLoading(prev => ({ ...prev, [cityUid]: true }));
    setError(prev => ({ ...prev, [cityUid]: null }));
    try {
      const response = await axios.request(getConfig('GET', `cities/${cityUid}/universities`));
      if (response.data.status === 'success') {
        setUniversities(prev => ({ ...prev, [cityUid]: response.data.data.items }));
        setSelectedCity(cityUid);
        setOpenCity(cityUid);
      } else {
        setError(prev => ({ ...prev, [cityUid]: 'Не удалось загрузить университеты' }));
      }
    } catch (error) {
      setError(prev => ({ ...prev, [cityUid]: 'Не удалось загрузить университеты' }));
    } finally {
      setLoading(prev => ({ ...prev, [cityUid]: false }));
    }
  };

  useEffect(() => {
    if (openCity && !universities[openCity]) {
      getUniversities(openCity);
    }
  }, [openCity]);

  // Добавляем эффект для сброса состояния openCity и университетов на Home
  useEffect(() => {
    if (location.pathname === '/') {
      setOpenCity(null);
      setUniversities({});
      setSelectedCity(null);
      setSelectedUniversity(null);
    }
  }, [location.pathname]);

  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Университетские конференции</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Accordion activeKey={openCity ? openCity.toString() : null}>
          {cities.map((city, index) => (
            <Accordion.Item eventKey={city.uid.toString()} key={city.uid}>
              <Accordion.Header onClick={() => getUniversities(city.uid)}>
                {city.name}
              </Accordion.Header>
              <Accordion.Body>
                {loading[city.uid] ? (
                  <Spinner animation="border" />
                ) : error[city.uid] ? (
                  <Alert variant="danger">{error[city.uid]}</Alert>
                ) : (
                  <ListGroup>
                    {universities[city.uid]?.map((university) => (
                      <ListGroup.Item
                        action
                        as={Link}
                        to={`/university/${university.uid}`}
                        state={{ university }}
                        key={university.uid}
                        active={selectedUniversity === university.uid}
                        onClick={() => {
                          setSelectedUniversity(university.uid);
                          handleClose();
                        }}
                      >
                        {university.short_name}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;
