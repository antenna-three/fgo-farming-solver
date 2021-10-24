import React from 'react'
import {
  Box,
  Heading,
  List,
  ListItem,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Link } from '../common/link'
import { getClassName } from '../../lib/class-names'
import { Title } from '../common/title'
import { NextPage } from 'next'
import { ServantIndexProps } from '../../pages/servants'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { groupBy } from '../../utils/group-by'
import { orderBy } from '../../utils/order-by'

export const Index: NextPage<ServantIndexProps> = ({ servantGroups }) => {
  const { locale } = useRouter()
  const { t } = useTranslation('servants')

  return (
    <VStack spacing={8} align="stretch">
      <Title>{t('サーヴァント一覧')}</Title>
      <SimpleGrid minChildWidth="300px" spacingX={3} spacingY={8}>
        {Object.entries(servantGroups).map(([className, servants]) => (
          <VStack align="start" key={className}>
            <Heading size="lg">{getClassName(className, locale)}</Heading>
            <VStack spacing={4} align="start">
              {Object.entries(groupBy(servants, ({ rarity }) => rarity))
                .sort(orderBy(([rarity]) => parseInt(rarity), 'desc'))
                .map(([rarity, servants]) => (
                  <VStack key={rarity} align="start">
                    <Heading
                      size="sm"
                      color="yellow.500"
                      aria-label={`Rarity ${rarity}`}
                    >
                      {'★'.repeat(parseInt(rarity))}
                    </Heading>
                    <List spacing={1}>
                      {servants.map((servant) => (
                        <ListItem key={servant.id}>
                          <Link href={'/servants/' + servant.id}>
                            {servant.name}
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </VStack>
                ))}
            </VStack>
          </VStack>
        ))}
      </SimpleGrid>
    </VStack>
  )
}
