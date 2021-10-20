// <reference types="node"/>
import NextLink from 'next/link'
import {
  ComponentWithAs,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import React from 'react'
import { UrlObject } from 'url'

type Url = string | UrlObject

export type LinkProps = Omit<ChakraLinkProps, 'href'> & { href: Url }

export const Link: ComponentWithAs<'a', LinkProps> = ({
  href,
  children,
  ...props
}) => (
  <NextLink href={href} passHref>
    <ChakraLink {...props}>{children}</ChakraLink>
  </NextLink>
)

export const ExternalLink: ComponentWithAs<'a', ChakraLinkProps> = (props) => (
  <ChakraLink isExternal {...props} />
)
