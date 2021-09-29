import React, { memo, useCallback } from 'react'
import DualSlider from './dual-slider'

const DualSliderWithInput = ({
  min,
  max,
  step,
  disabled,
  name,
  leftValue,
  rightValue,
  handleLeftChange,
  handleRightChange,
}: {
  min: number
  max: number
  step: number
  disabled?: boolean
  name?: string
  leftValue: number
  rightValue: number
  handleLeftChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRightChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  const handleLeftChangeWithClamp = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.valueAsNumber
      const newValue = Math.max(Math.min(rightValue, value), min)
      e.currentTarget.value = newValue.toString()
      handleLeftChange(e)
    },
    [handleLeftChange, min, rightValue]
  )
  const handleRightChangeWithClamp = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.currentTarget.valueAsNumber
      const newValue = Math.min(Math.max(leftValue, value), max)
      e.currentTarget.value = newValue.toString()
      handleRightChange(e)
    },
    [handleRightChange, leftValue, max]
  )
  return (
    <div className="flex dual-slider-with-input">
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        name={name}
        value={leftValue}
        onChange={handleLeftChangeWithClamp}
        disabled={disabled}
      />
      <DualSlider
        min={min}
        max={max}
        step={step}
        name={name}
        leftValue={leftValue}
        rightValue={rightValue}
        handleLeftChange={handleLeftChangeWithClamp}
        handleRightChange={handleRightChangeWithClamp}
        disabled={disabled}
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        name={name}
        value={rightValue}
        disabled={disabled}
        onChange={handleRightChangeWithClamp}
      />
      <style jsx>{`
        .flex {
          display: flex;
          align-items: center;
        }
        .dual-slider-with-input {
          margin-bottom: 1rem;
        }
        input[type='number'] {
          margin: 0;
          width: 4rem;
        }
      `}</style>
    </div>
  )
}

export default memo(DualSliderWithInput)
