import React, { Dispatch, memo, SetStateAction, useCallback, useContext } from "react"
import DualSlider from "./dual-slider"

const DualSliderWithInput = ({
    min,
    max,
    step,
    disabled,
    leftValue,
    rightValue,
    setLeftValue,
    setRightValue,
}: {
    min: number,
    max: number,
    step: number,
    disabled?: boolean,
    leftValue: number,
    rightValue: number,
    setLeftValue: (value: number) => void,//Dispatch<SetStateAction<number>>,
    setRightValue: (value: number) => void,//Dispatch<SetStateAction<number>>,
}) => {
    const handleLeftChange =  useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.valueAsNumber
        const newValue = Math.min(rightValue, value)
        setLeftValue(newValue)
    }, [rightValue])
    const handleRightChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.valueAsNumber
        const newValue = Math.max(leftValue, value)
        setRightValue(newValue)
    }, [leftValue])
    return (
        <div className="flex dual-slider-with-input">
            <input type="number"
                min={min} max={max} step={step}
                value={leftValue}
                onChange={handleLeftChange}
                disabled={disabled}
            />
            <DualSlider
                min={min} max={max} step={step}
                leftValue={leftValue}
                rightValue={rightValue}
                handleLeftChange={handleLeftChange}
                handleRightChange={handleRightChange}
                disabled={disabled}
            />
            <input type="number"
                min={min} max={max} step={step}
                value={rightValue}
                disabled={disabled}
                onChange={handleRightChange}/>
            <style jsx>{`
                .flex {
                    display: flex;
                    align-items: center;
                }
                .dual-slider-with-input {
                    margin-bottom: 1rem;
                }
                input[type=number] {
                    margin: 0;
                    width: 4rem;
                }
            `}</style>
        </div>
    )
}

export default DualSliderWithInput