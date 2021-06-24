import React, { useCallback, useMemo } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'umi';
import menu from '@config/menu';

const { SubMenu } = Menu;

export default function Sider({ collapsed, pathname }) {
  const history = useHistory();

  const onChange = useCallback(({ key }) => {
    history.push(key);
  }, []);

  const loop = useCallback(
    list =>
      list.map(({ pathname, title, icon, children }) => {
        if (children?.length) {
          return (
            <SubMenu
              key={pathname}
              title={
                <span>
                  {icon}
                  <span>{title}</span>
                </span>
              }
            >
              {loop(children)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={pathname} icon={icon}>
            {title}
          </Menu.Item>
        );
      }),
    [],
  );

  return (
    <Layout.Sider theme="light" width={200} collapsed={collapsed}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[pathname]}
        onClick={onChange}
      >
        {loop(menu)}
      </Menu>
    </Layout.Sider>
  );
}
