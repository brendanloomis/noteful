import React from 'react';
import './NavNotePage.css';

class NavNotePage extends React.Component {
    render() {
        return (
            <div className='NavNotePage'>
                <button onClick={() => this.props.history.goBack()} className='goBack'>Go Back</button>
                <h3>{this.props.folder.name}</h3>
            </div>
        );
    };
}

export default NavNotePage;