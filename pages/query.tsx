import { useRouter } from 'next/router'
import useSWR from 'swr'
import Spinner from '../components/spinner'
import _ from 'underscore'

function parseQuery(query: Object) {
    return Object.entries(query)
        .filter(([item, count]) => (count != ''))
        .map(( [item, count] ) => (encodeURIComponent(item) + '=' + count))
        .join('&')
}

function fetcher(query: string) {
    const url = 'https://pgdz683mk2.execute-api.ap-northeast-1.amazonaws.com/fgo-farming-solver'
    
    return fetch(url + '?' + query)
        .then(res => res.json())
}

export default function Query() {
    const router = useRouter()
    const query = router.query
    const parsed = parseQuery(query)
    const {data, error} = useSWR(parsed, fetcher)
    
    if (error) return <div>failed to load</div>
    if (!data) return <Spinner />

    if (data.message) return <div>{data.message}</div>

    const quests: {area: string, quest: string, lap: number}[] = data.quests
    const items: {category: string, item: string, count: number}[] = data.items

    const questsRison = quests.map(({area, quest, lap}) => (area + '_' + quest + '_' + lap)).join(',')
    const itemsRison = items.map(({category, item, count}) => (category + '_' + item + '_' + count)).join(',')
    const queriesRison = Object.entries(query).filter(([item, count]) => (count != '')).map(([item, count]) => (item + ':' + count)).join(',')

    router.push('/result?quests=' + questsRison + '&items=' + itemsRison + '&queries=' + queriesRison)
    return <Spinner/>
}