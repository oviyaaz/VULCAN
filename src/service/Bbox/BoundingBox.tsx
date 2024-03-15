'use client'
import React, {useEffect, useRef} from "react";
import './Bbox.css'
import {Bbox, BoundingBoxProp} from "../model/Bbox";
import {CircularProgress} from "@mui/material";

function drawBox(
    box: Bbox,
    color: string,
    lineWidth: number,
    canvas: HTMLCanvasElement | null
) {
    if (!box || typeof box === "undefined") return null;

    const ctx = canvas!.getContext("2d");

    let [x, y, width, height] = [0, 0, 0, 0];

    if (
        typeof box.xmin !== "undefined" &&
        typeof box.xmax !== "undefined" &&
        typeof box.ymin !== "undefined" &&
        typeof box.ymax !== "undefined"
    ) {
        // coord is an object containing xmin, xmax, ymin, ymax attributes
        // width is absolute value of (xmax - xmin)
        // height is absolute value of (ymax - ymin)
        // absolute value takes care of various possible referentials:
        //   - sometimes 0,0 is top-left corner
        //   - sometimes 0,0 is bottom-left corner
        [x, y, width, height] = [
            Math.min(box.xmin, box.xmax),
            Math.min(box.ymin, box.ymax),
            Math.max(box.xmin, box.xmax) - Math.min(box.xmin, box.xmax),
            Math.max(box.ymin, box.ymax) - Math.min(box.ymin, box.ymax)
        ];
    }

    if (x < lineWidth / 2) {
        x = lineWidth / 2;
    }
    if (y < lineWidth / 2) {
        y = lineWidth / 2;
    }

    if (x + width > canvas!.width) {
        width = canvas!.width - lineWidth - x;
    }
    if (y + height > canvas!.height) {
        height = canvas!.height - lineWidth - y;
    }

    // const ninetyPercent = 9 * tenPercent;
    if (ctx !== null) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x, y);

        ctx.fillRect(x, y, width, height);

    }
}

function renderBox(box: Bbox, canvas: HTMLCanvasElement | null) {
    if (!box || typeof box === "undefined") return null;

    let lineWidth: number = 2;
    if (canvas!.width > 600) {
        lineWidth = 3;
    }
    if (canvas!.width > 1000) {
        lineWidth = 5;
    }
    drawBox(box, "rgba(255, 0, 0, 0.5)", lineWidth, canvas);
}

export function BoundingBox(props: BoundingBoxProp) {
    let canvasRef = useRef<HTMLCanvasElement | null>(null);
    let canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
    const [imageResolution, setImageResolution] = React.useState({
        width: 0,
        height: 0
    })
    const [click, setclick] = React.useState(false)
    const dataFetchedRef = React.useRef(false);
    useEffect(() => {

        if (canvasRef.current) {
            const canvas = canvasRef.current;
            // const canvasWidth: number = canvas.clientWidth;
            // const canvasHeight: number = canvas.clientHeight;
            // setImageResolution({
            //     width: canvas.clientWidth,
            //     height: canvas.clientHeight
            // })
            setclick(true)
        }
    }, []);

    // 
    useEffect(() => {
        if (click) {
            if (dataFetchedRef.current) return;
            dataFetchedRef.current = true;
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const canvasWidth: number = canvas.width;
                const canvasHeight: number = canvas.height;
                // setImageResolution({
                //     width: canvas.clientWidth,
                //     height: canvas.clientHeight
                // })
                props.imageResolution && props.imageResolution(canvas.width, canvas.height)
            }
        }
    }, [canvasRef.current])

    useEffect(() => {
        // Initialize
        let currentCanvas = canvasRef.current;
        if (currentCanvas) {
            canvasCtxRef.current = currentCanvas.getContext("2d");
            let ctx = canvasCtxRef.current;

            const background = new Image();
            background.src = "data:image/png;base64," + props.imageEncode;
            // Make sure the image is loaded first otherwise nothing will draw.
            background.onload = () => {
                currentCanvas!.width = background.width;
                currentCanvas!.height = background.height;

                ctx!.drawImage(background, 0, 0);

                [props.box].forEach((box) => renderBox(box, currentCanvas));
            };
        }
    }, [props.imageEncode, props.box]);

    return (
        <div className="bBox__parent__div">
            {props.imageEncode ? (
                <div
                    style={{
                        justifyContent: "center",
                        width: "100%",
                    }}
                >
                    <canvas
                        className="canvas__inherit"
                        ref={canvasRef}
                        id="bbimage"
                    ></canvas>
                </div>
            ) : (
                <div className="progress__bar">
                    <CircularProgress/>
                </div>
            )
            }
        </div>);
}
