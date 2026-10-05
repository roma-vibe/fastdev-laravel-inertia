import { Head, Link, usePage } from '@inertiajs/react';

export default function Home() {
    const { appName } = usePage().props;

    return (
        <>
            <Head title="Home" />
            <section className="card">
                <div className="card-body">
                    <h1 className="card-title">{appName}</h1>
                    <p className="lead">
                        Laravel serves the pages, Inertia renders them with React. Edit{' '}
                        <code>resources/js/Pages/Home.tsx</code> and this page updates instantly.
                    </p>
                    <Link href="/notes" className="btn btn-primary">
                        Open notes
                    </Link>
                </div>
            </section>
        </>
    );
}
