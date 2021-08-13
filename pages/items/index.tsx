import { GetStaticProps } from "next";
import Head from '../../components/head'
import _ from "underscore";
import ItemLink from "../../components/item-link";
import { getLargeCategory } from "../../lib/get-large-category";
import { getGzip } from "../../lib/get-s3";

type Item = {id: string, category: string, name: string}

export const getStaticProps: GetStaticProps = async () => {
    const {items} = await getGzip('all.json.gz')
    return {props: {items}}
}

export default function Index({items}: {items: Item[]}) {
    const itemGroups = Object.entries(_.groupBy(items, ({category}) => (category)))
    const largeItemGroups = Object.entries(_.groupBy(itemGroups, ([category, group]) => (getLargeCategory(category))))
    const title = "アイテム一覧"

    return (<>
        <Head title={title}/>
        <h1>{title}</h1>
        <div className="flex">
        {largeItemGroups.map(([largeCategory, largeGroup]) => (
            <div className="large-category" key={largeCategory}>
                <h2>{largeCategory}</h2>
                <div className="flex">
                {largeGroup.map(([category, group]) => (
                    <div className="category" key={category}>
                        <h3>{category}</h3>
                        {group.map((item) => (
                            <p><ItemLink item={item}/></p>
                        ))}
                    </div>
                ))}
                </div>
            </div>
        ))}
        </div>
        <style jsx>{`
            .flex {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
            }
            .category {
                min-width: 5rem;
            }
            a {
                cursor: pointer;
            }
        `}</style>
    </>)
}