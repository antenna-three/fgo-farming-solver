import { ButtonProps, IconButton, IconButtonProps } from '@chakra-ui/button'
import {
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu'
import { FaGithub } from 'react-icons/fa'

const repos = [
  { repo: 'fgo-farming-solver', label: 'フロントエンド' },
  { repo: 'fgo-farming-solver-api', label: 'API' },
  { repo: 'fgodrop', label: 'スクレイピング' },
]

export const GithubMenu = (
  props: MenuButtonProps & ButtonProps & IconButtonProps
) => (
  <Menu>
    <MenuButton as={IconButton} {...props} />
    <MenuList>
      {repos.map(({ repo, label }) => (
        <a href={`https://github.com/antenna-three/${repo}`} key={repo}>
          <MenuItem>{label}</MenuItem>
        </a>
      ))}
    </MenuList>
  </Menu>
)
