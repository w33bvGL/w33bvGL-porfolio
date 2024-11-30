<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $__env->yieldContent('title', 'Laravel App'); ?></title>
</head>
<body>
<!-- Header -->
<header>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>
</header>

<main>
    <?php echo $__env->yieldContent('content'); ?>
</main>

<footer>
    <p>&copy; <?php echo e(date('Y')); ?> My Laravel App</p>
</footer>

</body>
</html>
<?php /**PATH /var/www/resources/views/layouts/default.blade.php ENDPATH**/ ?>