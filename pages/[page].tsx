import { GetStaticPaths, GetStaticProps } from 'next'
import Page from '../components/common/doc'
import { getMd } from '../lib/get-md'

export type PageProps = { title: string; md: string }

const pages: {
  [page: string]: { [locale: string]: { path: string; title: string } }
} = {
  docs: {
    en: { path: 'docs/readme.md', title: 'About' },
    ja: { path: 'docs/readme-ja.md', title: '使い方' },
  },
  news: {
    en: { path: 'docs/news.md', title: 'News' },
    ja: { path: 'docs/news-ja.md', title: 'お知らせ' },
  },
  contributing: { en: { path: 'docs/contributing.md', title: 'Contributing' } },
  LICENSE: { en: { path: 'LICENSE', title: 'License' } },
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.entries(pages).flatMap(([page, locales]) =>
    Object.keys(locales).map((locale) => ({
      params: { page },
      locale,
    }))
  )
  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<PageProps> = async ({
  params,
  locale,
}) => {
  if (typeof params?.page != 'string' || !(params.page in pages)) {
    return { notFound: true }
  }
  const localeToPage = pages[params.page]
  const _locale = locale != null && locale in localeToPage ? locale : 'en'
  const { path, title } = localeToPage[_locale]
  const md = getMd(path)
  return {
    props: {
      title,
      md,
    },
  }
}

export default Page
