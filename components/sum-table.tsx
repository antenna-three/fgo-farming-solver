export default function SumTable({
  rows,
}: {
  rows: { key: string; value: number | string; unit: string }[]
}) {
  return (
    <table>
      <tbody>
        {rows.map(({ key, value, unit }) => (
          <tr key={key}>
            <td className="left">{key}</td>
            <td className="right">{value}</td>
            <td className="left">{unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
