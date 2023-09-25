// Type definitions for react-canvas-draw 1.2
// Project: https://embiem.github.io/react-canvas-draw/
// Definitions by: Kamil Socha <https://github.com/ksocha>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare module 'react-canvas-draw'{

    import * as React from 'react';

    export interface CanvasDrawCanvas {
        drawing: HTMLCanvasElement,
        grid?: HTMLCanvasElement,
        interface?: HTMLCanvasElement,
        temp?: HTMLCanvasElement,
    }

    export interface CanvasDrawProps {
        onChange?: ((canvas: CanvasDraw) => void) | null | undefined;
        loadTimeOffset?: number | undefined;
        lazyRadius?: number | undefined;
        brushRadius?: number | undefined;
        brushColor?: string | undefined;
        catenaryColor?: string | undefined;
        gridColor?: string | undefined;
        backgroundColor?: string | undefined;
        hideGrid?: boolean | undefined;
        canvasWidth?: number | string | undefined;
        canvasHeight?: number | string | undefined;
        disabled?: boolean | undefined;
        imgSrc?: string | undefined;
        saveData?: string | undefined;
        immediateLoading?: boolean | undefined;
        hideInterface?: boolean | undefined;
        gridSizeX?: number | undefined;
        gridSizeY?: number | undefined;
        gridLineWidth?: number | undefined;
        hideGridX?: boolean | undefined;
        hideGridY?: boolean | undefined;
        enablePanAndZoom?: boolean | undefined;
        mouseZoomFactor?: number | undefined;
        zoomExtents?: { min: number, max: number} | undefined;
        clampLinesToDocument?: boolean | undefined;
        className?: string | undefined;
        style?: React.CSSProperties | undefined;
    }

    export default class CanvasDraw extends React.Component<CanvasDrawProps> {
        /**
         * Returns the drawing's save-data as a stringified object.
         */
        getSaveData(): string;

        /**
         * Loads a previously saved drawing using the saveData string, as well as an optional boolean
         * flag to load it immediately, instead of live-drawing it.
         */
        loadSaveData(saveData: string, immediate?: boolean): void;

        /**
         * Clears the canvas completely.
         */
        clear(): void;

        /**
         * Removes the latest change to the drawing. This includes everything drawn since the last MouseDown event.
         */
        undo(): void;

        /**
         * Combination of work by Ernie Arrowsmith and emizz
         * References:
         * https://stackoverflow.com/questions/32160098/change-html-canvas-black-background-to-white-background-when-creating-jpg-image
         * https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
         * This function will export the canvas to a data URL, which can subsequently be used to share or manipulate the image file.
         * @param {string} fileType Specifies the file format to export to. Note: should only be the file type, not the "image/" prefix.
         *  For supported types see https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
         * @param {bool} useBgImage Specifies whether the canvas' current background image should also be exported. Default is false.
         * @param {string} backgroundColour The desired background colour hex code, e.g. "#ffffff" for white.
         */
        getDataURL(fileType?: string, useBgImage?:boolean, backgroundColour?:string): string;

        
        setCanvasSize(canvas: HTMLCanvasElement, width: number | string, height:number | string): void;

        canvas: CanvasDrawCanvas;
    }
}