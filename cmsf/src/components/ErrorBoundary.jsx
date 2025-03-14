import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error in Chatbot:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h2 className="text-center text-red-500">Something went wrong. Please reload the page.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
