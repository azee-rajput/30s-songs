import React, {Component} from 'react';
import styled from 'styled-components';
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {LaptopCode} from 'styled-icons/fa-solid/LaptopCode';
import {Github} from 'styled-icons/fa-brands/Github';
import {Linkedin} from 'styled-icons/fa-brands/Linkedin';


const Wrapper = styled(Container)`
padding: 20px;
text-align: center;
background: #131419;
color: #777777;
box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
            inset 2px 2px 6px rgba(0, 0, 0, 0.8);
`;

const StyledLink = styled(Link)`
font-size: 3em;
padding: 5px;
color: #ff5500;
transition: 0.5s;
font-weight: bold;
// box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
//             5px 5px 15px rgba(0, 0, 0, 0.5);
&:hover {
    color: #ff5500;
    transition: 0.5s;
    text-shadow: 0px 0px 12px #ff5500;
}
`;

const StyledAnchor = styled("a")`
 font-size: 14pt;
 color: #777777;
 transition:0.5s;
 &:hover{
     text-decoration: none;
     transition: 0.5s;
     color:#ff5500;
 }
`;

export default class Footer extends Component{
    render(){
        return(
            <Wrapper fluid>
                <Row>
                    <Col sm={4}>
                        <h3>Developed by: <span style={{color: "#ff5500"}}>A. Zahir</span></h3>
                        <h4>Find Me On:</h4>
                        <StyledAnchor href="https://findazee.herokuapp.com" target="_blank" rel="noopener noreferrer"><LaptopCode size="30"/> My Portfolio</StyledAnchor>
                        <br/>
                        <StyledAnchor href="https://github.com/azee-rajput" target="_blank" rel="noopener noreferrer"><Github size="30"/> My Github</StyledAnchor>
                        <br/>
                        <StyledAnchor href="https://www.linkedin.com/in/abdul-zahir-rajput-585898152/" target="_blank" rel="noopener noreferrer"><Linkedin size="30"/> My LinkedIn</StyledAnchor>
                    </Col>

                    <Col sm={4}>
                        <StyledLink to="/">30s-Songs</StyledLink>
                        <br/>
                        <StyledAnchor href="https://github.com/azee-rajput/30s-songs" target="_blank" rel="noopener noreferrer"><Github size="60"/></StyledAnchor>
                    </Col>

                    <Col sm={4}>
                        <h3>Powered by</h3>
                        <StyledAnchor href="https://developers.deezer.com/api" target="_blank" rel="noopener noreferrer"><h1>Deezer API</h1></StyledAnchor>
                        <h4>Backend APIs are consumed from Deezer</h4>
                    </Col>
                </Row>
            </Wrapper>
        )
    }
} 