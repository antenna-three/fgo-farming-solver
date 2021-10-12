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
                <MenuItem>
                  <Link href="/material">育成素材計算機</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/farming">周回ソルバー</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/servants">サーヴァント一覧</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/items">アイテム一覧</Link>
                </MenuItem>
              </MenuGroup>
              <MenuGroup title="Docs">
                <MenuItem>
                  <Link href="/about">使い方</Link>
                </MenuItem>
                <MenuItem>
                  <Link href="/news">お知らせ</Link>
                </MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        </HStack>
      </nav>
    </Flex>
  </header>
)
