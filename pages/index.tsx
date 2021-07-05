import Head from '../components/head'
import { GetStaticProps } from 'next'
import ItemForm from '../components/item-form'
import { getS3 } from '../lib/get-s3'

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const items = await getS3('items.csv')
    const quests = await getS3('quests.csv')
    
    return {
        props: {
            items,
            quests
        }
    }
}

export default function Index({
    items,
    quests
}: {
    items: {category: string, item: string, id: string}[],
    quests: {chapter: string, area: string, quest: string, id: string}[]
}) {
    return (
        <>
            <ItemForm items={items} quests={quests}/>
        </>
    )
}