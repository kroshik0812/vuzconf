import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import ConferenceCard from '../components/ConferenceCard';
import { Spinner, Alert } from 'react-bootstrap';
import { AppContext } from '../App';
import foto_1 from '../pages/image/foto_1.jpeg';
import foto_2 from '../pages/image/foto_2.jpeg';
import foto_3 from '../pages/image/foto_3.jpeg';
import foto_4 from '../pages/image/foto_4.jpeg';

const UniversityPage = () => {
  const { university } = useParams();
  const location = useLocation();
  const universityData = location.state?.university || {};
  const { getConfig, setSelectedUniversity } = useContext(AppContext);
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [universityUid, setUniversityUid] = useState(null); // Добавляем состояние для universityUid

  const images = [foto_1, foto_2, foto_3, foto_4]; // Массив изображений

  const fetchConferences = async (universityUid) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.request(getConfig('GET', `universities/${universityUid}/conferences`));
      if (response.data.status === 'success') {
        setConferences(response.data.data.conferences.items);
      } else {
        setError('Не удалось загрузить конференции');
      }
    } catch (error) {
      setError('Не удалось загрузить конференции');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (university) {
      // Устанавливаем universityUid в состояние
      setUniversityUid(university);
      fetchConferences(university);
      setSelectedUniversity(university); // Устанавливаем текущий университет
    }
  }, [university, setSelectedUniversity]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-5 pt-4">
      <h1>{universityData.name || "Название университета"}</h1><br></br>
      <div className="d-flex flex-wrap">
        {conferences.map((conference, index) => (
          <ConferenceCard
            key={conference.uid}
            universityUid={universityUid} // Передаем universityUid в ConferenceCard
            id={conference.uid}
            title={conference.name}
            date={conference.date}
            description={conference.type}
            image={images[index % images.length]} // Чередующиеся изображения
          />
        ))}
      </div>
    </div>
  );
};

export default UniversityPage;
