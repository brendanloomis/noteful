import React from 'react';
import NoteContext from '../NoteContext';
import ValidationError from '../ValidationError';
import config from '../config';
import PropTypes from 'prop-types';
import './AddNote.css';

class AddNote extends React.Component {
    state = {
        name: {
            value: '',
            touched: false
        },
        content: {
            value: '',
            touched: false
        }
    };

    static contextType = NoteContext;

    updateName(name) {
        this.setState({name: {
            value: name,
            touched: true
        }});
    }

    updateContent(content) {
        this.setState({content: {
            value: content,
            touched: true
        }});
    }

    updateFolderId(folderId) {
        this.setState({folderId: {
            value: folderId,
            touched: true
        }});
    }

    validateName() {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return 'Name is required';
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if(content.length === 0) {
            return 'Content is required';
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        const note = {
            name: this.state.name.value,
            content: this.state.content.value,
            folderId: event.target['note-folder'].value,
            modified: new Date()
        };
        console.log(note.folderId)
        
        fetch(`${config.API_ENDPOINT}/notes`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
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
                this.context.addNote(data);
                this.props.history.push('/');
            })
            .catch(error => {
                console.error(error);
            });
    }

    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const folders = this.context.folders.map(folder => 
            <option key={folder.id} value={folder.id}>
                {folder.name}
            </option>
        );
        return (
            <form className='AddNote' onSubmit={this.handleSubmit}>
                <h2>Add Note</h2>
                <div className='form-group'>
                    <label htmlFor='note-name'>Name</label>
                    <input 
                        type='text' 
                        name='note-name' 
                        id='note-name' 
                        onChange={e => this.updateName(e.target.value)}
                    />
                    {this.state.name.touched && <ValidationError message={nameError} />}
                </div>
                <div className='form-group'>
                    <label htmlFor='note-content'>Content</label>
                    <textarea 
                        name='note-content' 
                        id='note-content' 
                        onChange={e => this.updateContent(e.target.value)}
                    />
                    {this.state.name.touched && <ValidationError message={contentError} />}
                </div>
                <div className='form-group'>
                    <label htmlFor='note-folder'>Folder</label>
                    <select 
                        name='note-folder' 
                        id='note-folder'
                    >
                        {folders}
                    </select>
                </div>
                <button 
                    type='submit'
                    className='note-submit'
                    disabled={this.validateName() || this.validateContent()}
                >
                    Add Note
                </button>
            </form>
        );
    }
}

AddNote.defaultProps = {
    history: {
        push: () => {}
    }
};

AddNote.propTypes = {
    history: PropTypes.shape({
        push: () => {}
    })
};

export default AddNote;