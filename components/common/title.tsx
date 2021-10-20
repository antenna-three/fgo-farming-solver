import { Heading, HeadingProps } from '@chakra-ui/layout'
import { ComponentWithAs } from '@chakra-ui/system'
import { Head } from './head'

export const Title: ComponentWithAs<
  'h1',
  Omit<HeadingProps, 'children'> & { children: string | string[] }
> = ({ children, ...props }) => {
  const title = typeof children == 'string' ? children : children.join()
  return (
    <>
      <Head title={title} />
      <Heading as="h1" my={8} {...props}>
        {title}
      </Heading>
    </>
  )
}
