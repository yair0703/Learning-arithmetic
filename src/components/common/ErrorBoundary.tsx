import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  public handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="p-6 bg-rose-50/90 border border-rose-200 rounded-3xl text-center flex flex-col items-center gap-3 my-4">
          <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black text-rose-950">
            {this.props.fallbackTitle || 'אירעה שגיאה בטעינת הרכיב'}
          </h3>
          <p className="text-xs text-rose-700 max-w-md">
            משהו לא צפוי התרחש. לחצו על הכפתור למטה כדי לרענן את הרכיב.
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-2 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>טען מחדש 🔄</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
