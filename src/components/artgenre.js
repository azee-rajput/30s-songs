import React, {Component} from 'react';
import Griding from './griding';
// import Navibar from './navbar';

export default class ArtGenres extends Component{

    constructor(props){
        super(props);
        this.state={
            params: this.props.match.params.genre,
        }
    }
    render(){
        return(
            <div>
                <Griding heading={false} type="artgenre" extra={this.state.params} url={"https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/"+this.state.params+"/artists"}/>
            </div>
        )
    }
}