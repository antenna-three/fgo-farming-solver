export async function callApi(itemCounts: Object) {
    const url = 'https://pgdz683mk2.execute-api.ap-northeast-1.amazonaws.com/fgo-farming-solver'
    const queryString = Object.entries(itemCounts)
        .filter(([item, count]) => (count != ''))
        .map(( [item, count] ) => (encodeURIComponent(item) + '=' + count))
        .reduce((acc, cur) => acc + '&' + cur)
    try {
        const response = await fetch(url + '?' + queryString)
        const json = await response.json()
        return json
    } catch (e) {
        console.log(e, e.stack)
        return null
    }
}