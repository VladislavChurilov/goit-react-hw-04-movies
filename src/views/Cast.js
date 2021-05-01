import { Component } from 'react';
import styles from './MovieDetails.module.css';

export default class Cast extends Component {
    //  static defaultProps = {
    //     defurl: 'https://cdn.pixabay.com/photo/2017/07/30/20/37/woman-2555564_960_720.jpg'
    // }
    state = {
        cast: [],
    }
    componentDidMount() {
        this.setState({
            cast: this.props.cast            
        })        
    }      

    render() {
        const { cast } = this.state;
        
      
        return (  
            <div className={styles.castConteiner}>          
            <ul className={styles.castList}>                
                {cast.map(actor => (
                    <li  key={actor.id} className={styles.castItem} >
                        <img src={actor.profile_path ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
                            : 'https://cdn.pixabay.com/photo/2017/07/30/20/37/woman-2555564_960_720.jpg'}
                        width="250" 
                        height="375" 
                        alt="Poster"
                        className={styles.poster} />{actor.name}           
                    </li>                    
                ))}
            </ul>                
            </div>
        )
    }
}
