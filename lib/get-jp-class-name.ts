const jpClassNames: {[key: string]: string} = {
    saber: "セイバー",
    archer: "アーチャー",
    lancer: "ランサー",
    rider: "ライダー",
    caster: "キャスター",
    assassin: "アサシン",
    berserker: "バーサーカー",
    shielder: "シールダー",
    ruler: "ルーラー",
    avenger: "アヴェンジャー",
    alterEgo: "アルターエゴ",
    moonCancer: "ムーンキャンサー",
    foreigner: "フォーリナー",
    pretender: "プリテンダー"
}

export const getJpClassName = (className: string, def?: string) => (jpClassNames[className] || def || className)