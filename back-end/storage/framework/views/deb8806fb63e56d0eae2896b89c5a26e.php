<!-- resources/views/profile_card.blade.php -->
<html>
<body style="margin: 0; padding: 0; background-color: #f3f3f3;">
<div style="width: 1920px; height: 1080px; padding: 20px; background-color: white; border-radius: 10px;">
    <div style="display: flex; justify-content: space-between; align-items: center; height: 100%;">
        <!-- Левый блок -->
        <div style="width: 40%; padding: 20px; background-color: #ddd; border-radius: 10px;">
            <h2 style="margin-top: 0;"><?php echo e($name); ?></h2>
            <p><?php echo e($role); ?></p>
            <p><?php echo e($email); ?></p>
        </div>
        <!-- Правый блок -->
        <div style="width: 55%; text-align: center;">
            <h1>Профиль</h1>
            <img src="<?php echo e($imageUrl); ?>" alt="Profile Image" style="max-width: 300px; max-height: 300px; border-radius: 50%;">
        </div>
    </div>
</div>
</body>
</html>
<?php /**PATH /var/www/resources/views/profile_cards/profile_card.blade.php ENDPATH**/ ?>