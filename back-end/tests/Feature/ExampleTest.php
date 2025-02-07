<?php

declare(strict_types=1);

it('returns a successful response', function () {
    $response = get('/');

    $response->assertStatus(200);
});
