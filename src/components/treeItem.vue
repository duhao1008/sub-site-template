<template>
  <li>
    <button v-if="node.children.length" class="tree-toggle" type="button" @click="open = !open">
      <span>{{ open ? '-' : '+' }}</span>{{ node.label }}
    </button>
    <span v-else class="tree-leaf">{{ node.label }}</span>
    <ul v-if="open && node.children.length">
      <TreeItem v-for="child in node.children" :key="child.key + child.label" :node="child" />
    </ul>
  </li>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TreeNode } from '../utils/jsonTools';

defineProps<{ node: TreeNode }>();

const open = ref(true);
</script>
