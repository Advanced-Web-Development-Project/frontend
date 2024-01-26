import React from 'react'
import { GoogleLogin } from 'react-google-login'

const clientId = '1089423690952-g5nd19rjtjl7r5hvgqhgdgndk1jtm5on.apps.googleusercontent.com'

function LoginGoogleButton() {

    const handleSuccess = (res: any) => {
        console.log(res.profileObj)
    }
    const handleFailure = (event: any) => {
        console.log(event)
    }
    return (
        <div id='signInButton'>
            <GoogleLogin
                clientId={clientId}
                buttonText='Login'
                onSuccess={handleSuccess}
                onFailure={handleFailure}
                cookiePolicy='single_host_origin'
                isSignedIn={true} />

        </div>
    )
}

export default LoginGoogleButton
