import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const baseUrl = 'https://shy-cloud-3319.fly.dev/api/v1';
const token = localStorage.getItem('token')

function DetailMovie() {
  const { Id } = useParams();
  const [film, setFilm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFilmDetail = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/movie/${Id}`, {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setFilm(data.data);
      } catch (error) {
        console.error('Error fetching film detail:', error.message);
      }
    };

    fetchFilmDetail();
  }, [Id]);

  if (!film) {
    return <div>Loading...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url('https://image.tmdb.org/t/p/original${film.backdrop_path}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    position: 'relative',
    minHeight: '100vh',
  };

  const ratingWithStar = `★ ${film.vote_average.toFixed(1)} / 10`;

  return (
    <div className="detail-movie-container" style={backgroundStyle}>
      <Container>
        <Row>
          <Col md={6} className="text-light">
            <h1 className="title">{film.title || film.name}</h1>
            <div className="genres">
              {film.genres &&
                film.genres.slice(0, 5).map((genre, i) => (
                  <span key={i} className="genres-item">
                    {genre.name}
                  </span>
                ))}
            </div>
            <p className="overview">{film.overview}</p>
            <p className="rating">{ratingWithStar}</p>
            <Button variant="primary" onClick={() => navigate('/')}>
              Back Home
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default DetailMovie;
