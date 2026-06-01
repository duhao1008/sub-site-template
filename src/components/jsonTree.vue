<template>
  <ul class="json-tree">
    <TreeItem :node="node" />
  </ul>
</template>

<script setup lang="ts">
import type { TreeNode } from '../utils/jsonTools';
import TreeItem from './treeItem.vue';

defineProps<{ node: TreeNode }>();
</script>
