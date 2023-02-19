// <reference types="node"/>
import NextLink from 'next/link'
import {
  ComponentWithAs,
  Link as ChakraLink,
  LinkProps,
} from '@chakra-ui/react'
import React from 'react'

export const Link: ComponentWithAs<'a', LinkProps> = ({
  children,
  ...props
}) => (
  <ChakraLink {...props} as={NextLink}>
    {children}
  </ChakraLink>
)

export const ExternalLink: ComponentWithAs<'a', LinkProps> = (props) => (
  <ChakraLink isExternal {...props} />
)
