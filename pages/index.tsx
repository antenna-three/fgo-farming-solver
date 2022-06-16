import { ExternalLinkIcon } from '@chakra-ui/icons'
import {
  Box,
  chakra,
  ChakraComponent,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { motion, TargetAndTransition, Transition } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { ExternalLink, Link } from '../components/common/link'
import { theme } from '../theme'

const MotionSpan = motion(chakra.span)

const NoWrap: ChakraComponent<'span'> = ({ children, ...props }) => (
  <chakra.span whiteSpace="nowrap" {...props}>
    {children}
  </chakra.span>
)

const Card: ChakraComponent<'div'> = ({ children, ...props }) => {
  return (
    <VStack
      align="stretch"
      justify="space-between"
      h="100%"
      borderWidth="thin"
      rounded="lg"
      _hover={{ boxShadow: 'lg' }}
      {...props}
    >
      {children}
    </VStack>
  )
}

const CardBody: ChakraComponent<'div', { href: string }> = ({
  href,
  children,
}) => (
  <Link href={href} flexGrow="1" variant="unstyled">
    <VStack p={5} spacing={5} align="start" flexGrow={1}>
      {children}
    </VStack>
  </Link>
)

const colors = theme.colors as Record<string, Record<number, string>>

const gray = colors.gray[800]
const blue = colors.blue[500]
const green = colors.green[500]
const orange = colors.orange[500]

const blueAnimate: TargetAndTransition = { color: [gray, blue, blue, gray] }
const greenAnimate: TargetAndTransition = { color: [gray, green, green, gray] }
const orangeAnimate: TargetAndTransition = {
  color: [gray, orange, orange, gray],
}

const transition: Transition = {
  ease: 'easeInOut',
  repeat: Infinity,
  repeatDelay: 4,
  repeatType: 'loop',
  times: [0, 0.2, 0.5, 0.7],
  duration: 4,
}

const Index = () => {
  const { t } = useTranslation('common')
  const [farmingResultUrl, setFarmingResultUrl] = useState('')
  const [materialResultExists, setMaterialResultExists] = useState(false)

  useEffect(() => {
    setFarmingResultUrl(
      localStorage.getItem('farming/results')?.replace(/"/g, '') ?? ''
    )
    setMaterialResultExists('material/result' in localStorage)
  }, [])

  return (
    <VStack spacing={12} mt={12}>
      <VStack textAlign="center">
        <Trans
          t={t}
          i18nKey="title"
          components={{
            h: <Heading as="h1" size="xl" />,
            nw: <NoWrap />,
            s: <NoWrap fontSize="0.8em" />,
            m1: (
              <MotionSpan
                animate={blueAnimate}
                transition={{ ...transition, delay: 0 }}
              />
            ),
            m2: (
              <MotionSpan
                animate={greenAnimate}
                transition={{ ...transition, delay: 2 }}
              />
            ),
            m3: (
              <MotionSpan
                animate={greenAnimate}
                transition={{ ...transition, delay: 4 }}
              />
            ),
            m4: (
              <MotionSpan
                animate={orangeAnimate}
                transition={{ ...transition, delay: 6 }}
              />
            ),
          }}
        />
      </VStack>
      <SimpleGrid minChildWidth="250px" spacing={4} alignItems="stretch">
        <GridItem>
          <Card>
            <CardBody href="/material">
              <Heading size="lg">{t('育成素材計算機')}</Heading>
              <Text>{t('material-calculator-description')}</Text>
            </CardBody>
            {materialResultExists && (
              <Link href="/material/result">
                <Box p={5} borderTop="1px solid #eee">
                  {t('前回の結果')}
                </Box>
              </Link>
            )}
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody href="/farming">
              <Heading size="lg">{t('周回ソルバー')}</Heading>
              <Text>{t('farming-solver-description')}</Text>
            </CardBody>
            {farmingResultUrl && (
              <Link href={farmingResultUrl}>
                <Box p={5} borderTop="1px solid #eee">
                  {t('前回の結果')}
                </Box>
              </Link>
            )}
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody href="/servants">
              <Heading size="lg">{t('サーヴァント一覧')}</Heading>
              <Text>{t('servant-list-description')}</Text>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody href="/items">
              <Heading size="lg">{t('アイテム一覧')}</Heading>
              <Text>{t('item-list-description')}</Text>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <CardBody href="/cloud">
              <Heading size="lg">{t('クラウドセーブ')}</Heading>
              <Text>{t('cloud-description')}</Text>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card>
            <ExternalLink
              href={`https://twitter.com/search?q=${encodeURIComponent(
                '#FGO周回ソルバー'
              )}`}
              variant="unstyled"
            >
              <VStack p={5} spacing={5} align="start">
                <Heading size="lg">
                  {t('みんなの結果')}
                  <ExternalLinkIcon mx={2} />
                </Heading>
                <Text>{t('shared-results-description')}</Text>
              </VStack>
            </ExternalLink>
          </Card>
        </GridItem>
      </SimpleGrid>
    </VStack>
  )
}

export default Index
