import { NavLink } from 'react-router-dom';
import routes from '../../routes';
import styles from '../../App.module.css';


const Navigation = () => {
    return (
        <header>            
            <ul className={styles.header} >
                <li>
                    <NavLink exact to={routes.home} className={styles.link} activeClassName={styles.link_active} >Home</NavLink>
                </li>
                <li>
                    <NavLink to={routes.movies} className={styles.link} activeClassName={styles.link_active} >Movies</NavLink>
                </li>
            </ul>
        </header>
    )
}
export default Navigation;
