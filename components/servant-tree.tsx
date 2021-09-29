import dynamic from 'next/dynamic'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import styles from '../styles/checkbox-tree.module.css'
import type { Servant } from '../interfaces'
import { createServantTree } from '../lib/create-tree'

const CheckboxTree = dynamic(() => import('react-checkbox-tree'), {
  ssr: false,
})

const ServantTree = ({
  servants,
  checked,
  expanded,
  onCheck,
  onExpand,
}: {
  servants: Servant[]
  checked: string[]
  expanded: string[]
  onCheck: (checked: string[]) => void
  onExpand: (expanded: string[]) => void
}) => {
  const tree = createServantTree(servants)

  return (
    <>
      <CheckboxTree
        nodes={tree}
        checked={checked}
        expanded={expanded}
        onCheck={onCheck}
        onExpand={onExpand}
        icons={{
          check: <span className={styles.checked} />,
          uncheck: <span className={styles.unchecked} />,
          halfCheck: <span className={styles.halfchecked} />,
          expandOpen: <span className={styles.open} />,
          expandClose: <span className={styles.close} />,
        }}
        showNodeIcon={false}
      />
      <style jsx>{``}</style>
    </>
  )
}

export default ServantTree
