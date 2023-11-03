import React, { useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFilmDetail } from '../redux/slices/detailMoviesSlice';

const DetailMovie = () => {
  const { Id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mengambil token dari Redux state
  const token = useSelector((state) => state.authReducers.token);

  useEffect(() => {
    // Memanggil action untuk mengambil detail film
    dispatch(fetchFilmDetail(Id, token));
  }, [dispatch, Id, token]);

  const film = useSelector((state) => state.detailMovies.filmDetail);

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
};

export default DetailMovie;
