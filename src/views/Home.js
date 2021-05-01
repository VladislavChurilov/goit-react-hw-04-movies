import { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Home.module.css';

const URL = 'https://api.themoviedb.org/3/trending/all/day';
const KEY = '300595d929d6a6ebde3ac2741883f41c';

export default class Home extends Component {
    state = {
        randomMovies:[],
    }
    async componentDidMount() {
        const response = await axios.get(`${URL}?api_key=${KEY}`);            
        this.setState({randomMovies: response.data.results})
    }    

    render() {
        const {randomMovies} = this.state;
        
        return (  
            <>          
            <ul className={styles.filmList}>
                <h2> Trending today </h2>
                {randomMovies.map(movie => (
                    <li key={movie.id} >
                        <Link to={{
                            pathname: `/movies/${movie.id}`,
                            state: {
                                from: this.props.location ,
                            }
                        }} >{movie.title}</Link>
                    </li>                   
                ))}
            </ul>            
            </>
        )
    }
}

