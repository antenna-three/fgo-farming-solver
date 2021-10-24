export const classNames: { [locale: string]: { [className: string]: string } } =
  {
    ja: {
      saber: 'セイバー',
      archer: 'アーチャー',
      lancer: 'ランサー',
      rider: 'ライダー',
      caster: 'キャスター',
      assassin: 'アサシン',
      berserker: 'バーサーカー',
      shielder: 'シールダー',
      ruler: 'ルーラー',
      avenger: 'アヴェンジャー',
      alterEgo: 'アルターエゴ',
      moonCancer: 'ムーンキャンサー',
      foreigner: 'フォーリナー',
      pretender: 'プリテンダー',
    },
    en: {
      saber: 'Saber',
      archer: 'Archer',
      lancer: 'Lancer',
      rider: 'Rider',
      caster: 'Caster',
      assassin: 'Assassin',
      berserker: 'Berserker',
      shielder: 'Shielder',
      ruler: 'Ruler',
      avenger: 'Avenger',
      alterEgo: 'Alter Ego',
      moonCancer: 'Moon Cancer',
      foreigner: 'Foreigner',
      pretender: 'Pretender',
    },
  }

export const getClassName = (
  className: string,
  locale: string = 'ja',
  def?: string
) => classNames[locale][className] || def || className
