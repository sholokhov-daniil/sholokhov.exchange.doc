<script setup>
import {defineProps} from 'vue';
import Type from '@/utils/alert/type';

defineProps({
  type: {type: String, default: () => Type.info}
});
</script>

<template>
  <div class="alert mt-2" :class="type" role="alert">
    <p><b><slot name="header"></slot></b></p>
    <slot></slot>
  </div>
</template>