import {
  BreadcrumbLink as ChakraBreadcrumbLink,
  BreadcrumbLinkProps,
} from '@chakra-ui/breadcrumb'
import { ComponentWithAs } from '@chakra-ui/system'
import Link from 'next/link'

export const BreadcrumbLink: ComponentWithAs<'a', BreadcrumbLinkProps> = ({
  href,
  children,
  ...props
}) => (
  <Link href={href || '#'} passHref>
    <ChakraBreadcrumbLink {...props}>{children}</ChakraBreadcrumbLink>
  </Link>
)
