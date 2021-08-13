import Link from 'next/link'

type Item = {id: string, name: string}
/*
const itemColors: {[key: string]: string} = {
    0: 'fed',//銅
    1: 'eee',//銀
    2: 'ffc',//金
    3: 'eef',//輝石
    4: 'fee',//魔石
    5: 'ffc',//秘石
    6: 'eee',//ピース
    7: 'ffc'//モニュ
}
*/
/*
const itemColors: {[key: string]: string} = {
    0: 'ca5',
    1: 'aaa',
    2: 'cc5',
    3: '99c',
    4: 'f99',
    5: 'cc5',
    6: 'aaa',
    7: 'cc5'
}
*/
const itemColors: {[key: string]: string} = {
    0: 'a84',
    1: 'aaa',
    2: 'aa4',
    3: '88a',
    4: 'a88',
    5: 'aa4',
    6: 'aaa',
    7: 'aa4'
}


export default function ItemLink({item}: {item: Item}) {
    return (<>
        <Link href={`/items/${item.id}`}>
            <a className={`item-${item.id}`}>{item.name}</a>
        </Link>
        <style jsx>{`
            .item-${item.id} {
                color: #${itemColors[item.id[0]]};
                font-weight: normal;
            }
        `}</style>
    </>)
}