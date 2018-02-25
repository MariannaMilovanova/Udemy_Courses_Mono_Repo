import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { createPost } from '../actions';
import { connect } from 'react-redux';

class PostNew extends Component {
    renderField(field){
        //field need ti add eventhandling, without refs, it is single piece of state
        //field.input object that have several eventhandlers and props(value of input, onChange, onBlur, onFocus, etc)
        //instead we can use like onChange={field.input.onChange}
        //errors object automatically add to field by prop name = 'title' errors from errors.title
        const { meta: {touched, error} } = field;
        //now can delete field where field.meta
        const className = `form-group ${touched && error ? 'has-danger' : ''}`
        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    //onChange={field.input.onChange}
                    //onFocus={field.input.onFocus}
                    {...field.input}
                    type="text"
                />
                <div className="text-help">
                    {touched ? error: ''}
                </div>
            </div>
        )
    }
    onSubmit(values){
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }
    render(){
        const { handleSubmit } = this.props;
        return(
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label='Title'
                    //what piece of state this component will produce
                    name='title'
                    component={this.renderField}
                />
                <Field
                    label='Categories'
                    name='categories'
                    component={this.renderField}
                />
                <Field
                    label='Post Content'
                    name='content'
                    component={this.renderField}
                />
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
            </form>
        )
    }
}

function validate(values){
    //console.log(values) -> {title: 'asds', categories: 'asdad', content: 'dasd'}
    const errors = {};
    //Validate the input from 'values
    if(!values.title) {
        errors.title = "Enter a title!"
    }
    if(values.title && values.title.length < 3) {
        errors.title = "Title have to be at least 3 characters!"
    }
    if(!values.categories) {
        errors.categories = "Enter some categories"
    }
    if(!values.content) {
        errors.content = "Enter some content please"
    }

    //if errors is empty -> the form is fine to submit
    //if errors has *any prop, redux form assumes that form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: "PostsNewForm"
})(
    connect(null, {createPost})(PostNew)
);