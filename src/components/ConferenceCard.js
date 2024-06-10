import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ConferenceCard = ({ universityUid, id, title, date, description, image }) => {
  return (
    <Card style={{ width: '25rem' }} className="mx-2 mb-4">
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
        {description}<br />
        Дата проведения: {date.split('\n').map((line, index) => (
            <React.Fragment key={index}>{line}</React.Fragment>
          ))}
          
        </Card.Text>
        {/* Обновляем ссылку, передавая universityUid в адрес */}
        <Link to={`/conference/${universityUid}/details/${id}`} className="btn btn-primary">Подробнее</Link>
      </Card.Body>
    </Card>
  );
};

export default ConferenceCard;
