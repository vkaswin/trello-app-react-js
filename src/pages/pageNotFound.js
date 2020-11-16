import React from 'react';
import {NavLink} from 'react-router-dom'

const pageNotFound = () => {
    return (
        <div>
            <h1>Page Not Found</h1>
            <NavLink to="/homepage">Go Back</NavLink>
        </div>
    );
};

export default pageNotFound;