<script setup lang="ts">
import { formatDateTime } from '@/lib/format';
import type { Note } from '@/types';

defineProps<{
    note: Note;
}>();

const emit = defineEmits<{
    delete: [];
}>();
</script>

<template>
    <article class="card">
        <div class="card-body">
            <div class="note-header">
                <h3 class="card-title">{{ note.title }}</h3>
                <button type="button" class="btn btn-sm btn-outline-danger" @click="emit('delete')">
                    Delete
                </button>
            </div>
            <p v-if="note.body" class="card-text">{{ note.body }}</p>
            <time class="note-date" :datetime="note.createdAt">{{
                formatDateTime(note.createdAt)
            }}</time>
        </div>
    </article>
</template>
