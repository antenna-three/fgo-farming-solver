import { HamburgerIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { LangMenuItem } from './lang-menu-item'

export const menuGroups = [
  {
    title: 'Tools',
    items: [
      {
        href: '/material',
        label: { ja: '育成素材計算機', en: 'Material Calculator' },
      },
      { href: '/farming', label: { ja: '周回ソルバー', en: 'Farming Solver' } },
      {
        href: '/servants',
        label: { ja: 'サーヴァント一覧', en: 'Sarvant List' },
      },
      { href: '/items', label: { ja: 'アイテム一覧', en: 'Item List' } },
      { href: '/cloud', label: { ja: 'クラウドセーブ', en: 'Save to Cloud' } },
    ],
  },
  {
    title: 'Docs',
    items: [
      { href: '/docs', label: { ja: '使い方', en: 'About' } },
      { href: '/news', label: { ja: 'お知らせ', en: 'News' } },
    ],
  },
]

export const Nav = () => {
  const { locale } = useRouter()
  return (
    <nav>
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
                  <MenuItem>{label[(locale ?? 'ja') as 'en' | 'ja']}</MenuItem>
                </NextLink>
              ))}
            </MenuGroup>
          ))}
          <MenuDivider />
          <LangMenuItem />
        </MenuList>
      </Menu>
    </nav>
  )
}
