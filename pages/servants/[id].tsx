import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import MaterialList from "../../components/material-list";
import { origin, region } from "../../constants/atlasacademy";
import { Servant } from '../../interfaces'
import { getServants } from "../../lib/get-servants";


export const getStaticPaths: GetStaticPaths = async () => {
    const servants = await getServants()
    const paths = servants.map(({ id }) => ({
        params: { id: id.toString() }
    }))
    return { paths, fallback: true }
}


export const getStaticProps: GetStaticProps = async (context) => {
    const { id } = context.params as { id: string }
    const url = `${origin}/export/${region}/nice_servant.json`
    const servants = await fetch(url).then(res => res.json())
    const servant = servants.find((servant: Servant) => (servant.id.toString() == id))
    return {
        props: servant
    }
}


const Page = (servant: Servant) => {
    const router = useRouter()
    if (router.isFallback) {
        return <p>読み込み中...</p>
    }

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