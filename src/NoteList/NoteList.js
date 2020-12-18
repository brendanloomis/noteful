import React from 'react';
import Note from '../Note/Note';
import './NoteList.css';

class NoteList extends React.Component {
    render() {
        const notes = this.props.notes.map(note => (
            <li key={note.id}>
                <Note 
                    id={note.id}
                    name={note.name}
                    modified={note.modified}
                />
            </li>
        ));

        return (
            <div className='NoteList'>
                <ul>
                    {notes}
                </ul>
                <div>
                    <button className='addNote'>Add Note</button>
                </div>
            </div>
        );
    };
}

NoteList.defaultProps = {
    notes: []
}

export default NoteList;