import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import NoteContext from '../NoteContext';
import config from '../config';
import PropTypes from 'prop-types';

class Note extends React.Component {
    static defaultProps = {
        id: '',
        name: '',
        modified: '',
        onDeleteNote: () => {}
    }
    static contextType= NoteContext;

    handleDeleteNote = e => {
        e.preventDefault();
        const noteId = this.props.id;

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.API_KEY}`
            }
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    })
                }
            })
            .then(() => {
                this.props.onDeleteNote(noteId);
                this.context.deleteNote(noteId);
            })
            .catch(err => {
                console.error({ err });
            });
    }

    render() {
        const dateModified = new Date(this.props.modified);
        return (
            <div className='Note'>
                <h2>
                    <Link to={`/note/${this.props.id}`}>
                        {this.props.name}
                    </Link>
                </h2>
                <div className='Note_modified'>
                    Modified on {format(dateModified, 'do MMM yyyy')}
                </div>
                <button className='delete' onClick={this.handleDeleteNote}>Delete</button>
            </div>
        )
    };
}

Note.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    modified: PropTypes.string.isRequired,
    onDeleteNote: PropTypes.func.isRequired
};

export default Note;