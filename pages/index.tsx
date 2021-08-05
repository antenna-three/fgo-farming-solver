import { GetStaticProps } from 'next'
import Link from 'next/link'
import ItemForm from '../components/item-form'
import { getJSON } from '../lib/get-s3'

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const props = await getJSON('all.json')
    
    return {
        props
    }
}

export default function Index({
    items,
    quests
}: {
    items: {category: string, name: string, id: string}[],
    quests: {section: string, area: string, name: string, id: string, samples_1: number, samples_2: number}[]
}) {
    return (
        <>
            <ItemForm items={items} quests={quests}/>
        </>
    )
}