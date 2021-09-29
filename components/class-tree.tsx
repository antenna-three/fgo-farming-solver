import dynamic from 'next/dynamic'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import type { Servant } from '../interfaces'
import { createClassTree } from '../lib/create-tree'
import styles from '../styles/checkbox-tree.module.css'

const CheckboxTree = dynamic(() => import('react-checkbox-tree'), {
  ssr: false,
})

const ClassTree = ({
  className,
  servants,
  checked,
  expanded,
  onCheck,
  onExpand,
}: {
  className: string
  servants: Servant[]
  checked: string[]
  expanded?: string[]
  onCheck: (checked: string[]) => void
  onExpand?: (expanded: string[]) => void
}) => {
  const tree = [createClassTree(className, servants)]

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

export default ClassTree
