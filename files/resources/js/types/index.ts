/** A note as sent by App\Http\Resources\NoteResource. */
export interface Note {
    id: number;
    title: string;
    body: string | null;
    /** ISO 8601 timestamp. */
    createdAt: string;
}
