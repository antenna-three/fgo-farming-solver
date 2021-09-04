import dynamic from 'next/dynamic'
import { useState } from 'react'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import type { Servant } from '../interfaces'
import { createServantTree } from '../lib/create-tree'


const CheckboxTree = dynamic(
    () => import('react-checkbox-tree'),
    { ssr: false }
)

const ServantTree = ({
    servants,
    checked,
    expanded,
    onCheck,
    onExpand,
}: {
    servants: Servant[],
    checked: string[],
    expanded: string[],
    onCheck: (checked: string[]) => void,
    onExpand: (expanded: string[]) => void,
}) => {
    const tree = createServantTree(servants)

    return (<>
        <CheckboxTree
            nodes={tree}
            checked={checked}
            expanded={expanded}
            onCheck={onCheck}
            onExpand={onExpand}
            icons={{
                check: <span className="ch" />,
                uncheck: <span className="un" />,
                halfCheck: <span className="hf" />,
                expandOpen: <span className="op" />,
                expandClose: <span className="cl" />,
            }}
            showNodeIcon={false}
        />
        <style jsx>{`
            .op {
                position: relative;
            }
            .op::before {
                content: "";
                position: absolute;
                transform: translate(50%, -150%) rotate(135deg);
                top: 0;
                left: 0;
                width: .4rem;
                height: .4rem;
                border-top: 2px solid #777;
                border-right: 2px solid #777;
            }
            .cl {
                position: relative;
            }
            .cl::before {
                content: "";
                position: absolute;
                transform: translate(0, -120%) rotate(45deg);
                top: 0;
                left: 0;
                width: .4rem;
                height: .4rem;
                border-top: 2px solid #777;
                border-right: 2px solid #777;
            }
            .un, .ch, .hf {
                position: relative;
            }
            .un::before, .ch::before, .hf::before {
                content: "";
                position: absolute;
                top: -.9rem;
                left: 0;
                width: .8rem;
                height: .8rem;
                border: 2px solid var(--color-bg-secondary);
                border-radius: 5px;
            }
            .ch::after, .hf::after {
                content: "";
                position: absolute;
                top: -1.2rem;
                left: .2rem;
                width: .5rem;
                height: .8rem;
                transform: rotate(45deg);
            }
            .ch::after {
                border-right: 3px solid var(--color);
                border-bottom: 3px solid var(--color);
            }
            .hf::after {
                border-right: 3px solid var(--color-bg-secondary);
                border-bottom: 3px solid var(--color-bg-secondary);
            }
            .root, .inner {
                font-weight: bold;
            }
        `}</style>
    </>)
}

export default ServantTree