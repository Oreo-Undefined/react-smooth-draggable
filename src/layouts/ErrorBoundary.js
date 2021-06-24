import React from 'react';
/* import { __PROD__ } from '@/constants'
import * as Sentry from '@sentry/browser'

if (__PROD__) {
  Sentry.init({
    dsn: 'https://b4d3a215dec846a883714201730c317d@dev-sentry.mokahr.com/48',
  })
} */

class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    /* if (__PROD__) {
      Sentry.captureException(error, { extra: errorInfo, tags: { git_commit: 'react_component' } })
    } */

    console.error(error, errorInfo);
  }

  render() {
    return this.props.children;
  }
}

export default ErrorBoundary;
