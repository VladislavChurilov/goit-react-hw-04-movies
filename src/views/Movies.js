import  { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import styles from './Movies.module.css';

const URL = 'https://api.themoviedb.org/3/search/movie';
const KEY = '300595d929d6a6ebde3ac2741883f41c';

 class Movies extends Component {   
    state={
        query: '',
        results: [],        
    }
    
    async fetchFilm  () {
        const response = await axios.get(`${URL}?api_key=${KEY}&query=${this.state.query}`);        
        return this.setState({results: response.data.results})
         
    }

    handleChange = e => {
        this.setState({query: e.currentTarget.value});
      }
     handleSubmit = e => {
        e.preventDefault();        
         this.fetchFilm();        
        this.setState({query:''})
    }

    render() {
        const {results} = this.state;
        
        return (
            <div className={styles.movies}>
        <form className={styles.SearchForm} onSubmit = {this.handleSubmit} >
            <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off" 
            value={this.state.query}
            onChange={this.handleChange}     
            autoFocus
            placeholder="Search movies"
            />
            <button type="submit"  className={styles.SearchFormButton}>Search</button>
        </form>
        <ul className={styles.filmList}>
            {results.map(movie => (
            <li key={movie.id} className={styles.item}>                    
                <Link to={{
                    pathname: `${this.props.match.url}/${movie.id}`,
                    state: {
                        from: this.props.location,
                    }
                }}>{movie.title}</Link>
            </li>                    
            ))}
        </ul>            
        </div>
        )
    }
}

export default withRouter(Movies);