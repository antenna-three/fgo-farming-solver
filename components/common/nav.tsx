import NextLink from 'next/link'
import { HamburgerIcon } from '@chakra-ui/icons'
import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import React from 'react'

const menuGroups = [
  {
    title: 'Tools',
    items: [
      { href: '/material', label: '育成素材計算機' },
      { href: '/farming', label: '周回ソルバー' },
      { href: '/servants', label: 'サーヴァント一覧' },
      { href: '/items', label: 'アイテム一覧' },
    ],
  },
  {
    title: 'Docs',
    items: [
      { href: '/docs', label: '使い方' },
      { href: '/news', label: 'お知らせ' },
    ],
  },
]

export const Nav = () => (
  <nav>
    <HStack alignItems="center">
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Menu"
          icon={<HamburgerIcon />}
          size="lg"
          variant="ghost"
        />
        <MenuList>
          {menuGroups.map(({ title, items }) => (
            <MenuGroup title={title} key={title}>
              {items.map(({ href, label }) => (
                <NextLink href={href} key={href}>
                  <a>
                    <MenuItem>{label}</MenuItem>
                  </a>
                </NextLink>
              ))}
            </MenuGroup>
          ))}
        </MenuList>
      </Menu>
    </HStack>
  </nav>
)
