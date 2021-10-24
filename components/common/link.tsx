// <reference types="node"/>
import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import {
  ComponentWithAs,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import React from 'react'
import { UrlObject } from 'url'

type Url = string | UrlObject

export type LinkProps = Omit<ChakraLinkProps, 'href'> & NextLinkProps

export const Link: ComponentWithAs<'a', LinkProps> = ({
  href,
  locale,
  children,
  ...props
}) => (
  <NextLink href={href} locale={locale} passHref>
    <ChakraLink {...props}>{children}</ChakraLink>
  </NextLink>
)

export const ExternalLink: ComponentWithAs<'a', ChakraLinkProps> = (props) => (
  <ChakraLink isExternal {...props} />
)
