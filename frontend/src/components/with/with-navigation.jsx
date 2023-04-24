import React from 'react';
import Sidebar from '../Sidebar';

function WithNavigation(props) {
    return <main className='flex'>
        <Sidebar></Sidebar>

        <section className='flex-grow m-4'>
            {props.children}
        </section>
    </main>;
}

export default WithNavigation;