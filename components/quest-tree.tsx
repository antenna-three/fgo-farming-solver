import dynamic from 'next/dynamic'
import _ from "underscore"
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import styles from '../styles/checkbox-tree.module.css'
import { useState } from "react";

import type { Node } from 'react-checkbox-tree'

const CheckboxTree = dynamic(
    () => import('react-checkbox-tree'),
    {ssr: false}
)

export default function QuestTree({
    tree,
    checked,
    setChecked,
}: {
    tree: Node[],
    checked: string[],
    setChecked: {(value: string[]): void},
}) {
    const [expanded, setExpanded] = useState([] as string[])
    return (
        <>
            <fieldset>
                <legend>周回対象に含めるクエスト</legend>
                <CheckboxTree
                    nodes={tree}
                    checkModel='all'
                    checked={checked}
                    expanded={expanded}
                    onCheck={setChecked}
                    onExpand={setExpanded}
                    icons={{
                        check: <span className={styles.checked}/>,
                        uncheck: <span className={styles.unchecked}/>,
                        halfCheck: <span className={styles.halfchecked}/>,
                        expandOpen: <span className={styles.open}/>,
                        expandClose: <span className={styles.close}/>,
                    }}
                    showNodeIcon={false}
                />
            </fieldset>
            
        </>
    )
}