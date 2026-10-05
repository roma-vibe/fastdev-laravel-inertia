<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';

const page = usePage();
</script>

<template>
    <Head title="Home" />
    <section class="card">
        <div class="card-body">
            <h1 class="card-title">{{ page.props.appName }}</h1>
            <p class="lead">
                Laravel serves the pages, Inertia renders them with Vue. Edit
                <code>resources/js/Pages/Home.vue</code> and this page updates instantly.
            </p>
            <Link href="/notes" class="btn btn-primary">Open notes</Link>
        </div>
    </section>
</template>
