import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from '../components/pages/Landing';
// import Header from '../components/ui/Header';
import ConferenceRoom from '../components/pages/ConferenceRoom';
import PrivateRoute from './PrivateRoute';

const AppRouter = () => (


    <BrowserRouter>
        {/* <Header/> */}
        <Switch>
            <Route path="/" component={Landing} exact />
            <PrivateRoute path="/room/:id" component={ConferenceRoom} />
        </Switch>
    </BrowserRouter>

)

export default AppRouter;