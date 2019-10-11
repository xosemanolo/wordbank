import React, { Component } from 'react';
// import { appendFile } from 'fs';

function definitionRow (props) {
        return(
            <div>
                DEEP DOWN
            </div>
        )
}

function DefinitionTable (props) {
    let definitionArray = [];
    for(let i = 0; i < props.elements.length; i++){
        definitionArray.push(<div>{props.elements[i].word} </div>, <div>{props.elements[i].definition} </div>)
    }
        return (
            <div id="inputDef">
                {definitionArray}
            </div>
        )
    
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            value: '',
            data: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleData = this.handleData.bind(this);
    }
    
    handleData(word, definition) {
        return fetch('http://localhost:3000/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({word: word, definition: definition})
        })  
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.value === " "){
            return;
        }
        fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${this.state.value}?key=72cc50de-7167-4225-b40e-6edbbf78af6c`)
        .then((resp) => resp.json())
        .then((data) => {  
            let indexPos = data[0].meta.id.indexOf("1");
            let word = data[0].meta.id;
            let definition = data[0].shortdef[0];
            let event = this.handleData(word, definition);
            return event; 
        })
        .then((res) => res.json())
        .then((mData) => {
            this.setState({
                data: mData
            })
        })  
        .catch(function (error) {  
          console.log('Request failure: ', error);  
        });
        this.setState({ value: ' ' });
    }

    handleChange(event){
        this.setState({value: event.target.value})
    }
        
        

    render(){
        // console.log(this.state.data)
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Definition:
                        <input type="text" value={this.state.value} onChange=       {this.handleChange} required/><input type="submit" value="submit"/>
                    </label>
                </form>
                <DefinitionTable elements={this.state.data} />
                {/* {definitionArray} */}
            </div>
            
        )
    }
}

export default App;