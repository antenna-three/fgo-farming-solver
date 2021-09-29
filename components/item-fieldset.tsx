import ItemCategoryFieldset from './item-category-fieldset'

export default function ItemFieldset({
  categoryGroups,
  inputItems,
  handleChange,
}: {
  categoryGroups: [string, [string, { name: string; id: string }[]][]][]
  inputItems: { [key: string]: string }
  handleChange: React.FormEventHandler
}) {
  return (
    <fieldset>
      <legend>集めたいアイテムの数</legend>
      {categoryGroups.map(([largeCategory, categoryGroup]) => (
        <details key={largeCategory} open={largeCategory == '強化素材'}>
          <summary>{largeCategory}</summary>
          <div className="item-fieldsets">
            {categoryGroup.map(([category, items]) => (
              <ItemCategoryFieldset
                key={category}
                category={category}
                items={items}
                inputValues={inputItems}
                handleChange={handleChange}
              />
            ))}
          </div>
        </details>
      ))}
      <style jsx>{`
        .item-fieldsets {
          display: flex;
          flex-wrap: wrap;
        }
      `}</style>
    </fieldset>
  )
}
