import { useTranslation } from 'react-i18next'

import { PAGES } from '../navigation/pageRoutes'
import notfoundImg from '../assets/notfound.svg'

const NotFoundPage = () => {
  const { t } = useTranslation()

  return (
    <div className="text-center">
      <img
        className="img-fluid h-25"
        src={notfoundImg}
        alt={t('notFoundPage.pageNotFound')}
      />
      <h1 className="h4 text-muted">{t('notFoundPage.pageNotFound')}</h1>
      <p className="text-muted">
        {t('notFoundPage.butYouCanMove')}
        <a href={PAGES.MAIN}>{t('notFoundPage.toHomePage')}</a>
      </p>
    </div>
  )
}

export default NotFoundPage
