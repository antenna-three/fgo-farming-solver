import { ChevronDownIcon, IconProps } from '@chakra-ui/icons'
import { ComponentWithAs } from '@chakra-ui/system'
import { motion } from 'framer-motion'

export const MotionChevronIcon = motion<IconProps>(ChevronDownIcon)

export const ExpandChevronIcon: ComponentWithAs<
  'svg',
  IconProps & { expanded?: boolean }
> = ({ expanded, ...props }) => {
  const rotate = expanded ? 0 : -90

  return (
    <MotionChevronIcon
      animate={{ rotate }}
      boxSize={5}
      color="gray"
      {...props}
    />
  )
}
