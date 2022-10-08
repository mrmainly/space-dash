import React from "react";
import { Helmet } from "react-helmet";

const AntenLocation = () => {
    var trajectories = new Map();

    var lastGetTrajectories = Date.now();
    var antennaX = 0;
    var antennaY = 0;
    var radius = 0;
    var canvasWidth = 0;
    var canvasHeight = 0;
    var az = 0;
    var el = 0;
    var isParked = false;
    var hasEventListener = false;

    class trajPoint {
        constructor(time, x, y) {
            this.time = time;
            this.x = x;
            this.y = y;
        }
    }

    function getAngles(callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.response && this.readyState == 4 && this.status == 200) {
                var telem = JSON.parse(this.response).telem;
                az = parseFloat(telem.az);
                el = parseFloat(telem.el);
                isParked = telem.parked == "true";
            }
        };
        xhttp.open(
            "GET",
            "https://gsn.yktaero.space/api/stations/sjsa0-sputnix-uhf/",
            true
        );
        xhttp.send();
    }

    function getTrajectories() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.response && this.readyState == 4 && this.status == 200) {
                var schedule = JSON.parse(this.response).schedule;

                for (var i = 0; i < schedule.length; i++) {
                    var trajName = schedule[i].sat;

                    if (!trajectories.has(trajName))
                        trajectories.set(trajName, [[]]);
                    else trajectories.get(trajName).push([]);

                    for (var j = 0; j < schedule[i].trajectory.length; j++) {
                        var point = getPointByAngles(
                            parseFloat(schedule[i].trajectory[j][2]),
                            parseFloat(schedule[i].trajectory[j][1])
                        );
                        var toPush = new trajPoint(
                            Date.parse(schedule[i].trajectory[j][0]),
                            point[0],
                            point[1]
                        );

                        if (
                            trajectories.get(trajName)[
                                trajectories.get(trajName).length - 1
                            ].length > 1
                        ) {
                            toPush.x =
                                (trajectories.get(trajName)[
                                    trajectories.get(trajName).length - 1
                                ][
                                    trajectories.get(trajName)[
                                        trajectories.get(trajName).length - 1
                                    ].length - 1
                                ].x +
                                    toPush.x) /
                                2.0;
                            toPush.y =
                                (trajectories.get(trajName)[
                                    trajectories.get(trajName).length - 1
                                ][
                                    trajectories.get(trajName)[
                                        trajectories.get(trajName).length - 1
                                    ].length - 1
                                ].y +
                                    toPush.y) /
                                2.0;
                        }

                        trajectories
                            .get(trajName)
                            [trajectories.get(trajName).length - 1].push(
                                toPush
                            );
                    }
                }
            }
        };
        xhttp.open(
            "GET",
            "https://gsn.yktaero.space/api/trajectories/sjsa0-sputnix-uhf/",
            true
        );
        xhttp.send();
    }

    function degtorad(deg) {
        return deg * (Math.PI / 180);
    }

    function getAnglesByPoint(x, y) {
        var rel =
            radius -
            Math.sqrt(
                (x - antennaX) * (x - antennaY) +
                    (y - antennaY) * (y - antennaY)
            );

        var el = (90.0 * rel) / radius;
        var az = 0.0;
        if (x <= antennaX)
            az =
                360 -
                Math.abs(
                    Math.atan2(x - antennaX, antennaY - y) * (180 / Math.PI)
                );
        else az = Math.atan2(x - antennaX, antennaY - y) * (180 / Math.PI);

        return [Math.round(az), Math.round(el)];
    }

    function getPointByAngles(az, el) {
        var rel = radius - (2 * radius * degtorad(el)) / Math.PI;

        var dist = radius * Math.cos(degtorad(el));

        var recAz = az % 90;

        var dx = rel * Math.cos(degtorad(recAz));
        var dy = rel * Math.sin(degtorad(recAz));

        var resultX = antennaX;
        var resultY = antennaY;

        if (az < 90) {
            resultX += dy;
            resultY -= dx;
        } else if (az < 180) {
            resultX += dx;
            resultY += dy;
        } else if (az < 270) {
            resultX -= dy;
            resultY += dx;
        } else {
            resultX -= dx;
            resultY -= dy;
        }

        return [Math.round(resultX), Math.round(resultY)];
    }

    function drawCrosshair(ctx, x, y) {
        ctx.beginPath();

        ctx.moveTo(x + 5, y);
        ctx.lineTo(x + 25, y);

        ctx.moveTo(x - 5, y);
        ctx.lineTo(x - 25, y);

        ctx.moveTo(x, y + 5);
        ctx.lineTo(x, y + 25);

        ctx.moveTo(x, y - 5);
        ctx.lineTo(x, y - 25);

        if (isParked) ctx.strokeStyle = "red";
        else ctx.strokeStyle = "green";
        ctx.stroke();
    }

    function drawAngles(ctx, az, el, cursor = false) {
        ctx.font = "15px Arial";
        var azStr = "AZ " + az + "°";
        var elStr = "EL " + el + "°";

        if (cursor) {
            ctx.fillStyle = "red";

            ctx.clearRect(
                canvasWidth - 60,
                canvasHeight - 40,
                canvasWidth,
                canvasHeight
            );
            ctx.fillText(
                azStr,
                canvasWidth - ctx.measureText(azStr).width - 5,
                canvasHeight - 20
            );
            ctx.fillText(
                elStr,
                canvasWidth - ctx.measureText(elStr).width - 5,
                canvasHeight - 5
            );
        } else {
            ctx.fillStyle = "blue";
            ctx.fillText(azStr, 5, canvasHeight - 20);
            ctx.fillText(elStr, 5, canvasHeight - 5);
        }
    }

    function drawAntenna(ctx) {
        getAngles();
        var point = getPointByAngles(az, el);
        var x = point[0];
        var y = point[1];

        drawCrosshair(ctx, x, y);
        drawAngles(ctx, az, el);
    }

    function drawTrajectoryText(ctx, x, y, text, color, font) {
        x += 5;
        y += 5;

        ctx.font = font;
        ctx.fillStyle = color;
        if (x + ctx.measureText(text).width > canvasWidth)
            x -= ctx.measureText(text).width + 10;

        ctx.fillText(text, x, y);
    }

    function drawTrajectory(ctx, name, traj) {
        var drawedSat = false;
        var satPoint;

        ctx.beginPath();
        ctx.moveTo(traj[0].x, traj[0].y);
        for (var i = 1; i < traj.length - 2; i++) {
            var xc = (traj[i].x + traj[i + 1].x) / 2;
            var yc = (traj[i].y + traj[i + 1].y) / 2;
            ctx.quadraticCurveTo(traj[i].x, traj[i].y, xc, yc);

            if (traj[i].time > Date.now() && !drawedSat) {
                drawedSat = true;
                satPoint = traj[i];
            }

            if (i == 1 || i == traj.length - 3 || i % 50 == 0) {
                ctx.fillStyle = "blue";
                ctx.font = "12px Arial";

                var date = new Date(traj[i].time);
                var hours = String(date.getUTCHours()).padStart(2, "0");
                var minutes = String(date.getUTCMinutes()).padStart(2, "0");
                var seconds = String(date.getUTCSeconds()).padStart(2, "0");
                var dateStr = hours + ":" + minutes + ":" + seconds;

                drawTrajectoryText(
                    ctx,
                    traj[i].x,
                    traj[i].y,
                    dateStr,
                    "blue",
                    "12px Arial"
                );
            }
        }
        ctx.quadraticCurveTo(
            traj[i].x,
            traj[i].y,
            traj[i + 1].x,
            traj[i + 1].y
        );
        ctx.strokeStyle = "blue";

        ctx.stroke();

        if (drawedSat) {
            ctx.beginPath();
            ctx.arc(satPoint.x, satPoint.y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = "red";
            ctx.fill();

            drawTrajectoryText(
                ctx,
                satPoint.x,
                satPoint.y,
                name,
                "red",
                "15px Arial"
            );
        }
    }

    function drawTrajectories(ctx) {
        if (
            trajectories.size == 0 ||
            new Date(Date.now() - lastGetTrajectories).getUTCHours() > 0
        ) {
            lastGetTrajectories = Date.now();
            getTrajectories();
        }

        var dateStr = new Date(Date.now()).toUTCString();
        drawTrajectoryText(ctx, 0, 10, dateStr, "black", "15px Arial");

        var minNextTime = Infinity,
            minNextName,
            needToDrawNext = false;

        trajectories.forEach((value, key) => {
            for (var i = 0; i < value.length; i++) {
                if (
                    value[i][0].time < Date.now() &&
                    value[i][value[i].length - 1].time > Date.now()
                ) {
                    drawTrajectory(ctx, key, trajectories.get(key)[i]);
                } else if (value[i][0].time > Date.now()) {
                    if (value[i][0].time < minNextTime) {
                        minNextTime = value[i][0].time;
                        minNextName = key;
                    }
                    needToDrawNext = true;
                }
            }
        });

        if (needToDrawNext) {
            var minutesToNext = Math.floor(
                (minNextTime - Date.now()) / 1000 / 60
            );
            var secondsToNext =
                Math.floor((minNextTime - Date.now()) / 1000) % 60;

            var nextTimeStr =
                "Next in " +
                String(minutesToNext).padStart(2, "0") +
                "m" +
                String(secondsToNext).padStart(2, "0") +
                "s";
            drawTrajectoryText(
                ctx,
                canvasWidth,
                10,
                nextTimeStr,
                "black",
                "15px Arial"
            );
            drawTrajectoryText(
                ctx,
                canvasWidth,
                25,
                minNextName,
                "black",
                "15px Arial"
            );
        }
    }

    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    function prepare(ctx, canvas) {
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;
        antennaX = canvas.width / 2;
        antennaY = canvas.height / 2;
        radius = (canvas.width - 100) / 2 + 25;

        ctx.clearRect(0, 0, canvas.width, canvas.height - 40);
        ctx.clearRect(0, canvas.height - 40, canvas.width - 60, canvas.height);

        ctx.beginPath();
        ctx.arc(antennaX, antennaY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(antennaX, antennaY, radius / 3, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(antennaX, antennaY, (radius / 3) * 2, 0, 2 * Math.PI);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(25, antennaY);
        ctx.lineTo(canvas.width - 25, antennaY);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(antennaX, 25);
        ctx.lineTo(antennaX, canvas.height - 25);
        ctx.stroke();

        ctx.font = "15px Arial";
        ctx.fillStyle = "green";
        ctx.fillText(
            "N",
            antennaX - ctx.measureText("N").width / 2,
            antennaY - radius - 5
        );
        ctx.fillText("E", antennaX + radius + 5, antennaY + 5);
        ctx.fillText(
            "S",
            antennaX - ctx.measureText("S").width / 2,
            antennaY + radius + 15
        );
        ctx.fillText("W", antennaX - radius - 17, antennaY + 5);
    }

    function checkIfInCircle(x, y) {
        var distance = Math.sqrt(
            Math.pow(x - antennaX, 2) + Math.pow(y - antennaY, 2)
        );
        return distance < radius;
    }

    function mdownEvent(ctx, event) {
        if (checkIfInCircle(event.offsetX, event.offsetY)) {
            var angles = getAnglesByPoint(event.offsetX, event.offsetY);
            drawAngles(ctx, angles[0], angles[1], true);
        }
        return;
    }

    async function draw() {
        const canvas = document.getElementById("canvas");

        if (canvas.getContext) {
            const ctx = canvas.getContext("2d", canvas);
            canvas.addEventListener("mousedown", function (evt) {
                mdownEvent(ctx, evt);
            });

            while (1) {
                prepare(ctx, canvas);
                drawTrajectories(ctx);
                drawAntenna(ctx);

                await sleep(1000);
            }
        }
    }

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

export default AntenLocation;
