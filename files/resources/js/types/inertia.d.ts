import '@inertiajs/core';

// Types of the data every page receives; keep them in sync with the server:
// shared props in App\Http\Middleware\HandleInertiaRequests::share(), flash data from Inertia::flash().
declare module '@inertiajs/core' {
    export interface InertiaConfig {
        sharedPageProps: {
            appName: string;
        };
        flashDataType: {
            success?: string;
        };
    }
}
