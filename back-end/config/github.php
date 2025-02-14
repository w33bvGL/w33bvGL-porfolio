<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Base URL for GitHub Profile
    |--------------------------------------------------------------------------
    |
    | This is the base URL used for GitHub user profile. You can customize this
    | value if needed, but by default it will use GitHub's main website URL.
    | The value is fetched from the 'GITHUB_BASE_URL' environment variable.
    |
    | Example:
    | 'GITHUB_BASE_URL=https://github.com'
    |
    */
    'base_url' => env('GITHUB_BASE_URL', 'https://github.com'),

    /*
    |--------------------------------------------------------------------------
    | GitHub Username
    |--------------------------------------------------------------------------
    |
    | Here you specify the GitHub username for which the application will
    | fetch data. The default value is 'w33bvGL', but you can set a different
    | GitHub username through the 'GITHUB_USERNAME' environment variable.
    |
    | Example:
    | 'GITHUB_USERNAME=your_github_username'
    |
    */
    'github_username' => env('GITHUB_USERNAME', 'w33bvGL'),

];
