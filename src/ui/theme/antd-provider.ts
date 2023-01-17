/** This file configures the provider that themes the antd components of the app. */
import { ConfigProvider } from 'antd';

export const initAntd = () => {
  ConfigProvider.config({
    theme: {
      primaryColor: '#29837E',
      infoColor: '#259db8',
      successColor: '#6DD63C',
      processingColor: '#259db8',
      errorColor: '#EB3F3F',
      warningColor: '#EDD036',
    },
  });
};
