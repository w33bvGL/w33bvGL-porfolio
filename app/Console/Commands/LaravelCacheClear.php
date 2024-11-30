<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class LaravelCacheClear extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'lcc';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear all Laravel cache: cache, view, route, config, and event caches';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Clearing Laravel cache...');

        $this->call('cache:clear');
        $this->info('Application cache cleared!');

        $this->call('view:clear');
        $this->info('View cache cleared!');

        $this->call('route:clear');
        $this->info('Route cache cleared!');

        $this->call('config:clear');
        $this->info('Config cache cleared!');

        $this->call('event:clear');
        $this->info('Event cache cleared!');

        $this->info('All Laravel caches cleared successfully!');
    }
}