<?php

namespace App\Providers;

use Illuminate\Foundation\Console\ServeCommand;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // `php artisan serve` listens on APP_PORT from .env (an explicit --port still wins).
        $this->app->resolving(ServeCommand::class, function (ServeCommand $command): void {
            $command->getDefinition()->getOption('port')->setDefault(config('app.port'));
        });
    }
}
