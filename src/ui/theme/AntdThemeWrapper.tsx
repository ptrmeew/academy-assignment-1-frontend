import { ConfigProvider } from 'antd';
import { ThemeConfig } from 'antd/lib/config-provider/context';

export const AntdThemeWrapper: React.FC = ({ children }) => {
  const themeConfig: ThemeConfig = {
    token: {
      colorPrimary: '#202124',
      colorBgBase: '#ffffff',
      borderRadius: 0,
    },
  };
  return <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>;
};
