import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import NoteContext from '../NoteContext';
import config from '../config';

class Note extends React.Component {
    static defaultProps = {
        onDeleteNote: () => {}
    }
    static contextType= NoteContext;

    handleDeleteNote = e => {
        e.preventDefault();
        const noteId = this.props.id;

        fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(error => {
                        throw error;
                    })
                }
                return res.json();
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
                    {console.log(dateModified)}
                </h2>
                <div className='Note_modified'>
                    Modified on {format(dateModified, 'do MMM yyyy')}
                </div>
                <button className='delete' onClick={this.handleDeleteNote}>Delete</button>
            </div>
        )
    };
}

export default Note;