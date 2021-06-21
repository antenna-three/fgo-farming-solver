import Head from 'next/head'
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

export default function Form({itemList}: {itemList: {category: string, item: string}[]}) {
    return (
        <>
            <Head><title>FGO周回ソルバー</title></Head>
            <section>
                <ItemForm itemList={itemList}/>
            </section>
        </>
    )
}