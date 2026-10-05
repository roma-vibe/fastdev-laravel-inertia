import { Head, router } from '@inertiajs/react';
import NoteCard from '@/Components/NoteCard';
import NoteForm from '@/Components/NoteForm';
import type { Note } from '@/types';

export default function Index({ notes }: { notes: Note[] }) {
    function remove(note: Note): void {
        if (window.confirm(`Delete “${note.title}”?`)) {
            router.delete(`/notes/${note.id}`, { preserveScroll: true });
        }
    }

    return (
        <>
            <Head title="Notes" />
            <div className="page-header">
                <h1>Notes</h1>
                <p>Write short notes; the newest are shown first.</p>
            </div>
            <div className="notes-layout">
                <NoteForm />
                <section aria-label="Notes">
                    {notes.length === 0 ? (
                        <p className="empty-state">No notes yet. Add the first one.</p>
                    ) : (
                        <ul className="note-list">
                            {notes.map((note) => (
                                <li key={note.id}>
                                    <NoteCard
                                        note={note}
                                        onDelete={() => {
                                            remove(note);
                                        }}
                                    />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </>
    );
}
