import React from 'react'
import { ThreeCircles } from 'react-loader-spinner'

const Loading = () => {
    return (
        <div>
            <ThreeCircles
                height="100"
                width="100"
                color="#6D78F1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor=""
                innerCircleColor=""
                middleCircleColor=""
            />
        </div>
    )
}

export default Loading