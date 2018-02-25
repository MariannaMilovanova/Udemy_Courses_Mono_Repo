import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {createPost} from '../actions';
import {connect} from 'react-redux';
import { DropdownList } from 'react-widgets';
//import 'react-widgets/dist/css/react-widgets.css';
import _ from 'lodash';


const colors = [ { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' } ]

const FIELDS = {
    planTypeId: {
        type: 'input',
        label: 'Plan Type'
    },
    categories: {
        type: 'input',
        label: 'Enter some categories for this post'
    },
    content: {
        type: 'textarea',
        label: 'Post Contents'
    }
}

const DR = () => <Dropdown search text='Select Language' options={data}/>;

class PostTest extends Component {
    renderField(field) {
        const {meta: {touched, error}} = field;
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
                    {touched ? error : ''}
                </div>
            </div>
        )
    }
    onSubmit(values) {
        this.props.createPost(values, () => {
            this.props.history.push('/');
        });
    }
    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))} onChange={(e)=>console.log()}>
                <Field
                    name="favoriteColor"
                    component={DropdownList}
                    data={colors}
                    valueField="value"
                    textField="color"
                />
                <Field
                    label='Categories'
                    name='categories'
                    component={this.renderField}
                />
                
                <button type='submit' className='btn btn-primary'>Submit</button>
                <Link to='/' className='btn btn-danger'>Cancel</Link>
            </form>
        )
    }
}

function validate(values) {
    //console.log(values) -> {title: 'asds', categories: 'asdad', content: 'dasd'}
    const errors = {};
    //Validate the input from 'values
        _.each(FIELDS, (value, key) =>{
          if(!values[key]) {
              errors[key] = `Enter a ${key}`;
          }
    });

    //if errors is empty -> the form is fine to submit
    //if errors has *any prop, redux form assumes that form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: "PostsNewForm",
    fields: _.keys(FIELDS)
})(
    connect(null, {createPost})(PostTest)
);