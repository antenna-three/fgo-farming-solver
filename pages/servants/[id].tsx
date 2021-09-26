import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import MaterialList from "../../components/material-list";
import { Servant } from '../../interfaces'
import { getJpClassName } from "../../lib/get-jp-class-name";
import { getNiceServants } from "../../lib/get-nice-servants";
import { getServants } from "../../lib/get-servants";


export const getStaticPaths: GetStaticPaths = async () => {
    const servants = await getServants()
    const paths = servants.map(({ id }) => ({
        params: { id: id.toString() }
    }))
    return { paths, fallback: true }
}


export const getStaticProps: GetStaticProps = async (context) => {
    const { params } = context
    if (params == null || typeof(params.id) != 'string' || Number.isNaN(parseInt(params.id))) {
        return { notFound: true }
    }
    const intId = parseInt(params.id)
    const niceServant = await getNiceServants()
        .then(servants => servants.find(({id}) => id == intId))
    if (niceServant == null) {
        return { notFound: true }
    }
    return {
        props: { servant: niceServant }
    }
}


const Page = ({
    servant,
}: {
    servant: Servant,
}) => {
    const router = useRouter()
    if (router.isFallback) {
        return <p>読み込み中...</p>
    }

    return (<>
        <p><Link href="../index"><a>サーヴァント一覧</a></Link> &gt; {servant.name}</p>
        <h1>{servant.name}（{getJpClassName(servant.className)}）</h1>
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