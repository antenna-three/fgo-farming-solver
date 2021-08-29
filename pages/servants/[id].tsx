import { GetStaticPaths, GetStaticProps } from "next";
import { Fragment, useState } from "react";
import Error from "../_error";
import MaterialList from "../../components/material-list";
import type {Materials} from '../../interfaces'
import ServantLevelSelect from "../../components/servant-level-select";


const origin = 'https://api.atlasacademy.io'
const region = 'JP'


export const getStaticPaths: GetStaticPaths = async () => {
    const servantsUrl = origin + '/export/JP/basic_servant.json'
    const servants = await fetch(servantsUrl).then(res => res.json())
    const paths = servants.map((servant: {id: number}) => ({
        params: { id: servant.id.toString() }
    }))
    return { paths, fallback: false }
}


export const getStaticProps: GetStaticProps = async (context) => {
    if (context.params == null) {
        return { props: null }
    }
    const { id } = context.params
    if (typeof id !== 'string') {
        return { props: null }
    }
    const servantUrl = `${origin}/nice/${region}/servant/${id}`
    const servant = await fetch(servantUrl).then(res => res.json())
    return {
        props: servant
    }
}


export default function Servant(servant?: {
    id: number,
    name: string,
    ascensionMaterials: Materials,
    skillMaterials: Materials,
    appendSkillMaterials: Materials
}) {
    if (servant == null) {
        return <Error statusCode={404}/>
    }
    const levels = {
        ascension: [0, 4],
        skill: [1, 10],
        appendSkill: [1, 10],
    }
    const values = Object.entries(levels).map(([target, [min, max]]) => {
        const [disabled, setDisabled] = useState(true)
        const [start, setStart] = useState(min)
        const [end, setEnd] = useState(max)
        return {target, min, max, disabled, setDisabled, start, end, setStart, setEnd}
    })
    return (<>
        <h1>{servant.name}</h1>
        <div className="flex">
            <div className="flex-child">
                <h2>霊基再臨素材</h2>
                <MaterialList materials={servant.ascensionMaterials}/>
            </div>
            <div className="flex-child">
                <h2>スキル強化素材</h2>
                <MaterialList materials={servant.skillMaterials}/>
            </div>
            <div className="flex-child">
                <h2>アペンドスキル強化素材</h2>
                <MaterialList materials={servant.appendSkillMaterials}/>
            </div>
        </div>
        <style jsx>{`
            .flex {
                display: flex;
                flex-wrap: wrap;
            }
            .flex-child {
                margin-right: 1rem;
            }
        `}</style>
    </>)
}