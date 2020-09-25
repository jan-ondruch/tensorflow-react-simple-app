/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import * as mn from '@tensorflow-models/mobilenet';

import './MobileNet.css';

// Earlier, when we wanted to use hooks - include any state to it, 
// we had to transform the function componenent into class.
// This is no longer necessary (since 16.8.0).
// React Native supports them, as well (since 0.59).
// You can still use the old solution, it is 100% bw compatible.

const MobileNet = () => {

    // Declare a new state variable called "clsResult".
    // Before 2018, we would need to write a constructor here and then change the
    // state via "this.state.clsResult".
    //
    // Now, we just use the new useState hook, that lets us add React state to
    // function components.
    //
    // Why the square brackets? Array destructing syntax.
    //
    // We just pass an initial state to this function at its definition.
    // "clsResult" is an argument, "setClsResult" is a function.
    const [clsResult, setClsResult] = useState([]);

    // You can think of the useEffect Hook as componentDidMount, 
    // componentDidUpdate, and componentWillUnmount combined.
    //
    // By default, useEffect runs after every render -
    // "things that happen after render".
    //
    // The empty array ensures this hook will run only on an initial render,
    // otherwise setUpForInterface() is called in loop.
    // Alternatively, we can add there an argument, on which the Hook
    // will be called again.
    useEffect(() => {
        console.log('useEffect here!');
        setUpForInterface();
    }, []);

    // Load the MobileNet model and make a prediction through the model on an image
    const setUpForInterface = () => {
        
        console.log("Loading mobilenet...");
        let net;

        // Create an scoped async function in the Hook
        // Load the net
        async function loadMobileNet() {
            net = await mn.load();
            console.log("Successfully loaded model!");
            classifyNet();
        }
        loadMobileNet();

        // Classify the image and save the results into the state
        async function classifyNet() {
            const imgEl = document.getElementById('mnimg');
            const results = await net.classify(imgEl);
            results.map(r => setClsResult(clsResult => [...clsResult, r]));
        }
    };


    return (
        <div className="mobile-net">
            <div>
                <h2>MobileNet</h2>
                <img 
                    id='mnimg' 
                    src={process.env.PUBLIC_URL + '/images/MobileNetImage.jpg'} 
                    alt="MobileNet image" />
                <h4>Classification result</h4>
                <div>
                    {
                        clsResult.length ?
                            clsResult.map((val, index) => {
                                return (
                                    <div key={index} className="row">
                                        <input
                                            className="field field-x column"
                                            value={val.className}
                                            name="className"
                                            data-index={index} />
                                    
                                        <input 
                                            className="field field-y column"
                                            value={val.probability}
                                            name="probability"
                                            data-index={index} />
                                    </div>
                                );
                            })
                            :
                        <p>Classifying...</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default MobileNet;