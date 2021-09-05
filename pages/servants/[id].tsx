import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import { origin, region } from "../../constants/atlasacademy";
import MaterialList from "../../components/material-list";
import { Servant } from '../../interfaces'
import { getServants } from "../../lib/get-servants";


export const getStaticPaths: GetStaticPaths = async () => {
    const servants = await getServants()
    const paths = servants.map(({ id }) => ({
        params: { id: id.toString() }
    }))
    return { paths, fallback: false }
}


export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as { id: string }
    const servantUrl = `${origin}/nice/${region}/servant/${id}`
    const servant = await fetch(servantUrl).then(res => res.json())
    return {
        props: servant
    }
}


const Page = (servant: Servant) => {
    const levels = {
        ascension: [0, 4],
        skill: [1, 10],
        appendSkill: [1, 10],
    }
    const values = Object.entries(levels).map(([target, [min, max]]) => {
        const [disabled, setDisabled] = useState(true)
        const [start, setStart] = useState(min)
        const [end, setEnd] = useState(max)
        return { target, min, max, disabled, setDisabled, start, end, setStart, setEnd }
    })
    return (<>
        <h1>{servant.name}</h1>
        <div className="flex">
            <div className="flex-child">
                <h2>霊基再臨素材</h2>
                <MaterialList materials={servant.ascensionMaterials} />
            </div>
            <div className="flex-child">
                <h2>スキル強化素材</h2>
                <MaterialList materials={servant.skillMaterials} />
            </div>
            <div className="flex-child">
                <h2>アペンドスキル強化素材</h2>
                <MaterialList materials={servant.appendSkillMaterials} />
            </div>
        </div>
        <style jsx>{`
            .flex {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
            }
            .flex-child {
                margin-right: 1rem;
            }
        `}</style>
    </>)
}

export default Page