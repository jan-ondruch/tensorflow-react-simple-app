/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from 'react'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'
import Header from './Header'

import * as mn from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs'

import { Box, Typography, Card, CardContent, Button, makeStyles, } from '@material-ui/core'

import './MobileNet.css'

const useStyles = makeStyles(() => ({

}))

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
// easier to read, test, maintain. If you don't have to use classes
// don't use them!
const MobileNet = () => {

    const classes = useStyles()

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
    const [captureVideo, setCaptureVideo] = useState(true)
    const componentIsMounted = useRef(true)
    const camera = useRef({
        net: {},
        webcam: {}
    })

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
        // TODO: add a cancellation token for async
        async function loadMobileNet() {
            try {
                camera.current.net = await mn.load()
                console.log('Successfully loaded model!')

                if (componentIsMounted.current) {
                    loadWebCam()
                }
            } catch(err) {
                console.error(err)
            }
        }
        loadMobileNet()
        
        async function loadWebCam() {
            const webcamElement = document.getElementById('webcam')    // const is block-scoped
            camera.current.webcam = await tf.data.webcam(webcamElement)
            console.log("Webcam is loaded!")
    
            if (componentIsMounted.current) {
                videoClassification()
                classifyImage()
            }
        }

        async function videoClassification() {
            while(captureVideo && componentIsMounted.current) {
                const img = await camera.current.webcam.capture()
                const result = await camera.current.net.classify(img)
    
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

        return () => {
            componentIsMounted.current = false
            console.log('Bye!')
        }
    }, [])

    // Classify the image and save the results into the state
    async function classifyImage() {
        const imgEl = document.getElementById('mnimg')
        const results = await camera.current.net.classify(imgEl)
        setClsImage(results)
    }

    const sleep = ms => new Promise(res => setTimeout(res, ms))

    return (
        <React.Fragment>
            <Header name="Object Recognition" />
            <Box
                align="center" 
                px={{ xs: 2, sm: 12, md: 16, lg: 64, xl: 86 }}
                pt={{ xs: 4, lg: 6, xl: 6 }}
            >
                <Box>
                    <Typography variant="subtitle1">Video image classification</Typography>
                    <video autoPlay playsInline muted id="webcam" width="224" height="224"></video>
                    <Box>
                        {
                            clsVideo.length ?
                            <Box>
                                <Typography variant="body1">{clsVideo[clsVideo.length-1].className}</Typography>
                                <Typography variant="body2">
                                    Probability: {clsVideo[clsVideo.length-1].probability.toFixed(2)}
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
                    <Typography variant="subtitle1">Image classification</Typography>
                    <img 
                        id='mnimg' 
                        src={process.env.PUBLIC_URL + '/images/MobileNetImage.jpg'} 
                        alt="MobileNet image" />
                    <Box>
                    <Typography variant="subtitle2">Result</Typography>
                        {
                            clsImage.length ?
                                // clsImage.map((val, index) => {
                                //     return (
                                //         <Box key={index} className="row">
                                //             <Box
                                //                 className="field field-x column"
                                //                 name="className"
                                //                 data-index={index}>
                                //                 {val.className}
                                //             </Box>
                                //             <ResultCard />
                                //             <Box 
                                //                 className="field field-y column"
                                //                 value={val.probability}
                                //                 name="probability"
                                //                 data-index={index}>
                                //                 {val.probability.toFixed(2)}
                                //             </Box>
                                //         </Box>
                                //     )
                                // })
                                clsImage.map((val, index) => <ResultCard key={index} val={val.className} probability={val.probability} />)
                                :
                            <Loader
                                className="loader"
                                type="ThreeDots"
                                color="#f50057"
                                height={32}
                                width={32}
                            />
                        }
                    </Box>
                </Box>
            </Box>
        </React.Fragment>
    )
}

export default MobileNet


const ResultCard = ({val, probability, index}) => {

    const [showProbability, setShowProbability] = useState(false)

    const handleChangeButtonText = () => ( 
        showProbability ? 
            setShowProbability(false)
            :
            setShowProbability(true)
    )

    React.useEffect(() => {
        console.log('show probability changed!')
    }, [showProbability])

    return (
        <Card index={index}>
            <CardContent>
                <Typography variant="h5">
                    {val}
                </Typography>
                <Button
                     variant="contained" 
                     color="primary"
                     onClick={handleChangeButtonText}
                >
                    <Typography variant="button">
                        Toggle probability
                    </Typography>
                </Button>
                {
                    showProbability &&
                    <Typography variant="subtitle1">
                        {probability}
                    </Typography>
                }
            </CardContent>      
        </Card>
    )
}

ResultCard.propTypes = {
    val: PropTypes.string,
    probability: PropTypes.number,
    index: PropTypes.number
}