import React from 'react'
import { Heading, List, ListItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { Link } from '../common/link'
import { getJpClassName } from '../../lib/get-jp-class-name'
import { Title } from '../common/title'
import { NextPage } from 'next'
import { ServantIndexProps } from '../../pages/servants'

export const Index: NextPage<ServantIndexProps> = ({ servantGroups }) => (
  <VStack spacing={8} align="stretch">
    <Title>サーヴァント一覧</Title>
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
)
