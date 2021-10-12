import NextLink from 'next/link'
import {
  ComponentWithAs,
  Link as ChakraLink,
  LinkProps,
} from '@chakra-ui/react'
import React from 'react'

export const Link: ComponentWithAs<'a', LinkProps> = ({
  href,
  children,
  ...props
}) =>
  href == null ? (
    <ChakraLink color="blue.500" {...props}>
      {children}
    </ChakraLink>
  ) : (
    <NextLink href={href} passHref>
      <ChakraLink color="blue.500" {...props}>
        {children}
      </ChakraLink>
    </NextLink>
  )

export const A: ComponentWithAs<'a', LinkProps> = ({
  href,
  children,
  ...props
}) => (
  <ChakraLink href={href} color="blue.500" {...props}>
    {children}
  </ChakraLink>
)
