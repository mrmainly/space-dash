import React, { useEffect } from "react";

import useTrajectories from "../../hooks/useTrajectories";

const TrajectoriesDashboard = ({ station, trajectorie }) => {
    const { draw } = useTrajectories({ station, trajectorie });

    useEffect(() => {
        draw();
    }, [station, trajectorie]);

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
