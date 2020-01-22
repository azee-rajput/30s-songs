import React,{Component} from 'react';
import styled from 'styled-components';
// import {Container, Row, Col} from 'react-bootstrap';
import {Navbar, Nav, Form, FormControl, Button} from 'react-bootstrap';
import { Redirect, Link} from 'react-router-dom';

const StyledNav = styled(Navbar)`
background: #131419;
text-align: center;
color: #ff5500;
box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
inset 2px 2px 6px rgba(0, 0, 0, 0.8);

.toggle{
    transition: 0.5s;
}

.toggle:hover{
    transition: 0.5s;
    border: 1px solid #ff5500;
    box-shadow: 0px 0px 12px #ff5500;
}

.formArea{
    display: block;
}
`;

const StyledLink = styled(Link)`
padding: 5px;
transition: 0.5s;
border:none;
color: #999999;
margin-right: auto;
margin-left: auto;

&:hover{
    transition: 0.5s;
    text-decoration:none;
    color: #ff5500;
}

h3{
    padding: 5px;
    color: #ff5500;
    transition: 0.5s;
    font-weight: bold;
    box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
    5px 5px 15px rgba(0, 0, 0, 0.5);
}

h3:hover{
    color: #ff5500;
    transition: 0.5s;
    text-shadow: 0px 0px 12px #ff5500;
}

.title{

}
`;

const ContainLinks = styled(Nav)`
//  justify-content: space-evenly;
display: flex;
 margin: auto;
 text-align: center;
 width: 100%;
 justify-content: flex-end;
`;

const StyledForm = styled(Form)`
box-shadow: -5px -5px 10px rgba(255, 255, 255, 0.05),
    5px 5px 15px rgba(0, 0, 0, 0.5);
`;


const StyledButton = styled(Button)`
margin : auto;
border-radius: 0;
border:1px solid #ff5500;
border: none;
background: transparent;
color: #ff5500;
transition: 0.5s;

&:hover{
    transition:0.5s;
    background: #000000;
    color: #ff5500;
    border: 1px solid #ff5500
}
`;

const SearchBox = styled(FormControl)`
background transparent;
color: #ff5500;
border: none;
// border: 1px solid #ff5500;
box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
            inset 2px 2px 6px rgba(0, 0, 0, 0.8);
transition: 0.5s;
border-radius: 0;

&::placeholder{
color : #ff5500;
}

&:focus::placeholder{
color: black;
font-weight: bold;
}

&:focus{
    background: #ff5500;
    color: black;
    transition: 0.5s;
    border-radius: 0;
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.1),
            inset 2px 2px 6px rgba(0, 0, 0, 0.8);
    border: none;
}
`;

export default class Navibar extends Component{

    constructor(props){
        super(props);
        this.entering=this.entering.bind(this);
        this.state={
            search: "",
            change: false,
            clicked: false,
            entered: false,
            params: window.location.pathname,
            paramsChange: false,
        }
    }

    changed(e){
        this.setState({
          search : e.target.value,
        })
    
        if(e.target.value===null||e.target.value===""||e.target.value===undefined){
          this.setState({
            change : false
          })
        }else{
            this.setState({
              change : true
            })
        }
      }

      clicked(){
          if(this.state.change){
            this.setState({
                clicked: true
            })
          }
      }

      entering(e){
        if(e.charCode===13){
            e.preventDefault();
            this.clicked();
          }
      } 
    render(){

        if(this.state.clicked){
            return(
                <Redirect to={"/search/"+ this.state.search}/>
            )
        }
        return(
            <StyledNav variant="dark" expand="lg" sticky="top">
                <StyledLink to="/" className="title"><h3>30s-Songs</h3></StyledLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" className="toggle"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <ContainLinks>
                        <StyledLink to="/genres">Genres</StyledLink>
                        <StyledForm inline className="formArea">
                            <SearchBox type="text" placeholder="Search Song here" value={this.state.search} onChange={(e)=>this.changed(e)} onKeyPress={this.entering}/>
                            <StyledButton type="button" onClick={()=>this.clicked()} variant="outline-light">Search</StyledButton>
                        </StyledForm>
                    </ContainLinks>

                </Navbar.Collapse>
            </StyledNav>
        )
    }
}