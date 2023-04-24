import React from'react' ;
import Sidebar from '../Sidebar';

function WithNavigation(props) {
    return <>
        <Sidebar></Sidebar>
        
        
        {props.children}
    </>;    
}

export default WithNavigation;