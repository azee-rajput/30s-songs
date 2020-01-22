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
`;

const Heading = styled(Row)`
box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
            inset 2px 2px 6px rgba(0, 0, 0, 0.8);
padding:20px;
margin: 10px;

h1{
    margin: auto;
}
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

const CustLink = styled(Link)`
text-decoration: none;
color: #ffffff;
font-size: 16px;
text-align: center;
transition: 0.5s;
margin:auto;

&:hover{
    text-decoration: none;
    color:#707070;
    box-shadow: -1px -1px 10px rgba(0, 0, 0, 0.5),
                1px 1px 10px rgba(0, 0, 0, 0.5),
                1px -1px 10px rgba(0, 0, 0, 0.5),
                -1px 1px 10px rgba(0, 0, 0, 0.5);
    transition:0.5s;
    cursor: pointer;
}
`;


let audio;
export default class Search extends Component{

    constructor(props){
        super(props);
        this.state={
            params: this.props.match.params.search,
            paramsChange: false,
            data:[],
            url:"https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=",
            track:"",
            status:"stopped",
            route:"",
        }
    }

    componentDidMount(){
        fetch(this.state.url+this.state.params)
        .then(response=>response.json())
        .then(data=>this.setState({data: data.data.filter(item=>item.type==="track")}))
    }

    componentDidUpdate(){
        if(this.state.params!==this.props.match.params.search){
            if(this.state.status==="playing"){
                audio.pause();
                this.setState({status:"stopped"});
            }
            fetch(this.state.url+this.props.match.params.search)
            .then(response=>response.json())
            .then(data=>this.setState({data: data.data.filter(item=>item.type==="track")}));
            this.setState({params:this.props.match.params.search, paramsChange: true});
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

    componentWillUnmount(){
        if(this.state.status==="playing"){
            audio.pause();
        }
    }

    render(){
        if(this.state.data.length < 1){
            return(
                <div>
                    <Navibar/>
                    <h1>{this.state.params+" not found"}</h1>
                </div>
            )
        }else if(this.state.paramsChange){
            this.setState({paramsChange:false});
            return null;
        }else{
            return(
                <Wrapper fluid>
                    <Navibar/>
                    <Heading><h1>{"Results for "+this.state.params}</h1></Heading>
                    <Row>
                        {this.state.data.map((track)=>
                            <Col sm={6}>
                                <CustRow>
                                    <Col sm={3}><img src={track.artist.picture_small} alt={track.artist.name}/></Col>
                                    <Col sm={6}>
                                        <Row>
                                            <Col sm={12}>
                                                    <CustLink to={"/track/"+track.id}>
                                                        <h3>{track.title}<SubdirectoryLeft size="30"/></h3>
                                                    </CustLink>
                                                </Col>
                                            <Col sm={12}>
                                                <h5>
                                                    <CustLink to={"/artist/"+track.artist.id}>{track.artist.name}<SubdirectoryLeft size="30"/></CustLink>
                                                </h5>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col sm={3}>{((this.state.track===track.preview && this.state.status==="playing")?<PauseBtn size="50" onClick={()=>this.play(track.preview)}/>:<PlayBtn size="50" onClick={()=>this.play(track.preview)}/>)}</Col>
                                </CustRow>
                            </Col>
                        )}
                    </Row>
                </Wrapper>
            )
        }
    }
}