import React, {Component} from 'react';
import Griding from './griding';
// import Navibar from './navbar';

export default class Genres extends Component{
    render(){
        return(
            <div>
                {/* <Navibar/> */}
                <Griding heading="Genre" type="genre" url="https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/" postfix=" Artist"/>
            </div>
        )
    }
}