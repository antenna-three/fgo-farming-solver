import { GetStaticProps } from 'next'
import Head from '../../components/head'
import ItemForm from '../../components/item-form'
import { getGzip } from '../../lib/get-s3'

export const getStaticProps: GetStaticProps = async (context) => {
    const props = await getGzip('all.json.gz')
    
    return {
        props,
        revalidate: 86400
    }
}

export default function Index({
    items,
    quests
}: {
    items: {category: string, name: string, id: string}[],
    quests: {section: string, area: string, name: string, id: string, samples_1: number, samples_2: number}[]
}) {
    const description = "欲しい素材の数を入力すると、どのフリクエを何周するのが最も効率的かを求めます。"
    return (
        <>
            <Head>
                <meta name="description" content={description}/>
            </Head>
            <p>{description}</p>
            <ItemForm items={items} quests={quests}/>
        </>
    )
}