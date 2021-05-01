import  { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import Navigation from './components/Navigation';

const Home = lazy(() => import('./views/Home' /* webpackChunkName: "Home" */ ));
const Movies = lazy(() => import('./views/Movies' /* webpackChunkName: "Movies" */));
const MovieDetails = lazy(() => import('./views/MovieDetails' /* webpackChunkName: "MovieDetails" */));
const NotFound = lazy(() => import('./views/NotFound' /* webpackChunkName: "NotFound" */));

export default class App extends Component {
    render() {
        return (
            <>           
                <Navigation />
                <Suspense fallback={<h1>Load...</h1>} >
                <Switch>
                    <Route exact path={routes.home} component={Home}></Route>
                    <Route exact path={routes.movies} component={Movies}></Route>
                    <Route path={routes.movieDetail} component={MovieDetails}></Route>
                    <Route component={NotFound} ></Route>
                </Switch>
                </Suspense>
            </>
        )
    }
}