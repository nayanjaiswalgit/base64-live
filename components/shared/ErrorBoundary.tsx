'use client';

import { Component, ReactNode } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        // Log error to console in development
        if (process.env.NODE_ENV === 'development') {
            console.error('Error boundary caught an error:', error, errorInfo);
        }
        // In production, you could send this to an error reporting service
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-[hsl(var(--color-background))]">
                    <Card className="max-w-md w-full p-6 glass-card">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-[hsl(var(--color-destructive)/0.1)] flex items-center justify-center">
                                <AlertCircle className="w-8 h-8 text-[hsl(var(--color-destructive))]" aria-hidden="true" />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold mb-2">Something went wrong</h1>
                                <p className="text-sm text-[hsl(var(--color-muted-foreground))] mb-4">
                                    We encountered an unexpected error. Don&apos;t worry, your data is safe and stored locally.
                                </p>

                                {process.env.NODE_ENV === 'development' && this.state.error && (
                                    <details className="text-left mb-4">
                                        <summary className="cursor-pointer text-xs text-[hsl(var(--color-muted-foreground))] hover:text-[hsl(var(--color-foreground))] transition-colors">
                                            Error details
                                        </summary>
                                        <pre className="mt-2 p-3 bg-[hsl(var(--color-muted))] rounded-lg text-xs overflow-auto max-h-40">
                                            {this.state.error.toString()}
                                        </pre>
                                    </details>
                                )}
                            </div>

                            <div className="flex gap-3 w-full">
                                <Button
                                    onClick={this.handleReset}
                                    className="flex-1 gap-2"
                                    aria-label="Try again"
                                >
                                    <RefreshCw className="w-4 h-4" aria-hidden="true" />
                                    Try Again
                                </Button>
                                <Button
                                    onClick={() => window.location.href = '/'}
                                    variant="outline"
                                    className="flex-1"
                                    aria-label="Go to home page"
                                >
                                    Go Home
                                </Button>
                            </div>

                            <p className="text-xs text-[hsl(var(--color-muted-foreground))]">
                                If this problem persists, try clearing your browser cache.
                            </p>
                        </div>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}
