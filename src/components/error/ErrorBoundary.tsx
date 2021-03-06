import React from "react";

import ErrorPage from "./page/ErrorPage";

type State = {
  hasError: boolean;
  msg: string;
  status: number;
};

class ErrorBoundary extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
      msg: "",
      status: null,
    };
  }

  static getDerivedStateFromError(err: Error) {
    return {
      hasError: true,
      msg: err.message,
      status: err.message,
    };
  }

  /*
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(error);
    console.error(errorInfo);
  }
  */

  render() {
    if (this.state.hasError) {
      return <ErrorPage msg={this.state.msg} status={this.state.status} />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
