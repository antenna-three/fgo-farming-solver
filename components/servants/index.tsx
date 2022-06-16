import { Heading, List, ListItem, SimpleGrid, VStack } from '@chakra-ui/react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Servant } from '../../interfaces/atlas-academy'
import { getClassName } from '../../lib/class-names'
import { ServantIndexProps } from '../../pages/servants'
import { groupBy } from '../../utils/group-by'
import { orderBy } from '../../utils/order-by'
import { Link } from '../common/link'
import { Title } from '../common/title'

export const Index: NextPage<ServantIndexProps> = ({ servants }) => {
  const { locale } = useRouter()
  const { t } = useTranslation('servants')
  const servantGroups = Object.entries(
    groupBy(servants, ({ className }) => className)
  ).map(([className, servants]): [string, [string, Servant[]][]] => [
    className,
    Object.entries(groupBy(servants, ({ rarity }) => rarity)).sort(
      orderBy(([rarity]) => parseInt(rarity), 'desc')
    ),
  ])

  return (
    <VStack spacing={8} align="stretch">
      <Title>{t('サーヴァント一覧')}</Title>
      <SimpleGrid minChildWidth="300px" spacingX={3} spacingY={8}>
        {servantGroups.map(([className, servantGroups]) => (
          <VStack align="start" key={className}>
            <Heading size="lg">{getClassName(className, locale)}</Heading>
            <VStack spacing={4} align="start">
              {servantGroups.map(([rarity, servants]) => (
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
                        <Link href={`/servants/${servant.id}`}>
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
