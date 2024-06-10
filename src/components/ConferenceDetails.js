import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Navigate, Link } from 'react-router-dom';
import { AppContext } from '../App';
import { Spinner, Alert, Card, Breadcrumb } from 'react-bootstrap';
import { HiOutlineExternalLink } from "react-icons/hi"; // Импорт иконки внешней ссылки
import { GrLinkPrevious } from "react-icons/gr"; // Импорт иконки назад
import conferenceImage from '../pages/image/foto_1.jpeg'; // Импорт изображения для использования в качестве заглушки

const ConferenceDetails = () => {
  const { university, conferenceId } = useParams();
  const { getConfig } = useContext(AppContext);
  const [conference, setConference] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConferenceDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.request(getConfig('GET', `universities/${university}/conferences/${conferenceId}`));
        if (response.data.status === 'success') {
          setConference(response.data.data);
        } else {
          setError('Не удалось загрузить детали конференции');
        }
      } catch (error) {
        setError('Не удалось загрузить детали конференции');
      } finally {
        setLoading(false);
      }
    };

    fetchConferenceDetails();
  }, [university, conferenceId, getConfig]);

  const handleConferenceClick = () => {
    window.open(conference.url, '_blank');
  };

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (conference.info.length === 0) {
    return <Navigate to={conference.url} />;
  }

  return (
    <>
      <Card style={{ width: '90%',  height: '100%', margin: '6%' }}>
        <Card.Body>
          <Breadcrumb>
            <Breadcrumb.Item onClick={() => window.history.back()} style={{ cursor: 'pointer' }}>Конференции</Breadcrumb.Item>
            <Breadcrumb.Item active>{conference.name}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="d-flex align-items-center justify-content-between">
            <Card.Title><h1> {conference.name} <HiOutlineExternalLink style={{ cursor: 'pointer'}} onClick={handleConferenceClick} /></h1></Card.Title>
          </div>
          <Card.Img variant="top" src={conferenceImage} />
          <Card.Text>
            <br></br>
            <strong>Дата проведения:</strong> {conference.date}
          </Card.Text>
          <Card.Text>
            <strong>Тип конференции:</strong> {conference.type}
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted"></Card.Subtitle>
          {conference.info.map((detail, index) => (
            <Card.Text key={index}>
              <strong>{detail.name}:</strong> {renderDetailValue(detail)}
            </Card.Text>
          ))}
        </Card.Body>
      </Card>
    </>
  );
};

const renderDetailValue = (detail) => {
  if (detail.class === 'email') {
    return <a href={`mailto:${detail.value}`}>{detail.value}</a>;
  }
  if (detail.class === 'url') {
    return <a href={detail.value} target="_blank" rel="noopener noreferrer">{detail.value}</a>;
  }
  return detail.value;
};

export default ConferenceDetails;
