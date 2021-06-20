import { GetStaticPaths, GetStaticProps } from "next"
import ReactMarkdown from "react-markdown"
import { getMd } from '../lib/get-md'

export default function Page({ md }: { md: string }) {
    return (
        <ReactMarkdown>{md}</ReactMarkdown>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: {
                    page: 'about'
                }
            },
            {
                params: {
                    page: 'LICENSE'
                }
            }
        ],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (params == null) return { props: {md: ''}}
    const pageToFile = {about: 'docs/readme.md', LICENSE: 'LICENSE'}
    const file = pageToFile[params.page as string]
    const md = getMd(file)
    return {
        props: {
            md
        }
    }
}