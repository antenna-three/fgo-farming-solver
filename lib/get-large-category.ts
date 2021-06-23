export const getLargeCategory = (category: string) => {
    if (category.endsWith('素材')) {
        return '強化素材'
    } else if (category.endsWith('石')) {
        return 'スキル石'
    } else {
        return 'モニュピ'
    }
}