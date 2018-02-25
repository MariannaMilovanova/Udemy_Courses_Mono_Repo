import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchWheather } from '../actions/index';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.onInputChange = this.onInputChange.bind(this);
        this.onFromSubmit = this.onFromSubmit.bind(this);
    }
    onInputChange(event) {
        this.setState({term: event.target.value})
    }
    onFromSubmit(event) {
        event.preventDefault();

        this.props.fetchWheather(this.state.term);
        this.setState({ term:'' });
    }
    render() {
        return (
            <form className='input-group'
                onSubmit={this.onFromSubmit}>
                <input 
                    placeholder='Get a five-day forecast in your favorite cities'
                    className='form-control'
                    onChange={this.onInputChange}
                    value={this.state.term}/>
                <span className='input-group-btn' >
                    <button type='submit' className='btn btn-secondary'>Submit</button>
                </span>
            </form>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchWheather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);