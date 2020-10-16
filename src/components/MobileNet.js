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

const MobileNet = () => {

    const classes = useStyles()

    const [clsImage, setClsImage] = useState([])
    const [clsVideo, setClsVideo] = useState([])
    const componentIsMounted = useRef(true)
    const camera = useRef({
        net: {},
        webcam: {}
    })
    let webCamStop

    useEffect(() => {
        // TODO: add a cancellation token for async
        async function loadMobileNet() {
            try {
                camera.current.net = await mn.load()
                if (componentIsMounted.current) {
                    loadWebCam()
                }
            } catch(err) {
                console.error(err)
            }
        }
        loadMobileNet()

        return () => {
            if (webCamStop) webCamStop()
            componentIsMounted.current = false
        }
    }, [])

    async function loadWebCam() {
        const webcamElement = document.getElementById('webcam')
        camera.current.webcam = await tf.data.webcam(webcamElement)
        webCamStop = () => camera.current.webcam.stop()
        
        if (componentIsMounted.current) {
            videoClassification()
            classifyImage()
        }
    }

    async function videoClassification() {
        while(componentIsMounted.current) {
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