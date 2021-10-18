import { Dispatch, SetStateAction, useCallback, useMemo } from 'react'

export type Node = { value: string; children?: Node[] }
export type Checked = true | false | 'intermediate'
export type CheckedTree = {
  [value: string]: { checked: Checked; children?: CheckedTree }
}
export type LeafState = { [key: string]: boolean }
export type NodeState = { [key: string]: Checked }

const getLeafValues = (tree: Node[]): string[] =>
  tree.flatMap(({ value, children }) =>
    children == null ? value : getLeafValues(children)
  )

const getNodeToLeaves = (tree: Node[]): { [value: string]: string[] } =>
  tree
    .map(({ value, children }) => {
      if (children == null) {
        return { [value]: [value] }
      } else {
        return {
          ...getNodeToLeaves(children),
          [value]: getLeafValues(children),
        }
      }
    })
    .reduce((acc, cur) => ({ ...acc, ...cur }), {})

const getNodeState = (tree: Node[], leafState: LeafState): NodeState =>
  tree
    .map(({ value, children }) => {
      if (children == null) {
        return { [value]: leafState[value] }
      } else {
        const childrenState = getNodeState(children, leafState)
        const allChildrenTrue = Object.values(childrenState).every(
          (checked) => checked == true
        )
        const allChildrenFalse = Object.values(childrenState).every(
          (checked) => checked == false
        )
        const nodeChecked: Checked = allChildrenTrue
          ? true
          : allChildrenFalse
          ? false
          : 'intermediate'
        return { ...childrenState, [value]: nodeChecked }
      }
    })
    .reduce((acc, cur) => ({ ...acc, ...cur }), {})

const createCheckedTree = (tree: Node[], nodeState: NodeState): CheckedTree =>
  tree
    .map(({ value, children }) => {
      if (children == null) {
        return { [value]: { checked: nodeState[value] } }
      } else {
        const checkedChildren = createCheckedTree(children, nodeState)
        const checked: Checked = nodeState[value]
        return { [value]: { checked, children: checkedChildren } }
      }
    })
    .reduce((acc, cur) => Object.assign(acc, cur), {})

export const useCheckboxTree = (
  tree: Node[],
  leafState: LeafState,
  setLeafState: Dispatch<SetStateAction<LeafState>>
) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nodeToLeaves = useMemo(() => getNodeToLeaves(tree), [])
  const onCheck = useCallback(
    (value: string, checked: boolean) => {
      setLeafState((state) => {
        const leaves = nodeToLeaves[value]
        let state_ = {
          ...state,
          ...Object.fromEntries(leaves.map((value) => [value, checked])),
        }
        return state_
      })
    },
    [nodeToLeaves, setLeafState]
  )
  const nodeState = useMemo(
    () => getNodeState(tree, leafState),
    [leafState, tree]
  )
  const checkedTree = useMemo(
    () => createCheckedTree(tree, nodeState),
    [nodeState, tree]
  )
  return { checkedTree, onCheck }
}
