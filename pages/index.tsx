import Head from '../components/head'
import { GetStaticProps } from 'next'
import ItemForm from '../components/item-form'
import { getS3 } from '../lib/get-s3'

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const itemList = await getS3('items.csv')
    
    return {
        props: {
            itemList
        }
    }
}

export default function Form({
    itemList
}: {
    itemList: {category: string, item: string, id: string}[]
}) {
    return (
        <>
            <header>
                <h2>集めたい素材の数を入力してください</h2>
            </header>
            <section>
                <ItemForm itemList={itemList}/>
            </section>
        </>
    )
}