import React from "react";
//** import React, {Component} from "react"
//*** (can be deleted) const Component = React.Component;

// functionanal component
// const SearchBar = () => {
//     return <input />; //React.createElement
// };

//another way class based component

class SearchBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = { term: "" };
    }
    //other way without React.
 //render method - function
    render() {
            //return <input onChange = {this.onInputChange} />}
        //return <input onChange = {(event) => console.log(event.target.value)} />; 
        //this.state.term = event.target.value; //BAD!!
        return (
            <div className='search-bar'> 
                <input
                    value = {this.state.term}
                    onChange = {event => this.onInputChange(event.target.value)} /> 
            </div>
            );
    }
    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
    /*{(event) => this.setState({ term: event.target.value})} */
    //Value of the input: {this.state.term}
    //альтернатива в обычном варианте? 
    //var x = document.getElementById("mySearch").value;
    //document.getElementById("demo").innerHTML = x;

    // onInputChange(event)  {
    //     console.log(event.target.value);
    //     //console.log(event);
    // }
}

//whenever we create a class component we must 
//always define a render method and return some jsx

export default SearchBar;

//handling an events in React has 2 steps
//First we declare an EventHandler (function) - that should be run whenever an event occurs
//we pass the event handler to the element that we want to monitor for events




