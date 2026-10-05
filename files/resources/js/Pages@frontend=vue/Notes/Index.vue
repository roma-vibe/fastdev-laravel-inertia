<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import NoteCard from '@/Components/NoteCard.vue';
import NoteForm from '@/Components/NoteForm.vue';
import type { Note } from '@/types';

defineProps<{
    notes: Note[];
}>();

function remove(note: Note): void {
    if (window.confirm(`Delete “${note.title}”?`)) {
        router.delete(`/notes/${note.id}`, { preserveScroll: true });
    }
}
</script>

<template>
    <Head title="Notes" />
    <div class="page-header">
        <h1>Notes</h1>
        <p>Write short notes; the newest are shown first.</p>
    </div>
    <div class="notes-layout">
        <NoteForm />
        <section aria-label="Notes">
            <p v-if="notes.length === 0" class="empty-state">No notes yet. Add the first one.</p>
            <ul v-else class="note-list">
                <li v-for="note in notes" :key="note.id">
                    <NoteCard :note="note" @delete="remove(note)" />
                </li>
            </ul>
        </section>
    </div>
</template>
