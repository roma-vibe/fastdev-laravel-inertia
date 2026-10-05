<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';

const form = useForm({
    title: '',
    body: '',
});

function submit(): void {
    form.post('/notes', {
        preserveScroll: true,
        onSuccess: () => form.reset(),
    });
}
</script>

<template>
    <form class="card" novalidate @submit.prevent="submit">
        <div class="card-body">
            <h2 class="card-title">New note</h2>
            <div class="field">
                <label for="note-title" class="form-label">Title</label>
                <input
                    id="note-title"
                    v-model="form.title"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': form.errors.title }"
                    maxlength="200"
                    required
                />
                <div v-if="form.errors.title" class="invalid-feedback">{{ form.errors.title }}</div>
            </div>
            <div class="field">
                <label for="note-body" class="form-label">Text (optional)</label>
                <textarea
                    id="note-body"
                    v-model="form.body"
                    class="form-control"
                    :class="{ 'is-invalid': form.errors.body }"
                    rows="4"
                    maxlength="2000"
                ></textarea>
                <div v-if="form.errors.body" class="invalid-feedback">{{ form.errors.body }}</div>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="form.processing">
                Add note
            </button>
        </div>
    </form>
</template>
