import { ChevronDownIcon, IconProps } from '@chakra-ui/icons'
import { ComponentWithAs } from '@chakra-ui/system'

export const ExpandChevronIcon: ComponentWithAs<
  'svg',
  IconProps & { expanded?: boolean }
> = ({ expanded, ...props }) => {
  const rotate = expanded ? '0deg' : '-90deg'

  return (
    <ChevronDownIcon
      transform={`rotate(${rotate})`}
      boxSize={5}
      color="gray"
      {...props}
    />
  )
}
