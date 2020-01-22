import React,{Component} from 'react';
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
text-align: center;
margin: auto;

.areaMain{
    padding: 20px;
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
    inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    margin: auto;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}


#img{
    width: 100%;
    height: auto;
    border: none;
border-radius: 50%;
box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
            5px 5px 15px rgba(0, 0, 0, 0.5);
}
`;

const PlayBtn = styled(Play)`
margin-top:10px;
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
margin-top:10px;
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

const CustLink = styled(Link)`
text-decoration: none;
color:#555555;
font-size: 16px;
// text-align: right;
text-align: center;
`;

let audio;

export default class Detail extends Component{
    constructor(props){
        super(props);
        this.state={
            data:[],
            params:this.props.match.params.info,
            url:"https://cors-anywhere.herokuapp.com/https://api.deezer.com/track/",
            route:"",
            playing:"stopped",
            loaded: false,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        fetch(this.state.url+this.state.params)
        .then(response=>response.json())
        .then(data=>this.setState({data:data}))
    }

    componentDidUpdate(){
        if(!this.state.loaded){
            this.setState({loaded:true})
        }
    }

    play(track){
        if(this.state.playing==="stopped"){
            audio = new Audio(track);
            this.setState({playing: "playing"});
            audio.play();
        }else if(this.state.playing==="paused"){
            audio.play();
            this.setState({playing: "playing"});
        }else{
            audio.pause();
            this.setState({playing: "paused"});
        }
        
    }

    componentWillUnmount(){
        if(this.state.playing==="playing"){
            audio.pause();
        }
    }

    render(){
        if(!this.state.loaded){
            return (<h1>Loading... please wait</h1>)
        }else{
            return(
                <Wrapper fluid>
                    <Navibar/>
                    <Row className="areaMain">
                        <Col sm={6} className="mt-2"><img src={this.state.data.artist.picture_big} id="img" alt={this.state.data.artist.name}/></Col>
                        <Col sm={6}>
                            <Row>
                                <Col sm={12}>
                                    <h1 className="mt-2">{this.state.data.title}</h1>
                                    {(this.state.data.album)?<h3 className="mt-2">{this.state.data.album.title}</h3>:null}
                                </Col>
                                <Col sm={12} >
                                    <h4>{this.state.data.artist.name}</h4>
                                    <CustLink to={"/artist/"+this.state.data.artist.id}>More Tracks<SubdirectoryLeft size="30"/></CustLink>
                                </Col>
                                <Col sm={12}>
                                    {this.state.data.contributors.length < 2 ? null : this.state.data.contributors.slice(1,20).map((artist, index, arr)=>
                                        <h5 className="mt-2">{artist.name+((index===arr.length-1)?"":",")}</h5>
                                    )}
                                </Col>
                                <Col sm={12}>
                                    {(this.state.playing==="paused" || this.state.playing==="stopped")?<PlayBtn size="100" onClick={()=>this.play(this.state.data.preview)}/>:<PauseBtn size="100" onClick={()=>this.play(this.state.data.preview)}/>}
                                </Col>
                                <Col className="mt-3 mb-2" sm={12}><a href={this.state.data.link} target="_blank" rel="noopener noreferrer">Deezer link</a></Col>
                            </Row>
                        </Col>
                    </Row>
                </Wrapper>
            )
        }
    }
}