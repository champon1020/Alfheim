import * as React from "react";

import ErrorPage from "./ErrorPage";

type State = {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
};

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error: error,
    };
  }

  // componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
  //   console.error(error);
  //   console.error(errorInfo);
  // }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
