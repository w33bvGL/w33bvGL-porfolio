<script setup lang="ts">
const props = defineProps({
  color: {
    type: String as () => 'primary' | 'secondary' | 'danger' | 'success' | 'divider',
    default: 'divider'
  },
  thickness: {
    type: String,
    default: '1px'
  },
  margin: {
    type: String,
    default: '1rem 0'
  },
  vertical: {
    type: Boolean,
    default: false
  },
  length: {
    type: String,
    default: '100%'
  },
  radius: {
    type: String,
    default: '0px'
  }
})
</script>

<template>
  <div
    class="ui-hr"
    :class="[`ui-hr--${props.color}`, { 'ui-hr--vertical': props.vertical }]"
    :style="{
      width: props.vertical ? props.thickness : props.length,
      height: props.vertical ? props.length : props.thickness,
      margin: props.margin,
      borderRadius: props.radius
    }"
    role="separator"
  />
</template>

<style scoped lang="scss">
@use "@/assets/scss/palette" as palette;

.ui-hr {
  flex-shrink: 0;
  background-color: palette.$color-divider;

  &--primary {
    background-color: palette.$color-primary;
  }

  &--secondary {
    background-color: palette.$color-secondary;
  }

  &--danger {
    background-color: palette.$color-danger;
  }

  &--success {
    background-color: palette.$color-success;
  }

  &--divider {
    background-color: palette.$color-divider;
  }

  &--vertical {
    display: inline-block;
  }
}
</style>
