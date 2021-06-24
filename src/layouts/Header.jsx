import React from 'react';
import { Layout } from 'antd';
import styles from './style.less';

export default function Header({ className, Icon, data }) {
  return <Layout.Header className={className}>{Icon}</Layout.Header>;
}
