import { Dispatch, memo, SetStateAction, useCallback, useState } from 'react'
import DualSliderWithInput from './dual-slider-with-input'

export type ServantState = {
    disabled: boolean,
    targets: {
        [target: string]: {
            disabled: boolean,
            ranges: {
                start: number,
                end: number,
            }[]
        }
    }
}


export type State = {[id: string]: ServantState}

const ServantLevelSelect = memo(({
    id,
    name,
    servantState,
    setServantState,
}: {
    id: string,
    name: string,
    servantState: ServantState,
    setServantState: (dispatch: (prevServantState: ServantState) => ServantState) => void,
}) => {
    const labels: {[key: string]: string} = {
        ascension: '再臨',
        skill: 'スキル',
        appendSkill: 'アペンドスキル'
    }
    const minMaxs: {[key: string]: {min: number, max: number}} = {
        ascension: {min: 0, max: 4},
        skill: {min: 1, max: 10},
        appendSkill: {min: 1, max: 10}
    }

    return (<>
        <h2>{name}</h2>
        <div style={{marginBottom: '2rem'}}>
        {Object.entries(servantState.targets).map(([target, {disabled, ranges}]) => (
            <div className="target" key={`${id}-${target}`}>
                <input
                    type="checkbox"
                    id={`${id}-${target}`}
                    checked={!disabled}
                    onChange={(e) => {
                        const disabled = !e.currentTarget.checked
                        setServantState((state) => ({
                            ...state,
                            targets: {
                                ...state.targets,
                                [target]: {
                                    ...state.targets[target],
                                    disabled
                                }
                            }
                        }))
                    }}
                />
                <label htmlFor={`${id}-${target}`}>{labels[target]}</label>
                {ranges.map(({start, end}, index) => (
                    <DualSliderWithInput
                        min={minMaxs[target].min}
                        max={minMaxs[target].max}
                        step={1}
                        disabled={disabled}
                        leftValue={start}
                        rightValue={end}
                        setLeftValue={(value: number) => {
                            setServantState(state => ({
                                ...state,
                                targets: {
                                    ...state.targets,
                                    [target]: {
                                        ...state.targets[target],
                                        ranges: state.targets[target].ranges.map((range, i) => (i == index ? {start: value, end: range.end} : range))
                                    }
                                }
                            }))
                        }}
                        setRightValue={(value: number) => {
                            setServantState(state => ({
                                ...state,
                                targets: {
                                    ...state.targets,
                                    [target]: {
                                        ...state.targets[target],
                                        ranges: state.targets[target].ranges.map((range, i) => (i == index ? {start: range.start, end: value} : range))
                                    }
                                }
                            }))
                        }}
                        key={`${id}-${target}-${index}`}
                    />
                ))}
            </div>
        ))}
        </div>
        <style jsx>{`
            .target {
                margin-bottom: 1rem;
            }
        `}</style>
    </>)
})

export default ServantLevelSelect