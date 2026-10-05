import { Link, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
    const page = usePage();
    const path = new URL(page.url, window.location.origin).pathname;

    return (
        <div className="app">
            <header className="app-header navbar navbar-expand">
                <nav className="container">
                    <Link href="/" className="navbar-brand">
                        {page.props.appName}
                    </Link>
                    <div className="navbar-nav">
                        <Link href="/" className={path === '/' ? 'nav-link active' : 'nav-link'}>
                            Home
                        </Link>
                        <Link
                            href="/notes"
                            className={path.startsWith('/notes') ? 'nav-link active' : 'nav-link'}
                        >
                            Notes
                        </Link>
                    </div>
                </nav>
            </header>
            <main className="app-main container">
                {page.flash.success && (
                    <div className="alert alert-success" role="status">
                        {page.flash.success}
                    </div>
                )}
                {children}
            </main>
        </div>
    );
}
