import { useRouter } from 'next/router'
import useSWR from 'swr'
import Spinner from '../components/spinner'
import _ from 'underscore'

function fetcher(params: string) {
    const url = 'https://pgdz683mk2.execute-api.ap-northeast-1.amazonaws.com/fgo-farming-solver'
    
    return fetch(url + '?' + params)
        .then(res => res.json())
}

export default function Query() {
    const router = useRouter()
    const query = router.query
    const params = new URLSearchParams(router.query as any)
    const {data, error} = useSWR('' + params, fetcher)
    
    if (error) return <div>failed to load</div>
    if (!data) return <Spinner />

    if (data.message) return data.message.split('\n').map((line: string) => <p>{line}</p>)

    const quests: {quest: string, lap: number}[] = data.quests
    const items: {item: string, count: number}[] = data.items

    const questsRison = quests.map(({quest, lap}) => (quest + ':' + lap)).join(',')
    const itemsRison = items.map(({item, count}) => (item + ':' + count)).join(',')
    const queriesRison = query.items

    router.replace(`/result?quests=${questsRison}&items=${itemsRison}&queries=${queriesRison}`)
    return <Spinner/>
}