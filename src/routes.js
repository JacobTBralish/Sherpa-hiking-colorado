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

import { getAllTrails, getTrailsNearCity } from '../src/APICalls';


export default (
    <Switch>
        <Route exact path='/' component={Home} />
        {/* <Route path='/Trails Gridwall' render={() => {
            <TrailsGridwall />
        }} component={TrailsGridwall} /> */}
        <Route path='/All Trails' render={() => (
            <TrailsGridwall fetch={getAllTrails} name="allTrails" image='https://www.colorado.gov/revenueonline/Image/ENG/iStock_000027245770Large.jpg'/>
        )}/>
        <Route path='/Trail/:id' component={TrailView} />

        <Route path='/Trails Near Estes Park' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearEstesPark" lat="40.377117" long="-105.525514" image='https://assets.simpleviewcms.com/simpleview/image/fetch/c_fill,h_320,q_75,w_972/https://assets.simpleviewcms.com/simpleview/image/upload/c_fill%2Ch_1667%2Cq_50%2Cw_2500/v1/clients/estespark/Estes_Park_village_in_winter_Credit_Visit_Estes_Park_9b9c7394-3e41-4af9-83a5-9e73315c086e.jpg'/>
        )}/>
        <Route path='/Trails Near Aspen' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearAspen" lat="39.194904" long="-106.836966" image='http://www.getskitickets.com/blog/wp-content/uploads/2017/01/Aspen-Colorado-1080x675.jpg'/>
        )}/>
        <Route path='/Trails Near Telluride' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearTelluride" lat="37.940081" long="-107.817701" image='https://myretreatsunlimited.com/wp-content/uploads/2018/02/Telluride-at-night1.jpg'/>
        )}/>
        <Route path='/Trails Near Colorado Springs' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearColoradoSprings" lat="38.835220" long="-104.819801" image='https://www.tripsavvy.com/thmb/fWq2rZBczFzYVD-cvFHdQUa8rEk=/960x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/GettyImages-600968276-5b4908ec46e0fb0037da848f.jpg'/>
        )}/>
        <Route path='/Trails Near Alamosa' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearAlamosa" lat="37.469237" long="-105.876357" image='https://southwestdesertlover.files.wordpress.com/2012/07/alamosa-co-5-acres.jpg'/>
        )}/>
        <Route path='/Trails Near Leadville' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearLeadville" lat="39.24669" long="-106.293513" image='https://www.leadvillecorealestate.com/wp-content/uploads/2012/12/fall-2008-2016_03_23-14_54_40-UTC.jpg'/>
        )}/>
        <Route path='/Trails Near Denver' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearDenver" lat="39.761849" long="-104.880625" image='http://safebuilt.com/wp-content/uploads/2017/02/iStock_83228293_LARGE-2.jpg'/>
        )}/>
        <Route path='/Trails Near Breckenridge' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearBreckenridge" lat="39.500227" long="-106.0431" image='https://purewows3.imgix.net/images/articles/2017_09/breckenridge_us_winter_vacations.png?auto=format,compress&cs=strip'/>
        )}/>
        <Route path='/Trails Near Rifle' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearRifle" lat="39.538931" long="-107.77561" image='https://www.chickswithpicks.net/wp-content/uploads/2016/10/Rifle_2016_6_DawnGlanc.jpg'/>
        )}/>
        <Route path='/Trails Near Boulder' render={() => (
            <TrailsGridwall fetch={getTrailsNearCity} name="trailsNearBoulder" lat="40.027443" long="-105.25174" image='https://www.colorado.edu/coloradan/sites/default/files/styles/hero/public/article-image/2010_aerial213_revisedga.jpg?itok=GaX-g_4H'/>
        )}/>
        {/* <Route path='/trails' component={Trails} />
        <Route path='/trail/:id' component={Trail} />
        <Route path='/trail' component={Reviews} />
        <Route path='/visitetrail' component={Visited} />
        <Route path='/profile/:id' component={Profile} />
        <Route path='/profileCreate/:id' component={CreateProfile} />
        <Route path='/profileEdit/:id' component={EditProfile} /> */}
    </Switch>
)