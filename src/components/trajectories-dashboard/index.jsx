import React from "react";

import useTrajectories from "../../hooks/useTrajectories";

const TrajectoriesDashboard = () => {
    const { draw } = useTrajectories();

    draw();

    return (
        <div
            style={{
                width: "100%",
                background: "white",
                height: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <canvas id="canvas" height="500px" width="400px"></canvas>
        </div>
    );
};

export default TrajectoriesDashboard;
