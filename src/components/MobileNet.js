import React from 'react';
import * as tf from '@tensorflow/tfjs';
import * as mn from '@tensorflow-models/mobilenet';

import './MobileNet.css';

const MobileNet = () => {
    
    return (
        <div className="mobilenet">
            <div className="">
                <h2>MobileNet</h2>
                <img id="img" crossorigin src="https://i.imgur.com/JlUvsxa.jpg" width="227" height="227"/>
            </div>
        </div>
    );
};

export default MobileNet;