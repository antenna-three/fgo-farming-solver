import { GetStaticProps } from 'next'
import Link from 'next/link'
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
            <main>            
                <ItemForm itemList={itemList}/>
                <style jsx>{`
                    main {
                        max-width: var(--width-card-wide)
                    }
                    .header {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                    }
                    img {
                        margin-right: 12px;
                    }
                    a {
                        margin-left: auto;
                    }
                `}</style>
            </main>
        </>
    )
}