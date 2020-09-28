/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'

import * as mn from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs'

import { Box, Typography, } from '@material-ui/core'

import './MobileNet.css'

// Earlier, when we wanted to use hooks - include any state to it, 
// we had to transform the function componenent into class.
// This is no longer necessary (since 16.8.0).
// React Native supports them, as well (since 0.59).
// You can still use the old solution, it is 100% bw compatible.
// We can use these new hooks in functional components.

// Functional Component or Stateless Component
// (opposed to a Class Component or Stateful Component)
// No "render()" used in these components.
// (opposed to a Class Component, which must have it)
// Use functional components as much as you can, because they are
// easier to read, test, maintain.
const MobileNet = () => {

    // Declare a new state variable called "clsImage".
    // Before 2018, we would need to write a constructor here and then change the
    // state via "this.state.clsImage".
    //
    // Now, we just use the new useState hook, that lets us add React state to
    // function components.
    //
    // Why the square brackets? Array destructing syntax.
    //
    // We just pass an initial state to this function at its definition.
    // "clsImage" is an argument, "setClsImage" is a function.
    const [clsImage, setClsImage] = useState([])
    const [clsVideo, setClsVideo] = useState([])

    
    // You can think of the useEffect Hook as componentDidMount, 
    // componentDidUpdate, and componentWillUnmount combined.
    //
    // Hooks can be used to replicated lifecycle behavior.
    //
    // By default, useEffect runs after every render -
    // "things that happen after render".
    //
    // The empty array ensures this hook will run only on an initial render,
    // otherwise setUpForInterface() is called in loop.
    // Alternatively, we can add there an argument, on which the Hook
    // will be called again.
    useEffect(() => {
        setUpInterface()
    }, [])
    
    // Component vars
    // Don't know any better know where to put them (use them as "attributes")
    // I don't think putting them into state would be a good idea...
    let net
    let webcam

    // Load the MobileNet model and call the loadWebCam function.
    const setUpInterface = () => {
        // Create an scoped async function in the Hook
        // Load the net
        // Async/await is a syntax sugar above promises, making them easier to use.
        // The word "async" in front of the function name means the function will always
        // return a promise. Even non-promises are wrapped and returned as promises.
        // The keyword "await" means that JS waits until the promise resolves and then 
        // returns its result.
        // The code literally pauses at that line and does not continue further.
        async function loadMobileNet() {
            net = await mn.load()
            console.log("Successfully loaded model!")

            loadWebCam()
        }

        loadMobileNet()
    }

    // Load the web cam
    async function loadWebCam() {
        const webcamElement = document.getElementById('webcam')    // const is block-scoped
        webcam = await tf.data.webcam(webcamElement)
        console.log("Webcam is loaded!")

        videoClassification(true)
        classifyImage()
    }

    // Classify the image and save the results into the state
    async function classifyImage() {
        const imgEl = document.getElementById('mnimg')
        const results = await net.classify(imgEl)
        setClsImage(results)
    }

    // Video classification.
    async function videoClassification() {
        while(true) {
            const img = await webcam.capture()
            const result = await net.classify(img)

            // Just save the last classification.
            // setClsVideo(result)
            
            // Save all classifications.
            result.map(r => setClsVideo(clsVideo => [...clsVideo, r]))

            // Dispose the tensor to release the memory.
            img.dispose()

            // Give some breathing room by waiting for the next 
            // animation frame to fire.
            await sleep(3000)
            await tf.nextFrame()
        }
    }

    const sleep = ms => new Promise(res => setTimeout(res, ms))

    return (
        <Box className="mobile-net">
            <Box>
                <Typography variant="h2">MobileNet</Typography>
                <Box className="video-classification">
                    <Typography variant="h3">Video image classification</Typography>
                    <video autoPlay playsInline muted id="webcam" width="224" height="224"></video>
                    <Box>
                        {
                            clsVideo.length ?
                            <Box>
                                <Typography variant="body1">{clsVideo[clsVideo.length-1].className}</Typography>
                                <Typography variant="body2">
                                    p: {clsVideo[clsVideo.length-1].probability.toFixed(2)}
                                </Typography>
                            </Box>
                                :
                            <Box className="wait-for-video">
                                <Loader
                                className="loader"
                                type="Grid"
                                color="#00DE00"
                                height={156}
                                width={156}
                                />
                                <Typography variant="body1">Loading...</Typography>
                            </Box>
                        }
                    </Box>
                </Box>
                <Box className="image-classification">
                    <Typography variant="h3">Image classification</Typography>
                    <img 
                        id='mnimg' 
                        src={process.env.PUBLIC_URL + '/images/MobileNetImage.jpg'} 
                        alt="MobileNet image" />
                    <Box>
                    <Typography variant="h4">Classification results</Typography>
                        {
                            clsImage.length ?
                                clsImage.map((val, index) => {
                                    return (
                                        <Box key={index} className="row">
                                            <Box
                                                className="field field-x column"
                                                name="className"
                                                data-index={index}>
                                                {val.className}
                                            </Box>
                                        
                                            <Box 
                                                className="field field-y column"
                                                value={val.probability}
                                                name="probability"
                                                data-index={index}>
                                                {val.probability.toFixed(2)}
                                            </Box>
                                        </Box>
                                    )
                                })
                                :
                            <Loader
                            className="loader"
                            type="ThreeDots"
                            color="#00DE00"
                            height={32}
                            width={32}
                            />
                        }
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default MobileNet