import React from 'react'
import "./Bbox.css"
import {CircularProgress} from "@mui/material";
import {BoundingBox} from './BoundingBox';
import {Valuation} from '../model/Bbox';

export default function BoundingImageViewer(
    encode: string,
    pageNo: number,
    valuation?: Valuation) {
    return (
        <>
            <div className="bBox__parent__div">
                {encode ? (
                    <div
                        key={pageNo}
                        style={{
                            justifyContent: "center",
                            width: "100%",
                        }}
                    ><BoundingBox
                        imageEncode={encode}
                        // imageResolution={resolutionHandler}
                        box={{
                            label: "",
                            xmin: valuation !== undefined ? valuation.leftPos : 0,
                            xmax:
                                valuation !== undefined ? valuation.rightPos : 0,
                            ymin:
                                valuation !== undefined ? valuation.lowerPos : 0,
                            ymax:
                                valuation !== undefined ? valuation.upperPos : 0,
                        }}
                    />

                    </div>
                ) : (
                    <div className="progress__bar">
                        <CircularProgress/>
                    </div>
                )
                }
            </div>
        </>
    );
}
