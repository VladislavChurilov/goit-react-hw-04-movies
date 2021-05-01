import { Component } from 'react';

import styles from './MovieDetails.module.css';

export default class Reviews extends Component {    
    state = {
        reviews: [],
    }
    componentDidMount() {
        this.setState({
            reviews: this.props.reviews.results            
        })        
    }      

    render() {
        const { reviews } = this.state;        
        return (  
            <div className={styles.castConteiner}>          
                <ul className={styles.castList}>                
                    {reviews.map(review => (                    
                    <li key={review.id} className={styles.castItem} >                        
                        <h3>{review.author}</h3>
                        <p>{review.content}</p>                       
                    </li>                                       
                    ))}
                    {reviews.length === 0 ?<h1>We don't have any reviews for this movie</h1> :''}
                </ul>                
            </div>
        )
    }
}
