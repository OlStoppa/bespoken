import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from '../components/pages/Landing';
import Header from '../components/ui/Header';
import ConferenceRoom from '../components/pages/ConferenceRoom';

const AppRouter = () => (
    
    
    <BrowserRouter>
    <Header/>
        <Switch>
            <Route path="/" component={Landing} exact />
            <Route path="/room:id" component={ConferenceRoom} />
        </Switch>
    </BrowserRouter>
    
)

export default AppRouter;