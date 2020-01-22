import React, { Component } from "react";
import {Switch, Route} from 'react-router-dom';

import Landing from './landing';
import Genres from './genres';
import ArtGenre from './artgenre';
import Search from './search';
import Tracks from './tracks';
import Detail from './detail';


export default class Routing extends Component{
    render(){
        return(
            <Switch>
                <Route exact path="/" component={Landing}/>
                <Route path="/genres" component={Genres}/>
                <Route path="/genre/:genre" component={ArtGenre}/>
                <Route path="/search/:search" component={Search}/>
                <Route path="/artist/:tracks" component={Tracks}/>
                <Route path="/track/:info" component={Detail}/>
            </Switch>
        )
    }
}
