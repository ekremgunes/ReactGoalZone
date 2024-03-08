import React from 'react'
import '../../../public/assets/css/Loading.css'; // CSS dosyasını import et


const Loading = () => {

    return (
        <React.Fragment>
            <div id="loadingOverlay"></div>
            <center className='centerLoader'>
                <div className="loader" id="loader"></div>
                <div className="loader" id="loader2"></div>
                <div className="loader" id="loader3"></div>
                <div className="loader" id="loader4"></div>
                <span id="text">LOADING...</span><br>
                </br>
            </center>
        </React.Fragment>
    )
}

export default Loading