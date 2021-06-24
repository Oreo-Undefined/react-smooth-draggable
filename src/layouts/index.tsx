import React, { useMemo, useCallback } from 'react';
import { ConfigProvider, Layout, Empty } from 'antd';
import { useLocation } from 'umi';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { useLocalStorageState, useToggle } from '@umijs/hooks';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import ErrorBoundary from './ErrorBoundary';
import Header from './Header';
import Sider from './Sider';

import styles from './style.less';
import './global.less';

const fullScreenPages = ['/login']; // 不展示左侧、顶部菜单栏的页面

export default function({ children }) {
  const { pathname } = useLocation();
  const [collapsed, setCollapsed] = useLocalStorageState('sider-collapsed', '');
  const { state, toggle } = useToggle(!!collapsed);

  const hideMenus = useMemo(() => fullScreenPages.includes(pathname), [
    pathname,
  ]);
  const Icon = state ? MenuUnfoldOutlined : MenuFoldOutlined;

  const onCollapse = useCallback(() => {
    toggle();
    setCollapsed(state ? undefined : 1);
  }, [state]);

  return (
    <ErrorBoundary>
      <ConfigProvider renderEmpty={Empty} locale={zhCN}>
        {hideMenus ? (
          children
        ) : (
          <Layout className={styles.Layout}>
            <Header
              className={styles.Header}
              Icon={<Icon onClick={onCollapse} />}
              data={{}}
            />
            <Layout>
              <Sider pathname={pathname} collapsed={state} />
              <Layout.Content>
                <div className={styles.main}>{children}</div>
              </Layout.Content>
            </Layout>
          </Layout>
        )}
      </ConfigProvider>
    </ErrorBoundary>
  );
}
