<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

const page = usePage();
const appName = computed(() => page.props.appName);
const path = computed(() => new URL(page.url, window.location.origin).pathname);
</script>

<template>
    <div class="app">
        <header class="app-header navbar navbar-expand">
            <nav class="container">
                <Link href="/" class="navbar-brand">{{ appName }}</Link>
                <div class="navbar-nav">
                    <Link href="/" class="nav-link" :class="{ active: path === '/' }">Home</Link>
                    <Link
                        href="/notes"
                        class="nav-link"
                        :class="{ active: path.startsWith('/notes') }"
                    >
                        Notes
                    </Link>
                </div>
            </nav>
        </header>
        <main class="app-main container">
            <div v-if="page.flash.success" class="alert alert-success" role="status">
                {{ page.flash.success }}
            </div>
            <slot />
        </main>
    </div>
</template>
