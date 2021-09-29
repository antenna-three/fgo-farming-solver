import { Fragment } from 'react'

export default function DropRateSelect({
  dropMergeMethod,
  handleChange,
}: {
  dropMergeMethod: string
  handleChange: React.FormEventHandler
}) {
  const options = [
    {
      value: 'add',
      label: '旧データ＋新データ',
      description:
        'ドロップ率が上がる前と上がった後のデータを合算します。旧データと新データの中間の結果になります。',
    },
    {
      value: '1',
      label: '旧データを優先',
      description:
        'ドロップ率が上がる前のデータを優先します。サンプル数が大きく信頼度が高いですが、ドロップ率が現在より低くなります。',
    },
    {
      value: '2',
      label: '新データを優先',
      description:
        'ドロップ率が上がった後のデータを優先します。最新のドロップ率を反映しますが、サンプル数が小さく信頼度が低い場合があります。',
    },
  ]
  return (
    <fieldset>
      <legend>ドロップ率</legend>
      {options.map(({ value, label, description }) => (
        <Fragment key={value}>
          <input
            type="radio"
            name="dropMergeMethod"
            value={value}
            onChange={handleChange}
            checked={value == dropMergeMethod}
            id={value}
          />
          <label htmlFor={value}>{label}</label>
          <p className="description">{description}</p>
        </Fragment>
      ))}
      <style jsx>{`
        .description {
          margin-top: 0;
          margin-bottom: 1rem;
          padding-left: 2rem;
          color: var(--color-text-secondary);
        }
      `}</style>
    </fieldset>
  )
}
