import React, { memo } from "react";


const DualSlider = ({
    min,
    max,
    step,
    leftValue,
    rightValue,
    handleLeftChange,
    handleRightChange,
    disabled
}: {
    min: number,
    max: number,
    step?: number,
    leftValue: number,
    rightValue: number,
    handleLeftChange: React.ChangeEventHandler<HTMLInputElement>,
    handleRightChange: React.ChangeEventHandler<HTMLInputElement>,
    disabled?: boolean
}) => {
    const normalizedLeft = (leftValue - min) / (max - min)
    const normalizedRight = (rightValue - min) / (max - min)
    return (
        <div className="dual-slider">
            <input className="left" type="range" min={min} max={max} step={step} value={leftValue} onChange={handleLeftChange} disabled={disabled}/>
            <input className="right" type="range" min={min} max={max} step={step} value={rightValue} onChange={handleRightChange} disabled={disabled}/>
            <div className="slider">
                <div className="track"/>
                <div className="range"/>
                <div className="thumb left"/>
                <div className="thumb right"/>
            </div>
            <style jsx>{`
                .dual-slider {
                    position: relative;
                    width: 100%;
                    min-width: 100px;
                    max-width: 500px;
                    margin: 0 15px;
                }
                .slider {
                    position: relative;
                    z-index: 1;
                    height: 8px;
                    margin: 0 8px;
                }
                .slider > .track {
                    position: absolute;
                    z-index: 1;
                    left: 0;
                    right: 0;
                    top: 0;
                    bottom: 0;
                    border-radius: 5px;
                    background-color: var(--color-bg-secondary)
                }
                .slider > .range {
                    position: absolute;
                    z-index: 2;
                    top: 0;
                    bottom: 0;
                    border-radius: 5px;
                }
                .slider > .thumb.left {
                    position: absolute;
                    z-index: 3;
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                }
                .slider > .thumb.left {
                    transform: translate(-8px, -4px);
                }
                /*
                .slider > .thumb.right {
                    transform: translate(8px, -4px);
                }
                */
                .slider > .thumb.right {
                    box-sizing: content-box;
                    position: absolute;
                    z-index: 3;
                    width: 0;
                    height: 0;
                    border-left: 20px solid var(--color);
                    border-top: 10px solid transparent;
                    border-bottom: 10px solid transparent;
                    border-right: 0 solid transparent;
                    background-color: transparent;
                    transform: translate(12px, -6px);
                }
                input[type=range] {
                    position: absolute;
                    pointer-events: none;
                    appearance: none;
                    z-index: 2;
                    width: 100%;
                    height: 8px;
                    margin: 0;
                    padding: 0;
                    opacity: 0;
                }
                input[type=range]::-webkit-slider-thumb {
                    width: 24px;
                    height: 24px;
                }
            `}</style>
            <style jsx>{`
                .slider > .range {
                    background-color: ${disabled ? "var(--color-bg-secondary)" : "var(--color)"};
                }
                .slider > .thumb {
                    background-color: ${disabled ? "var(--color-bg-secondary)" : "var(--color)"};
                }
                .slider > .thumb.right {
                    border-left-color: ${disabled ? "var(--color-bg-secondary)" : "var(--color)"};
                }
            `}</style>
            <style jsx>{`
                input[type=range].left::-webkit-slider-thumb {
                    pointer-events: ${normalizedLeft == 0 && normalizedRight == 0 ? "none" : "all"};
                }
                input[type=range].right::-webkit-slider-thumb {
                    pointer-events: ${normalizedLeft == 1 && normalizedRight == 1 ? "none" : "all"};
                }
            `}</style>
            <style jsx>{`
                .slider > .range {
                    left: ${normalizedLeft * 100}%;
                    right: ${100 - normalizedRight * 100}%;
                }
                .slider > .thumb.left {
                    left: ${normalizedLeft * 100}%;
                }
                .slider > .thumb.right {
                    right: ${100 - normalizedRight * 100}%;
                }
            `}</style>
        </div>
    )
}

export default DualSlider