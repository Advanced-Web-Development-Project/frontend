import React from 'react';
import { useAuth } from '../../gen_components/AuthContexts';

function Home() {

    const { login, accessToken } = useAuth();

    console.log("in HOME PAGE @@@ - ", accessToken)
    return (
        <div>
            <h1>Home Screen</h1>
        </div>
    );
}

export default Home;