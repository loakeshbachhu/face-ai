import React from 'react';


const Navigation = ({onRouteChange, isSignedin}) => {
    return(
        isSignedin ? 
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button className='f5 link dim pa1 pointer white bg-navy br3' onClick={() => onRouteChange('signout')}> Sign Out</button>
        </nav>
        :
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <button className='f5 link dim pa1 pointer white bg-navy br3' onClick={() => onRouteChange('signin')}> Sign In</button>
            <button className='f5 link dim pa1 pointer white bg-navy br3' onClick={() => onRouteChange('register')}> Register</button>
        </nav>
    )
}

export default Navigation;