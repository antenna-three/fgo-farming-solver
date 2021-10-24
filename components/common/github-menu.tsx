import { ButtonProps, IconButton, IconButtonProps } from '@chakra-ui/button'
import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu'
import { useRouter } from 'next/router'
import { FaGithub } from 'react-icons/fa'

const repos: { repo: string; label: { [locale: string]: string } }[] = [
  {
    repo: 'fgo-farming-solver',
    label: { ja: 'フロントエンド', en: 'Front end' },
  },
  { repo: 'fgo-farming-solver-api', label: { ja: 'API', en: 'API' } },
  { repo: 'fgodrop', label: { ja: 'スクレイピング', en: 'Scraping' } },
]

export const GithubMenu = (
  props: MenuButtonProps & ButtonProps & IconButtonProps
) => {
  const { locale } = useRouter()
  return (
    <Menu>
      <MenuButton as={IconButton} {...props} />
      <MenuList>
        {repos.map(({ repo, label }) => (
          <a
            href={`https://github.com/antenna-three/${repo}`}
            target="_blank"
            rel="noopener noreferrer"
            key={repo}
          >
            <MenuItem>{label[locale ?? 'ja']}</MenuItem>
          </a>
        ))}
      </MenuList>
    </Menu>
  )
}
