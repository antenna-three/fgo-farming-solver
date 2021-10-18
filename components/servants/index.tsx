import React from 'react'
import { Heading, List, ListItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { Head } from '../common/head'
import { Link } from '../common/link'
import { Servant } from '../../interfaces/atlas-academy'
import { getJpClassName } from '../../lib/get-jp-class-name'

export const Index = ({
  servantGroups,
}: {
  servantGroups: {
    [className: string]: Servant[]
  }
}) => (
  <>
    <Head title="サーヴァント一覧" />
    <VStack spacing={8} align="stretch">
      <Heading>サーヴァント一覧</Heading>
      <SimpleGrid minChildWidth="300px" spacingX={3} spacingY={8}>
        {Object.entries(servantGroups).map(([className, servants]) => (
          <VStack align="start" key={className}>
            <Heading size="lg">{getJpClassName(className)}</Heading>
            <List spacing={1}>
              {servants.map((servant) => (
                <ListItem key={servant.id}>
                  <Link href={'/servants/' + servant.id}>{servant.name}</Link>
                </ListItem>
              ))}
            </List>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  </>
)
