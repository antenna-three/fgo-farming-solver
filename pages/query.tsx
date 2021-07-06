import { useRouter } from 'next/router'
import Error from 'next/error'
import useSWR from 'swr'
import Spinner from '../components/spinner'
import _ from 'underscore'

function fetcher(params: string) {
    const url = 'https://pgdz683mk2.execute-api.ap-northeast-1.amazonaws.com/fgo-farming-solver'
    
    return fetch(url + '?' + params)
        .then(res => res.json())
}

function isStrToStr(arg: any): arg is {[key: string]: string} {
    return Object.values(arg).every((value) => (typeof value === 'string'))
}

export default function Query() {
    const router = useRouter()
    const query = router.query
    if (!isStrToStr(query)) {
        return <Error statusCode={400}/>
    }
    const params = new URLSearchParams({...router.query, fields: 'quests,items'} as any)
    const pp = new URLSearchParams({foo: 'bar'})
    const {data, error} = useSWR('' + params, fetcher)
    
    if (error) return <div>failed to load</div>
    if (!data) return <Spinner />

    if (data.message) return data.message.split('\n').map((line: string) => <p>{line}</p>)

    const quests: {id: string, lap: number}[] = data.quests
    const items: {id: string, count: number}[] = data.items

    const questsRison = quests.map(({id, lap}) => (id + ':' + lap)).join(',')
    const itemsRison = items.map(({id, count}) => (id + ':' + count)).join(',')
    const queriesRison = query.items

    router.replace(`/result?quests=${questsRison}&items=${itemsRison}&queries=${queriesRison}`)
    return <Spinner/>
}