import { GetStaticProps } from 'next'
import { ImportExport } from '../../components/farming/import-export'
import { serverSideTranslations } from '../../lib/server-side-translations'

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await serverSideTranslations(locale),
})

export default ImportExport
