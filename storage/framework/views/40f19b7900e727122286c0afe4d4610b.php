

<?php $__env->startSection('title', 'Home Page'); ?>

<?php $__env->startSection('content'); ?>
<h1>Welcome to the Home Page</h1>
<p>This is the main content of the homepage.</p>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts/default', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH /var/www/resources/views/index.blade.php ENDPATH**/ ?>