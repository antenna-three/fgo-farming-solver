export const priorityToApiId = (priority: number) => {
  if (100 <= priority && priority < 107) {
    //輝石
    return '3' + (priority - 100).toString(36)
  } else if (107 <= priority && priority < 114) {
    //魔石
    return '4' + (priority - 107).toString(36)
  } else if (114 <= priority && priority < 121) {
    //秘石
    return '5' + (priority - 114).toString(36)
  } else if (200 <= priority && priority < 212) {
    //銅素材
    return '0' + (priority - 200).toString()
  } else if (212 <= priority && priority < 222) {
    //銀素材
    return '1' + (priority - 212).toString(36)
  } else if (222 <= priority && priority < 235) {
    return '1' + (priority - 213).toString(36)
  } else if (235 <= priority && priority < 299) {
    //金素材
    return '2' + (priority - 235).toString(36)
  } else if (300 <= priority && priority < 307) {
    //ピース
    return '6' + (priority - 300).toString(36)
  } else if (307 <= priority && priority < 314) {
    //モニュメント
    return '7' + (priority - 307).toString(36)
  }
  return ''
}
