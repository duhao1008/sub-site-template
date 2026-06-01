<template>
  <section class="tool-shell" :aria-label="page.h1">
    <div class="tool-toolbar">
      <button type="button" class="primary" @click="run">{{ actionLabel }}</button>
      <button type="button" @click="loadSample">{{ labels.sample }}</button>
      <button type="button" @click="copyOutput" :disabled="!copyable">{{ copied ? labels.copied : labels.copy }}</button>
      <button type="button" @click="clearAll">{{ labels.clear }}</button>
    </div>

    <div class="tool-grid">
      <label class="editor-panel">
        <span>{{ labels.input }}</span>
        <textarea v-model="input" spellcheck="false" />
      </label>

      <div class="editor-panel">
        <span>{{ labels.output }}</span>
        <div v-if="result.ok && mode === 'viewer' && tree" class="tree-panel">
          <JsonTree :node="tree" />
        </div>
        <pre v-else-if="displayedOutput">{{ displayedOutput }}</pre>
        <div v-else class="empty-result">{{ emptyMessage }}</div>
      </div>
    </div>

    <div class="status-grid">
      <div :class="['status-card', result.ok ? 'success' : 'error']">
        <strong>{{ result.ok ? labels.valid : labels.invalid }}</strong>
        <span v-if="result.issue">{{ issueText }}</span>
        <span v-else>{{ labels.localBadge }}</span>
      </div>
      <div class="status-card">
        <strong>{{ labels.stats }}</strong>
        <span>{{ result.stats.inputChars }} -> {{ result.stats.outputChars }} {{ labels.chars }} / {{ result.stats.ratio }}% {{ labels.saved }}</span>
      </div>
      <div class="status-card">
        <strong>{{ labels.quality }}</strong>
        <span>{{ localizedHint }}</span>
      </div>
    </div>

    <p class="privacy-note">{{ labels.privacy }}</p>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import type { SeoBlock } from '../i18n/content';
import { buildTree, processJson, sampleJson, type JsonResult } from '../utils/jsonTools';
import JsonTree from './jsonTree.vue';

const props = defineProps<{
  mode: 'formatter' | 'validator' | 'viewer' | 'minifier';
  page: SeoBlock;
  labels: Record<string, string>;
}>();

const input = ref(sampleJson);
const result = ref<JsonResult>(processJson(input.value, props.mode));
const copied = ref(false);

const actionLabel = computed(() => {
  if (props.mode === 'formatter') return props.labels.format;
  if (props.mode === 'validator') return props.labels.validate;
  if (props.mode === 'viewer') return props.labels.view;
  return props.labels.minify;
});

const copyable = computed(() => Boolean(result.value.output || (props.mode === 'validator' && result.value.ok)));
const displayedOutput = computed(() => (props.mode === 'validator' && result.value.ok ? props.labels.validatorSuccessText : result.value.output));
const issueText = computed(() => {
  const issue = result.value.issue;
  if (!issue) return '';
  const location = issue.line ? ` ${props.labels.line} ${issue.line}, ${props.labels.column} ${issue.column}.` : '';
  return `${issue.message}.${location}`;
});
const tree = computed(() => (result.value.ok && props.mode === 'viewer' && result.value.value !== undefined ? buildTree(result.value.value) : undefined));
const emptyMessage = computed(() => (!input.value.trim() ? props.labels.emptyHint : result.value.issue?.message || props.page.intro));
const localizedHint = computed(() => {
  if (!input.value.trim()) return props.labels.emptyHint;
  if (!result.value.ok) return props.labels.syntaxFixHint;
  if (props.mode === 'validator') return props.labels.validSyntaxHint;
  if (props.mode === 'minifier') return result.value.output.length < 2000 ? props.labels.minifiedReadyHint : props.labels.minifiedLargeHint;
  if (Array.isArray(result.value.value)) return `${props.labels.arrayHint}: ${result.value.value.length}.`;
  if (result.value.value && typeof result.value.value === 'object') return `${props.labels.objectHint}: ${Object.keys(result.value.value as Record<string, unknown>).length}.`;
  return props.labels.primitiveHint;
});

function run() {
  result.value = processJson(input.value, props.mode);
  copied.value = false;
}

function loadSample() {
  input.value = sampleJson;
  run();
}

function clearAll() {
  input.value = '';
  run();
}

async function copyOutput() {
  const text = props.mode === 'validator' ? (result.value.ok ? props.labels.validatorSuccessText : issueText.value) : result.value.output;
  if (!text) return;
  await navigator.clipboard.writeText(text);
  copied.value = true;
}

watch(
  () => props.mode,
  () => run(),
);
</script>
