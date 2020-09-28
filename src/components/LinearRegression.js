import React, { useState } from 'react'
import update from 'immutability-helper'
import * as tf from '@tensorflow/tfjs'
import Loader from 'react-loader-spinner'

import './LinearRegression.css'

import { Box, Button, Typography, Input, Icon } from '@material-ui/core'

const LinearRegression = () => {
    // Value pairs state
    const [valuePairsState, setValuePairsState] = useState([
        { x: -1, y: -3 },
        { x: 0, y: -1},
        { x: 1, y: 1},
        { x: 2, y: 3},
        { x: 3, y: 5},
        { x: 4, y: 7},
    ])

    // Define the model state
    const [modelState, setModelState] = useState({
        model: null,
        trained: false,
        predictedValue: 'Click on train!',
        loading: false,
        valueToPredict: 1,
    })

    // Event handlers
    const handleValuePairChange = (e) => {
        const updatedValuePairs = update(valuePairsState, {
            [e.target.dataset.index]: {
                [e.target.name]: { $set: parseInt(e.target.value) }
            }
        })

        setValuePairsState(
            updatedValuePairs
        )
    }

    const handleAddItem = () => {
        setValuePairsState([
            ...valuePairsState,
            { x: 1, y: 1 }
        ])
    }

    const handleDeleteItem = () => {
        setValuePairsState([
            ...valuePairsState.slice(0,valuePairsState.length-1)
        ])
    }

    const handleModelChange = (e) => setModelState({
        ...modelState,
        [e.target.name]: [parseInt(e.target.value)],
    })

    const handleTrainModel = () => {

        // Change the loading state.
        setModelState({
            ...modelState,
            loading: true
        })

        let xValues = [],
            yValues = []

        valuePairsState.forEach((val, index) => {
            xValues.push(val.x)
            yValues.push(val.y)
        })

        // Define a model for linear regression.
        const model = tf.sequential()
        model.add(tf.layers.dense({ units: 1, inputShape: [1]}))

        // Prepare the model for training: Specify the loss and the optimizer.
        model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' })
        const xs = tf.tensor2d(xValues, [xValues.length, 1])
        const ys = tf.tensor2d(yValues, [yValues.length, 1])

        // Train the model using the data.
        model.fit(xs, ys, { epochs: 250 }).then(() => {
            setModelState({
                ...modelState,
                model: model,
                trained: true,
                predictedValue: 'Ready for making predictions',
                loading: false,
            })
        })

    }

    const handlePredict = () => {
        // Use the model to do inference on a data point the model has not seen before:
        const predictedValue = modelState.model.predict(tf.tensor2d([modelState.valueToPredict], [1, 1]))
            .arraySync()[0][0]

        setModelState({
            ...modelState,
            predictedValue: predictedValue,
        })
    }

    return (
        <Box className="linear-regression">
            <Box className="train-controls">
                <Typography variant="h2">Linear Regression</Typography>
                <Typography variant="subtitle1" className="section">Training Data (x,y) pairs</Typography>
                <Box className="row labels">
                    <Box className="field-label column">
                        <Typography variant="h6">
                            X
                        </Typography>
                    </Box>
                    <Box className="field-label column">
                        <Typography variant="h6">
                            Y
                        </Typography>
                    </Box>
                </Box>

                {valuePairsState.map((val, index) => {
                    return (
                        <Box key={index} className="row">
                            <Input
                                className="field field-x column"
                                value={val.x}
                                name="x"
                                data-index={index}
                                onChange={handleValuePairChange}
                                type="number" />
                        
                            <Input
                                className="field field-y column"
                                value={val.y}
                                name="y"
                                data-index={index}
                                onChange={handleValuePairChange}
                                type="number" />
                        </Box>
                    )
                })}
            
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAddItem}
                    startIcon={<Icon>add</Icon>} >
                        <Typography variant="button">
                            Add a new pair
                        </Typography>
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleDeleteItem}
                    startIcon={<Icon>delete</Icon>} >
                        <Typography variant="button">
                            Delete last pair
                        </Typography>
                </Button>
                <Button
                    variant="contained" 
                    color="primary"
                    onClick={handleTrainModel}
                    startIcon={<Icon>scatter_plot</Icon>} >
                    <Typography variant="button">
                        Train
                    </Typography>
                </Button>
            </Box>

            <Box className="predict-controls">
                <Typography variant="h2">Predicting</Typography>
                <Input
                    className="field element"
                    value={modelState.valueToPredict}
                    name="valueToPredict"
                    onChange={handleModelChange}
                    type="number"
                    placeholder="Enter an integer" /><br />
                <Box className="element label-prediction">
                    {
                        /* conditional rendering */
                        modelState.loading ? 
                            <Loader
                            className="loader"
                            type="Bars"
                            color="#00DE00"
                            height={32}
                            width={32}
                            />
                        :    
                            <Typography variant="h5">
                                {modelState.predictedValue}
                            </Typography>
                    }
                </Box>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={handlePredict}
                    disabled={!modelState.trained}>
                    <Typography variant="button">
                        Predict
                    </Typography>
                </Button>
            </Box>
        </Box>
    )
}

export default LinearRegression