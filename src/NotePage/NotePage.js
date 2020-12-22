import React from 'react';
import Note from '../Note/Note';
import NoteContext from '../NoteContext';
import { findNote } from '../noteFunctions';
import './NotePage.css';

class NotePage extends React.Component {
    static contextType = NoteContext;

    handleDelete = noteId => {
        this.props.history.push('/');
    }

    render() {
        const { noteId } = this.props.match.params;
        const note = findNote(this.context.notes, noteId) || {}
        return (
            <div className='NotePage'>
                <Note 
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                    onDeleteNote={this.handleDelete}
                />
                <div className='NotePage_content'>
                    <p>{note.content}</p>
                </div>
            </div>
        );
    };
}

export default NotePage;