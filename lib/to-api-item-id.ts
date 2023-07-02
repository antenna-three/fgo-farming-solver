import { Item } from '../interfaces/atlas-academy'

function getAscensionItemIntercept(item: Item): number | undefined {
  switch (item.background) {
    case 'silver':
      return 6
    case 'gold':
      return 7
    default:
      return undefined
  }
}

function getSkillItemIntercept(item: Item): number | undefined {
  switch (item.background) {
    case 'bronze':
      return 3
    case 'silver':
      return 4
    case 'gold':
      return 5
    default:
      return undefined
  }
}

function getGenericItemIntercept(item: Item): number | undefined {
  switch (item.background) {
    case 'bronze':
      return 0
    case 'silver':
      return 1
    case 'gold':
      return 2
    default:
      return undefined
  }
}

function getItemIntercept(item: Item): number | undefined {
  switch (Math.floor(item.priority / 100)) {
    case 1:
      return getSkillItemIntercept(item)
    case 2:
      return getGenericItemIntercept(item)
    case 3:
      return getAscensionItemIntercept(item)
    default:
      return undefined
  }
}

function getItemIndex(item: Item, items: Item[]): number {
  return items
    .filter(
      ({ background, priority }) =>
        background === item.background &&
        Math.floor(priority / 100) === Math.floor(item.priority / 100)
    )
    .findIndex(({ id }) => id === item.id)
}

export function toApiItemId(item: Item, items: Item[]): string {
  const intercept = getItemIntercept(item)
  if (intercept == null) {
    return ''
  }
  return `${intercept}${getItemIndex(item, items).toString(36)}`
}
