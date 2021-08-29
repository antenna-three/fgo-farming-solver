import { useState } from "react";
import DualSlider from "../components/dual-slider";
import DualSliderWithInput from "../components/dual-slider-with-input";

export default function Slider() {
    const [leftValue, setLeftValue] = useState(1)
    const [rightValue, setRightValue] = useState(10)
    return (<>
        <DualSliderWithInput
            min={1} max={10} step={1}
            leftValue={leftValue}
            rightValue={rightValue}
            setLeftValue={setLeftValue}
            setRightValue={setRightValue}
        />
    </>)
}