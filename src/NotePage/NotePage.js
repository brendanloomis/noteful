import React from 'react';
import Note from '../Note/Note';
import NoteContext from '../NoteContext';
import { findNote } from '../noteFunctions';
import PropTypes from 'prop-types';
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

NotePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func
    }),
    match: PropTypes.shape({
        params: PropTypes.object
    })
};

export default NotePage;