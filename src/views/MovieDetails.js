import { Link, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';
import axios from 'axios';
import  { Component, Suspense, lazy } from 'react';
import styles from './MovieDetails.module.css';
import routes from '../routes';

const URL = 'https://api.themoviedb.org/3/movie/';
const KEY = '300595d929d6a6ebde3ac2741883f41c';
const Cast = lazy(() => import('./Cast' /* webpackChunkName: "Cast" */));
const Reviews = lazy(() => import('./Reviews' /* webpackChunkName: "Reviews" */));

export default class MovieDetails extends Component {
    // static defaultProps = {
    //     defurl: 'https://cdn.pixabay.com/photo/2017/07/30/20/37/woman-2555564_960_720.jpg'
    // }
    // static propTypes = {
    // }
    state = {
        film: [],
        genres: [],
        cast: [],        
        reviews: []
    }

    async componentDidMount() {
        const {movieId} = this.props.match.params;
        const response = await axios.get(`${URL}${movieId}?api_key=${KEY}&language=en-US`);
        const responseCast = await axios.get(`${URL}${movieId}/credits?api_key=${KEY}&language=en-US`);
        const responseReviews = await axios.get(`${URL}${movieId}/reviews?api_key=${KEY}&language=en-US`);
        
        return this.setState({
            film: response.data,
            genres: response.data.genres,
            cast: responseCast.data.cast,            
            reviews: responseReviews.data
        });
    }
    handleGoBack = () => {
        const { location, history } = this.props;
        history.push(location?.state?.from || routes.movies);

    }
    
    render() {
        const { film, genres, cast, reviews } = this.state;
        const poster = `https://image.tmdb.org/t/p/w500/${film.poster_path}`;
        
        return (
            <>
            <button className={styles.goBack} type="button" onClick={this.handleGoBack} > Back </button>
            <div className={styles.MovieCard} >                    
                <img src={poster} 
                width="300" 
                height="300" 
                alt="Poster"
                className={styles.poster} />
                <div className={styles.filmConteiner}>
                <h2 className={styles.title}>{film.title}</h2> 
                <h3 className={styles.title}> Rating: {film.vote_average}</h3>                                
                <ul className={styles.genresList}> Genres: {genres.map(item => (
                   <li className={styles.genresItem} key={item.id}> {item.name}</li>
                    ))}              
                </ul>                
                <span>{film.overview}</span>
            </div>
            </div>
                <div className={styles.inform} >
                    <p className={styles.paragr} >Additional information</p>
                    <Link className={styles.informLink} to={`${this.props.match.url}/cast`}  >Cast</Link>
                    <Link className={styles.informLink} to={`${this.props.match.url}/reviews`}  >Reviews</Link>
                </div>
                <Suspense fallback={<h1>Load...</h1>} >

                <Route path={`${this.props.match.path}/cast`}
                    render={props => (
                         cast && <Cast {...props} cast={cast} /> )} />
                        {/* return cast? <Cast {...props} cast={cast} /> : null}} /> */}
                <Route path={`${this.props.match.path}/reviews`}
                    render={props => (
                        reviews && <Reviews {...props} reviews={reviews} />)} />
                        {/* return reviews? <Reviews {...props} reviews={reviews} />: null}} /> */}
                </Suspense>
            </>
        )
    }
}

