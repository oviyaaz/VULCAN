export interface Valuation {
    originId?: number;
    pageNo: number;
    rootPipelineId?: string;
    feature?: string;
    precision: number;
    leftPos?: number;
    upperPos?: number;
    rightPos?: number;
    lowerPos?: number;
    predictedValue: string;
    label?: string;
    container?: string;
    field?: string;
    truthEntity?: string;
    synonym?: string;
    question?: string;
    state?: string;
}

export interface BoundingBoxProp {
    cropWidth?: boolean;
    imageEncode: string;
    box: Bbox;
    imageResolution?: (width: number, height: number) => void
}

export interface BBoxProp {
    encode: string | any;
    box: Bbox;
}

export interface Bbox {
    xmin?: number;
    xmax?: number;
    ymin?: number;
    ymax?: number;
    label: string;
}

export interface PaperClassificationTypes {
    state: string,
    fullAsset: boolean;
    leftPos: number;
    lowerPos: number;
    precision: number;
    predictedValue: string;
    rightPos: number;
    upperPos: number;
}