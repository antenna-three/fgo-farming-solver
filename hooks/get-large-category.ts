export const getLargeCategory = (category: string) => {
  if (category == '特殊霊基再臨素材') {
    return 'イベントアイテム'
  } else if (category.endsWith('素材')) {
    return '強化素材'
  } else if (category.endsWith('石')) {
    return 'スキル石'
  } else if (category == 'QP') {
    return 'QP'
  } else {
    return 'モニュピ'
  }
}
