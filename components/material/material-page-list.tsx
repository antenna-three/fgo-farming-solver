import React from 'react'
import { List, ListItem } from '@chakra-ui/react'
import { jpClassNames } from '../../constants/jp-class-names'
import { Link } from '../common/link'

export const PageList = ({
  currentClassName,
}: {
  currentClassName?: string
}) => {
  return (
    <>
      <List>
        {Object.entries(jpClassNames).map(([className, jpClassName]) => (
          <ListItem key={className}>
            {className == currentClassName ? (
              <>{jpClassName}</>
            ) : (
              <Link href={'/material/' + className}>{jpClassName}</Link>
            )}
          </ListItem>
        ))}
      </List>
    </>
  )
}
