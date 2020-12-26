import React from 'react';
import NoteContext from '../NoteContext';
import config from '../config';
import './AddFolder.css';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
    state = {
        name: '',
        touched: false
    }
    static contextType = NoteContext;

    updateName(name) {
        this.setState({name: name, touched: true});
    }

    validateName() {
        const name = this.state.name.trim();
        if(name.length === 0) {
            return 'Name is required';
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const folder = {
            name: this.state.name
        };

        fetch(`${config.API_ENDPOINT}/folders`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(folder)
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    });
                }
                return res.json();
            })
            .then(data => {
                this.context.addFolder(data);
                this.props.history.push(`/folder/${data.id}`);
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const nameError = this.validateName();
        return (
            <form className='AddFolder' onSubmit={this.handleSubmit}>
                <h2>Add Folder</h2>
                <div className='form-group'>
                    <label htmlFor='folder-name'>Name</label>
                    <input 
                        type='text' 
                        name='folder-name' 
                        id='folder-name' 
                        onChange={e => this.updateName(e.target.value)}
                    />
                    {this.state.touched && <ValidationError message={nameError} />}
                </div>
                <button 
                    type='submit' 
                    className='folder-submit'
                    disabled={this.validateName()}
                >
                    Add Folder
                </button>
            </form>
        );
    }
};

AddFolder.defaultProps = {
    history: {
        push: () => {}
    }
}

AddFolder.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    })
};

export default AddFolder;