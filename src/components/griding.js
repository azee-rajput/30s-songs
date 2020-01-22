import React, {Component} from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import {Redirect} from 'react-router-dom';
import Navibar from './navbar';

const Wrapper = styled(Container)`
width: 100%;
color: #eaeaea;
margin:0;
padding:10px;
background: #131419;
min-height:90vh;
overflow-x: hidden;
`;

const CustRow = styled(Row)`
padding:20px;
margin:10px;
box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
            5px 5px 15px rgba(0, 0, 0, 0.5);
transition: 0.5s;

&:hover{
    transform: scale(1.01);
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
margin: auto;
margin-bottom: 20px;
margin-top: 20px;

h1{
    text-align: center;
}

img{
    
    display: block;
    margin: auto;
}
`;

export default class Griding extends Component{

    constructor(props){
        super(props);
        this.state={
            data:[],
            url:props.url,
            heading: props.heading,
            headImage:"",
            postfix: props.postfix || "",
            route:"",
            extra: props.extra,
            type:props.type,
        }
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        fetch(this.state.url)
        .then(response=>response.json())
        .then(data=>this.setState({data:data.data}))

        if(!this.state.heading){
            fetch("https://cors-anywhere.herokuapp.com/https://api.deezer.com/genre/"+this.state.extra)
            .then(res=>res.json())
            .then(name=>this.setState({heading:name.name, headImage:name.picture_medium}))
        }
    }

    goTo(id){
        if(this.state.type==="genre"){
            this.setState({route:"/genre/"+id})
        }else if(this.state.type==="artgenre"){
            this.setState({route:"/artist/"+id})
        }
    }

    render(){
        if(this.state.route!==""){
            return (<Redirect to={this.state.route}/>)
        }
        if(this.state.data.lenght < 1){
            return(
                <div>Loading Data... Please Wait</div>
            )
        }else{
            return(
                <Wrapper fluid>
                    <Navibar/>
                    <Heading>
                        <Col sm={12}><h1>{this.state.heading}</h1></Col>
                        <Col sm={12}>{(this.state.headImage!==""?<img src={this.state.headImage} alt={this.state.heading}/>:"")}</Col>
                    </Heading>
                    <Row>
                        {this.state.data.map((item)=>
                        <Col sm={6}>
                            <CustRow onClick={()=>this.goTo(item.id)}>
                                <Col sm={2}><img src={item.picture_small} alt={item.name}/></Col>
                                <Col sm={10}><h3>{item.name+this.state.postfix}</h3></Col>
                            </CustRow>
                        </Col>
                        )}
                    </Row>
                </Wrapper>
            )
        }
    }
}