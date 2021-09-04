import { useRouter } from 'next/router'
import Error from '../_error'
import useSWR from 'swr'
import Spinner from '../../components/spinner'
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
    const params = new URLSearchParams({...router.query, fields: 'id'} as any)
    const {data, error} = useSWR('' + params, fetcher)
    
    if (error) return (
        <Error statusCode={error.status}/>
    )
    if (!data) return <Spinner message={'計算中'}/>

    if (data.message) return <Error statusCode={400} message={data.message.split('\n')}/>

    router.replace('/farming/results/' + data.id)
    return <Spinner/>
}