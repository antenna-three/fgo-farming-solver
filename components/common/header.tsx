import Image from 'next/image'
import { Link } from './link'
import {
  Box,
  Flex,
  Heading,
  HStack,
  Icon,
  MenuButton,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  MenuGroup,
  Text,
  Spacer,
} from '@chakra-ui/react'
import React from 'react'
import { HamburgerIcon } from '@chakra-ui/icons'

export const Header: React.FC = () => (
  <header>
    <Flex align="center" mt={4} mb={8}>
      <Box>
        <Link href="/">
          <HStack align="center">
            <Image
              src="/hermes.png"
              height={32}
              width={32}
              alt="site logo"
              layout="fixed"
            />
            <Heading as="h1">
              <Flex flexWrap="wrap">
                <Box as="span">FGO</Box>
                <Box as="span">周回</Box>
                <Box as="span">ソルバー</Box>
              </Flex>
            </Heading>
          </HStack>
        </Link>
      </Box>
      <Spacer />
      <nav>
        <HStack alignItems="center">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Menu"
              icon={<HamburgerIcon />}
              variant="ghost"
            />
            <MenuList>
              <MenuGroup title="Tools">
                <Link href="/material">
                  <MenuItem>育成素材計算機</MenuItem>
                </Link>

                <Link href="/farming">
                  <MenuItem>周回ソルバー</MenuItem>
                </Link>

                <Link href="/servants">
                  <MenuItem>サーヴァント一覧</MenuItem>
                </Link>

                <Link href="/items">
                  <MenuItem>アイテム一覧</MenuItem>
                </Link>
              </MenuGroup>
              <MenuGroup title="Docs">
                <Link href="/about">
                  <MenuItem>使い方</MenuItem>
                </Link>

                <Link href="/news">
                  <MenuItem>お知らせ</MenuItem>
                </Link>
              </MenuGroup>
            </MenuList>
          </Menu>
        </HStack>
      </nav>
    </Flex>
  </header>
)
