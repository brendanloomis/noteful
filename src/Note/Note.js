import React from 'react';
import './Note.css';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

class Note extends React.Component {
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
                    Modified on {format(dateModified, 'Do MMM yyyy')}
                </div>
                <button className='delete'>Delete</button>
            </div>
        )
    };
}

export default Note;