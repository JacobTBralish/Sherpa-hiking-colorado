import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Components/Home/Home';
import TrailsGridwall from './Components/TrailsGridwall/TrailsGridwall';
import TrailView from './Components/TrailView/TrailView';
// import City from './Components/SelectCity/city';
// import Trails from './Components/Trails/Trails';
// import Trail from './Components/Trails/Trail';
// import Reviews from './Components/Reviews/Reviews';
// import Visited from './Components/Visited/Visited';
// import Profile from './Components/Profile/Profile';
// import CreateProfile from './Components/Profile/CreateProfile';
// import EditProfile from './Components/Profile/EditProfile';

import { getAllTrails } from '../src/APICalls';


export default (
    <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route path='/Trails Gridwall' render={() => {
            <TrailsGridwall />
        }} component={TrailsGridwall} /> */}
        <Route path='/All Trails' render={() => (
            <TrailsGridwall fetch={getAllTrails} name="allTrails"/>
        )}/>
        <Route path='/Trail/:id' component={TrailView} />
        {/* <Route path='/city' component={City} />
        <Route path='/trails' component={Trails} />
        <Route path='/trail/:id' component={Trail} />
        <Route path='/trail' component={Reviews} />
        <Route path='/visitetrail' component={Visited} />
        <Route path='/profile/:id' component={Profile} />
        <Route path='/profileCreate/:id' component={CreateProfile} />
        <Route path='/profileEdit/:id' component={EditProfile} /> */}
    </Switch>
)