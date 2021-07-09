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
        },
        revalidate: 3600
    }
}

export default function Index({
    items,
    quests
}: {
    items: {category: string, name: string, id: string}[],
    quests: {section: string, area: string, name: string, id: string}[]
}) {
    return (
        <>
            <ItemForm items={items} quests={quests}/>
        </>
    )
}