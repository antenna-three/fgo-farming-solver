import type { Materials } from '../interfaces'

export default function MaterialList({ materials }: { materials: Materials }) {
  return (
    <>
      {Object.entries(materials).map(([lv, materials]) => (
        <div key={lv}>
          <h3>{lv}</h3>
          {materials.items.map(({ item, amount }) => (
            <div key={item.id}>
              <p>
                {item.name}: {amount}
              </p>
            </div>
          ))}
        </div>
      ))}
    </>
  )
}
