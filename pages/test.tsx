import { GetStaticProps } from "next";
import { promises as fs } from "fs";
import path from "path"


export const getStaticProps: GetStaticProps = async () => {
    const cachePath = path.resolve('./current-time.txt')
    const currentTime = await fs.readFile(cachePath, 'utf-8')
        .catch(() => {
            const date = new Date()
            const time = date.getTime().toString()
            fs.writeFile(cachePath, time, 'utf-8')
            return time
        })
    return { props: { currentTime }, revalidate: 60 }
}

const Page = ({currentTime}: {currentTime: string}) => (<p>Current Time: {currentTime}</p>)
export default Page