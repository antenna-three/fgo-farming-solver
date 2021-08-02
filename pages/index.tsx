import { GetStaticProps } from 'next'
import Link from 'next/link'
import ItemForm from '../components/item-form'
import { getS3 } from '../lib/get-s3'

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const items = await getS3('items_2021.csv')
    const quests = (await getS3('quests_2021.csv')).map(({ section, area, name, id }) => ({ section, area, name, id }))
    
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
            <p><Link href="/news"><a>お知らせ: ドロップ率改定に伴う対応について</a></Link></p>
            <ItemForm items={items} quests={quests}/>
        </>
    )
}