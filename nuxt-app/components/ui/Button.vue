<script setup lang="ts">
const props = defineProps({
  variant: { type: String as () => 'primary' | 'secondary' | 'danger' | 'success', default: 'primary' },
  size: { type: String as () => 'sm' | 'md' | 'lg', default: 'md' },
  disabled: { type: Boolean, default: false },
})

const variantClass = `ui-button--${props.variant}`
const sizeClass = `ui-button--${props.size}`
</script>

<template>
  <button
      :class="['ui-button', variantClass, sizeClass]"
      :disabled="disabled"
      :aria-disabled="disabled"
      @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
@use "@/assets/scss/palette" as palette;
@use "sass:color";

$primary: palette.$color-primary;
$secondary: palette.$color-secondary;
$danger: palette.$color-danger;
$success: palette.$color-success;

$primary-hover: color.adjust($primary, $lightness: -10%);
$secondary-hover: color.adjust($secondary, $lightness: -10%);
$danger-hover: color.adjust($danger, $lightness: -10%);
$success-hover: color.adjust($success, $lightness: -10%);

.ui-button {
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.2s ease;
  padding: 0.75rem 2.5rem;
  font-size: 1.125rem;
  color: white;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: $primary;
  box-shadow: none;

  &:focus-visible {
    outline: 2px solid $primary;
    outline-offset: 2px;
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: #ccc;
    color: #666;
    box-shadow: none;
  }
}

/* Variants */
.ui-button--primary {
  background-color: $primary;
  color: white;

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    background-color: $primary-hover;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    outline: none;
  }
}

.ui-button--secondary {
  background-color: $secondary;
  color: black;

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    background-color: $secondary-hover;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    outline: none;
  }
}

.ui-button--danger {
  background-color: $danger;
  color: white;

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    background-color: $danger-hover;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    outline: none;
  }
}

.ui-button--success {
  background-color: $success;
  color: white;

  &:not(:disabled):hover,
  &:not(:disabled):focus {
    background-color: $success-hover;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    outline: none;
  }
}

/* Sizes */
.ui-button--sm {
  padding: 0.5rem 1.5rem;
  font-size: 1rem;
  border-radius: 24px;
}

.ui-button--md {
  padding: 0.75rem 2.5rem;
  font-size: 1.125rem;
  border-radius: 30px;
}

.ui-button--lg {
  padding: 1rem 3rem;
  font-size: 1.25rem;
  border-radius: 36px;
}
</style>
