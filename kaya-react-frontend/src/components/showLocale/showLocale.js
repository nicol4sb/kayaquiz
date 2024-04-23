import React from 'react';
import { useTranslation } from 'react-i18next';

function ShowLocale() {
  const { i18n } = useTranslation();

  return (
    <div>
      Current Locale: {i18n.language}
    </div>
  );
}

export default ShowLocale;
