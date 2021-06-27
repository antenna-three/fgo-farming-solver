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

    console.log(data)

    const quests: {quest: string, lap: number}[] = data.quests
    const items: {item: string, count: number}[] = data.items

    const questsRison = quests.map(({quest, lap}) => (quest + ':' + lap)).join(',')
    const itemsRison = items.map(({item, count}) => (item + ':' + count)).join(',')
    const queriesRison = Object.entries(query).filter(([item, count]) => (count != '')).map(([item, count]) => (item + ':' + count)).join(',')

    router.replace('/result?quests=' + questsRison + '&items=' + itemsRison + '&queries=' + queriesRison)
    return <Spinner/>
}