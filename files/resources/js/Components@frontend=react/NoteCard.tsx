import { formatDateTime } from '@/lib/format';
import type { Note } from '@/types';

interface Props {
    note: Note;
    onDelete: () => void;
}

export default function NoteCard({ note, onDelete }: Props) {
    return (
        <article className="card">
            <div className="card-body">
                <div className="note-header">
                    <h3 className="card-title">{note.title}</h3>
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-danger"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
                {note.body && <p className="card-text">{note.body}</p>}
                <time className="note-date" dateTime={note.createdAt}>
                    {formatDateTime(note.createdAt)}
                </time>
            </div>
        </article>
    );
}
