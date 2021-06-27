import { GetStaticPaths, GetStaticProps } from "next"
import ReactMarkdown from "react-markdown"
import { getMd } from '../lib/get-md'
import Head from '../components/head'

export default function Page({ title, md }: { title: string, md: string }) {
    return (
        <>
        <Head title={title}/>
        <ReactMarkdown>{md}</ReactMarkdown>
        </>
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
    const pageToFileTitle = (p: string) => {
        switch(p) {
            case 'about': return ['docs/readme.md', 'About']
            case 'LICENSE': return ['LICENSE', 'LICENSE']
            default: return ['', '']
        }
    }
    const [file, title] = pageToFileTitle(params.page as string)
    const md = getMd(file)
    return {
        props: {
            title,
            md
        }
    }
}