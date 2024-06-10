import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import foto1 from '../pages/image/foto_1.jpeg';
import foto2 from '../pages/image/foto_2.jpeg';
import foto3 from '../pages/image/foto_3.jpeg';
import foto4 from '../pages/image/foto_4.jpeg';

const Home = () => {
  return (
    <div className="container mt-5 pt-4">
      <h1 style={{ fontSize: '2rem' }}>
  <span style={{ color: '#007bff' }}>Открытия и возможности</span>, <br></br>которые вы можете получить на конференциях:</h1>
      <Row xs={1} md={2} className="pt-3 g-4">
        <Col>
          <Card className="mb-4">
            <Card.Img variant="top" src={foto1} />
            <Card.Body>
              <Card.Title>Преимущества участия студентов в научных конференциях</Card.Title>
              <Card.Text>
                Участие студентов в научных конференциях способствует расширению их знаний, развитию навыков научного исследования и укреплению профессиональных связей.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-4">
            <Card.Img variant="top" src={foto4} />
            <Card.Body>
              <Card.Title>Роль студенческих конференций в профессиональном развитии молодых специалистов</Card.Title>
              <Card.Text>
                Откройте для себя возможности профессионального и личностного роста на студенческих мероприятиях.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="mb-4">
            <Card.Img variant="top" src={foto3} />
            <Card.Body>
              <Card.Title>Развитие научного сообщества и обмен знаниями на преподавательских конференциях</Card.Title>
              <Card.Text>
                Преподавательские конференции создают платформу для обмена передовыми педагогическими практиками, обсуждения методик преподавания и разработки новых подходов к образованию.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card className="mb-4">
            <Card.Img variant="top" src={foto2} />
            <Card.Body>
              <Card.Title>Профессиональное развитие преподавателей через участие в научных мероприятиях</Card.Title>
              <Card.Text>
                Участие в научных конференциях позволяет преподавателям быть в курсе последних тенденций и исследований в своей области, обмениваться опытом с коллегами и повышать качество образования.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
