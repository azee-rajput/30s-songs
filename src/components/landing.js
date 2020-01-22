import React, {Component} from 'react';
import styled from 'styled-components';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {PlayCircle} from 'styled-icons/boxicons-regular/PlayCircle';
import {PauseCircle} from 'styled-icons/boxicons-regular/PauseCircle';
import {Redirect} from 'react-router-dom';

import Navibar from './navbar';

const Wrapper = styled(Container)`
width: 100%;
margin:0;
padding:10px;
background: #131419;
min-height:90vh;
`;
const Header =  styled(Row)`
box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
            inset 2px 2px 6px rgba(0, 0, 0, 0.8);
margin:auto;
padding: 40px;
color: white;
min-height: 60vh;
text-align: center;
`;


const Cust = styled(Col)`
margin:auto;
& img{
    height: auto;
    width: 100%;
}

& h3{
    margin-bottom: 30px;
}
`;

const PlayBtn = styled(PlayCircle)`
margin-top:50px;
transition: 0.5s;
color: #ffffff;
border-radius: 50%;
box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
    5px 5px 15px rgba(0, 0, 0, 0.5);
&:hover{
    cursor: pointer;
    color: #919191;
    transition: 0.5s;
    box-shadow: -1px -1px 15px rgba(0, 0, 0, 0.5),
     1px 1px 15px rgba(0, 0, 0, 0.5),
     1px -1px 15px rgba(0, 0, 0, 0.5),
     -1px 1px 15px rgba(0, 0, 0, 0.5);
}
`;

const PauseBtn = styled(PauseCircle)`
margin-top:50px;
color: #ffffff;
transition: 0.5s;
border-radius: 50%;
box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
    5px 5px 15px rgba(0, 0, 0, 0.5);
&:hover{
    cursor: pointer;
    color: #919191;
    transition: 0.5s;
    box-shadow: -1px -1px 15px rgba(0, 0, 0, 0.5),
     1px 1px 15px rgba(0, 0, 0, 0.5),
     1px -1px 15px rgba(0, 0, 0, 0.5),
     -1px 1px 15px rgba(0, 0, 0, 0.5);
}
`;

const List=styled(Row)`
display: flex;
justify-content: space-around;
pointer-events: none;
padding:0;
& > *{
    transition:0.5s;
    transform: scale(1);
    opacity:1;
    pointer-events: auto;
}

&:hover > *{
    transition: 0.5s;
    transform: scale(0.95);
    opacity:0.7;
}

& > *:hover{
    transition:0.5s;
    transform: scale(1.05);
    opacity:1;
    cursor: pointer;
    box-shadow: -1px -1px 15px rgba(0, 0, 0, 0.5),
     1px 1px 15px rgba(0, 0, 0, 0.5),
     1px -1px 15px rgba(0, 0, 0, 0.5),
     -1px 1px 15px rgba(0, 0, 0, 0.5);
}

`;

const Item = styled(Col)`
margin:20px;
padding:0;
width:100%;
color: white;
text-align: center;
& > * {
    border: none;
    backgound: transparent;
    box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
    5px 5px 15px rgba(0, 0, 0, 0.5);
}
`;


let audio;
export default class Landing extends Component{
    constructor(props){
        super(props);
        this.played = this.played.bind(this);
        // this.goTo = this.goTo.bind(this);
        this.state = {
            data:[],
            url:"https://cors-anywhere.herokuapp.com/https://api.deezer.com/chart/tracks",
            loaded:false,
            playing:false,
            audio:"",
            route:"",
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        fetch(this.state.url)
        .then(response=>response.json())
        .then(data=>this.setState({data:data.tracks.data}))
    }

    goTo(id){
        this.setState({route: "/track/"+id})
    }

    played(){
        if(!this.state.loaded){
            audio = new Audio(this.state.data[0].preview);
            this.setState({loaded: true})
        }
        
        if(!this.state.playing){
            audio.play();
            this.setState({playing:true})
        }else{
            audio.pause();
            this.setState({playing:false})
        }
        
        // console.log(this.state.data[0].preview)
    }


    render(){
        if(this.state.route!==""){
            if(this.state.playing){
                audio.pause();
                audio.currentTime = 0;
            }
            return(
                <Redirect to={this.state.route}/>
            )
        }

        if(this.state.data.length<1){
            return <div>not loaded</div>
        }else{
            console.log(this.state.data[0].title);
            return(
                <Wrapper fluid>
                    <Navibar/>
                    <Header>
                        <Cust sm={8}>
                            <h3><i>No.1 @ Chart Today</i></h3>
                            <h1>{this.state.data[0].title}</h1>
                            <h4>{this.state.data[0].artist.name}</h4>
                            {/* <audio src={this.state.data[0].preview}/> */}
                            <Row><Cust sm={12}>{(this.state.playing ? <PauseBtn size="100" onClick={this.played}/> : <PlayBtn size="100" onClick={this.played}/>)}</Cust></Row>
                        </Cust>
                        <Cust sm={4}>
                            <img src={this.state.data[0].artist.picture_big} alt={this.state.data[0].artist.name} />
                        </Cust>
                    </Header>
                    <div>
                        <List>
                            {this.state.data.slice(1,10).map((track, index)=>
                                <Item sm={3} onClick={()=>this.goTo(track.id)}>
                                    <Card style={{background: "#131419"}}>
                                        <Card.Img src={track.artist.picture_medium} alt="Card image" />
                                        {/* <Card.ImgOverlay style={{background:`linear-gradient(to bottom, rgba(139, 0, 139, 0.12), rgba(255, 20, 147, 0.12))`}}> */}
                                        <Card.Body>
                                            <Card.Title>{track.title}</Card.Title>
                                            <Card.Text>{track.artist.name}</Card.Text>
                                            <Card.Text><i>No.{index+2} @ Chart</i></Card.Text>
                                        </Card.Body>
                                        {/* </Card.ImgOverlay> */}
                                        </Card>
                                </Item>
                            )}
                        </List>
                    </div>
                </Wrapper>
            )
        }
    }
}