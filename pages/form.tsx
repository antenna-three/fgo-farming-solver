import { GetStaticProps } from 'next'
import ItemForm from '../components/item-form'
import { getItemList } from '../lib/get-s3'

export const getStaticProps: GetStaticProps = async ({ params }) => {
    //const itemList = await getItemList()
    
    const itemList = [
        {category: '銅素材', item: '証'},
        {category: '銅素材', item: '骨'},
        {category: '銅素材', item: '牙'},
        {category: '銅素材', item: '塵'},
        {category: '銀素材', item: '種'},
        {category: '銀素材', item: 'ﾗﾝﾀﾝ'},
        {category: '銀素材', item: '八連'},
        {category: '銀素材', item: '蛇玉'},
        {category: '銀素材', item: '羽根'},
        {category: '銀素材', item: '歯車'},
        {category: '金素材', item: '爪'},
        {category: '金素材', item: '心臓'},
        {category: '金素材', item: '逆鱗'},
        {category: '金素材', item: '根'},
        {category: '金素材', item: '幼角'},
        {category: '金素材', item: '涙石'},
    ]
    return {
        props: {
            itemList
        }
    }
}

export default function Form({itemList}: {itemList: {category: string, item: string}[]}) {
    return (
        <ItemForm itemList={itemList}/>
    )
}