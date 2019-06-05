import React, { Component } from "react";
import '../App.css';
import { Button, Container, ButtonGroup } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Domina from "./domina";
import axios from "axios";
const background = require('../igra.jpg');
const divStyle = {
    
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover'
    
};

class homepage extends Component {

    constructor(props) {
        super(props);
        this.state = { 
          modal: false,
          domina: false,
          kat1: 0,
          kat2: 0,
          niz: [],
          sve:[],
          score: 0,
          r: 0,
          bottom: 200,
          left: 0,
          i: 1,
          zadnji: 0,
          ruka: 0,
          koliko_pomaknutih : 0
        };
        var i, j;
        var domine = [];
        for (i = 1; i < 7; i++) { 
            for (j = 1; j < 7; j++){
                domine[(i-1)*6 + j-1] = i * 10 + j;
            }
        }
        this.state.niz = domine;
      }
    
    moveDomina = (id) => {

        document.getElementById(id).style.position = "absolute";
        if (this.state.i===1){
            document.getElementById(id).style.bottom = this.state.bottom + 'px';
            document.getElementById(id).style.left = this.state.left + 'px';
            
        }
        
        else if (this.state.zadnji === this.state.sve[id][1]){
            console.log("asdfgh");
            document.getElementById(id).style.transform = "rotate(180deg)";
            var dim = this.state.left + 50;
            var mid = this.state.bottom + 50;
            document.getElementById(id).style.left = dim + 'px';
            document.getElementById(id).style.bottom = mid + 'px';
            this.setState({
                left : dim,
                bottom: mid
            });
        }

        else{
            //console.log(this.state.i);
            var dim = this.state.left + 50;
            var mid = this.state.bottom + 50;
            document.getElementById(id).style.left = dim + 'px';
            document.getElementById(id).style.bottom = mid + 'px';
            this.setState({
                left : dim,
                bottom: mid
            });
        }
        this.setState({
            i : this.state.i + 1
        });

        if (this.state.i === 11){
            alert("Pobjeda!");
            //tu ide poziv metode
            /*axios({
                method: "POST",
                url:
                  "http://localhost:59487/api/domino/score",
                headers: { "Content-Type": "application/json"},
                body: {
                    points: this.state.score
                }
              }).then(res => {
                this.history.push('/');

              }).catch(err => {
                if (!err.response) {
                  alert('Nije moguće komunicirati sa poslužiteljem! Provjerite da li je upaljen..');
                  return;
                }    
                const code = err.response.status;    
                if (code >= 500) {
                    alert('Problem sa serverom! Pogledajte ispise..');
                    return;
                }    
                alert('Nepoznata greška! ' + JSON.stringify(err));
              });
            console.log("prošao");*/
        }
        
    }

    componentDidMount = () =>{
        document.getElementById("jedna").disabled=true;
    }


    giveStarters = () => {
        this.giveRandom();
        this.giveRandom();
        this.giveRandom();
        document.getElementById("poc").disabled=true;
        document.getElementById("jedna").disabled=false;
    }


    giveRandom = () => {
        
        if (this.state.ruka === 6){
            //slati score AXIOS
            alert("Previše u ruci, ne može više!");
            return;
        }
        var r = Math.floor(Math.random() * this.state.niz.length);
        var prva = this.state.niz[r] % 10;
        var druga = (this.state.niz[r]-prva) / 10;
        this.state.niz.splice(r, 1)
        //console.log(prva, druga);
        //console.log(this.state.niz);
        

        var s = this.state.sve;
        s.push([prva, druga]);
        //console.log(s);

        this.setState({
            domina: true,
            kat1: prva,
            kat2: druga,            
            sve: s,
            r: r,
            ruka: this.state.ruka + 1        
        });
        console.log(this.state.ruka);
        
    }   

    setZadnji = (zad) => {
        this.setState({
            zadnji: zad

        });
    }

    smanji = (zad) => {
        this.setState({
            ruka: this.state.ruka - 1

        });
    }

    toggle = () => {
        
        this.setState({
          modal: !this.state.modal            
        });
    };

    handleBack =() => {
        this.props.history.push('/');
    }


    handleScoreChange = (s) => {
        this.setState({
            score: this.state.score + s
        });
        //console.log(this.state.score);
    }

    render() {

        return (
            <div className="App-header" style={divStyle}>
                <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"  rel="stylesheet"  type='text/css'></link>
                
                <div>
                    <div style={{"position": "absolute", "left": "0",  "margin-left": "20px", "top":"2%"}}>
                        <Button onClick={this.handleBack} >Natrag</Button>
                    </div>
                    <div style={{"position": "absolute", "right": "10%",  "margin-left": "20px", "top":"2%"}}>
                        <Button color="danger" id = "jedna" onClick={this.giveRandom} >Nova pločica</Button>
                    </div>
                    <div style={{"position": "absolute", "right": "10%",  "margin-left": "20px", "top":"10%"}}>
                        <Button color="danger" id = "poc" onClick={this.giveStarters} >Uzmi početne</Button>
                    </div>

                    <Container style={{"position":"absolute", "bottom":"10%", "left":"10%"}}>
                    <ButtonGroup style={{"position":"fixed", "height":"50px"}}>
                    {this.state.sve.map((jedan, index) => (                            
                            this.state.domina ? <Domina identifikator = {index} smanji={this.smanji} zadnji={this.state.zadnji} setZadnji = {this.setZadnji} prva={jedan[0]} druga={jedan[1]} moveDomina={this.moveDomina} handleScoreChange={this.handleScoreChange}/> : null
                              
                    ))}
                    </ButtonGroup>                   

                    </Container>

                    <Container style={{"position":"absolute", "bottom":"30%", "right":"25%", width:"15%", height:"40%"}} className="App-tekst">
                        <h3 style={{ color: "#000000" }}>
                            Trenutni rezultat: {this.state.score}
                        </h3>
                    </Container>
                    </div>
                

                
                
                
            </div>



        );
    };

};

export default homepage;