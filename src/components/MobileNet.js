/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useRef } from 'react'
import Loader from 'react-loader-spinner'
import PropTypes from 'prop-types'
import Header from './Header'

import * as mn from '@tensorflow-models/mobilenet'
import * as tf from '@tensorflow/tfjs'

import { Box, Typography, Grid, Card, CardContent, Button, makeStyles, } from '@material-ui/core'

import './MobileNet.css'

const useStyles = makeStyles((theme) => ({
    gridItem: {
        textAlign: 'center',
        padding: theme.spacing(2)
    },
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

    useEffect(() => {
        let webCamStop

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

        return () => {
            if (webCamStop) webCamStop()
            componentIsMounted.current = false
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
            <Grid
                container
                direction="row"
                style={{margin: '0 auto'}}
            >
                <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Typography 
                        variant="subtitle1"
                        gutterBottom
                    >
                        Video image classification
                    </Typography>
                    <video autoPlay playsInline muted id="webcam" width="224" height="224"></video>
                    <Box>
                        {
                            clsVideo.length ?
                            <Box>
                                <Typography variant="body1" content="p">{clsVideo[clsVideo.length-1].className}</Typography>
                                <Typography variant="body2" content="p">
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
                                <Typography variant="body1">Loading camera...</Typography>
                            </Box>
                        }
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} className={classes.gridItem}>
                    <Typography 
                        variant="subtitle1"
                        gutterBottom   
                    >
                        Image classification
                    </Typography>
                    <img 
                        id='mnimg' 
                        src={process.env.PUBLIC_URL + '/images/MobileNetImage.jpg'} 
                        alt="MobileNet image" />
                    <Grid>
                        <Typography variant="subtitle2" gutterBottom>Result</Typography>
                        {
                            clsImage.length ?
                            <Grid container spacing={3}>
                                {clsImage.map((val, index) => 
                                    <ResultCard 
                                        key={index} 
                                        val={val.className} 
                                        probability={val.probability} />)}
                            </Grid>
                                :
                            <Loader
                                className="loader"
                                type="ThreeDots"
                                color="#f50057"
                                height={32}
                                width={32}
                            />
                        }
                    </Grid>
                </Grid>
            </Grid>
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

    useEffect(() => {
        console.log('show probability changed!')
    }, [showProbability])

    return (
        <Grid item xs={12} lg={4}>
            <Card 
                index={index}

            >
                <CardContent>
                    <Typography 
                        variant="subtitle1" 
                        content="h3"
                        align="left"
                    >
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
        </Grid>
    )
}

ResultCard.propTypes = {
    val: PropTypes.string,
    probability: PropTypes.number,
    index: PropTypes.number
}