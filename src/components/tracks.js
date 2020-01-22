import React, {Component} from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import {Play} from 'styled-icons/boxicons-regular/Play';
import {Pause} from 'styled-icons/boxicons-regular/Pause';
import {SubdirectoryLeft} from 'styled-icons/boxicons-regular/SubdirectoryLeft';
import {Link} from 'react-router-dom';

import Navibar from './navbar';

const Wrapper = styled(Container)`
width: 100%;
color: #eaeaea;
margin:0;
padding:10px;
background: #131419;
min-height:90vh;
`;

const CustRow = styled(Row)`
padding:20px;
margin:10px;
box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
            5px 5px 15px rgba(0, 0, 0, 0.5);
transition: 0.5s;
text-align:center;
}
`;

const PlayBtn = styled(Play)`
color:#eaeaea;
background: transparent;
border: none;
border-radius: 50%;
box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
            5px 5px 15px rgba(0, 0, 0, 0.5);
transition: 0.5s;

&:hover{
    color:#707070;
    box-shadow: -1px -1px 10px rgba(0, 0, 0, 0.5),
                1px 1px 10px rgba(0, 0, 0, 0.5),
                1px -1px 10px rgba(0, 0, 0, 0.5),
                -1px 1px 10px rgba(0, 0, 0, 0.5);
    transition:0.5s;
    cursor: pointer;
}
`;

const PauseBtn = styled(Pause)`
color:#eaeaea;
background: transparent;
border: none;
border-radius: 50%;
box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
            5px 5px 15px rgba(0, 0, 0, 0.5);
transition: 0.5s;

&:hover{
    color:#707070;
    box-shadow: -1px -1px 10px rgba(0, 0, 0, 0.5),
                1px 1px 10px rgba(0, 0, 0, 0.5),
                1px -1px 10px rgba(0, 0, 0, 0.5),
                -1px 1px 10px rgba(0, 0, 0, 0.5);
    transition:0.5s;
    cursor: pointer;
}
`;

const Heading = styled(Row)`
box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
            inset 2px 2px 6px rgba(0, 0, 0, 0.8);
padding:20px;
text-align: center;
margin: 10px;
`;

const CustLink = styled(Link)`
text-decoration: none;
color:#555555;
font-size: 16px;
text-align: right;
`;

let audio;
export default class Tracks extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            url:"https://cors-anywhere.herokuapp.com/https://api.deezer.com/artist/",
            playing: [],
            track:"",
            status:"stopped",
        }
    }

    componentDidMount(){
        fetch(this.state.url+this.props.match.params.tracks+"/top?limit=50")
        .then(response=>response.json())
        .then(data=>this.setState({data:data.data}))
    }

    componentWillUnmount(){
        if(this.state.status==="playing"){
            audio.pause();
        }
    }

    play(track){
        if(this.state.track!==track){
            if(this.state.status==="playing"){
                audio.pause();
                audio.currentTime = 0;
            }
            audio = new Audio(track);
            this.setState({track: track, status:"playing"});
            audio.play();
        }else if(this.state.track===track && this.state.status==="playing"){
            audio.pause();
            this.setState({status: "paused"})
        }else if(this.state.track===track && this.state.status==="paused"){
            audio.play();
            this.setState({status:"playing"});
        }  
    }

    render(){
        if(this.state.data < 1){
            return (<h1>loading... please wait</h1>)
        }else{
            console.log(this.state.playing);
            return(
                <Wrapper fluid>
                    <Navibar/>
                    <Heading>
                        <Col sm={12}><h1>{this.state.data[0].artist.name}</h1></Col>
                        <Col sm={12}><img src={this.state.data[0].contributors[0].picture_medium} alt={this.state.data[0].artist.name}/></Col> 
                    </Heading>
                    <Row>
                        {this.state.data.map((track)=>
                            <Col sm={6}>
                                <CustRow>
                                    <Col sm={8}>
                                        <Row>
                                            <Col sm={12}>
                                                <h3>{track.title}</h3>
                                                <CustLink to={"/track/"+track.id}>More info<SubdirectoryLeft size="30"/></CustLink>
                                            </Col>
                                            <Col sm={12}><h5>
                                                {track.contributors.map((artist, index, arr)=>
                                                    <span>{artist.name+((index===arr.length-1)?"":", ")}</span>
                                                )}
                                            </h5></Col>
                                        </Row>
                                    </Col>
                                    <Col sm={4}>{((this.state.track===track.preview && this.state.status==="playing")?<PauseBtn size="50"  onClick={()=>this.play(track.preview)}/>:<PlayBtn size="50"  onClick={()=>this.play(track.preview)}/>)}</Col>
                                </CustRow>
                            </Col>
                        )}
                    </Row>
                </Wrapper>
            )
        }
    }
}