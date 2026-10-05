<?php

namespace App\Services;

use App\Models\Note;
use Illuminate\Database\Eloquent\Collection;

/**
 * Business rules of the Notes feature. Controllers call this service; it is the only place that
 * queries or changes notes.
 */
class NoteService
{
    /** How many notes the list shows. */
    public const int LIST_LIMIT = 100;

    /**
     * The newest notes first.
     *
     * @return Collection<int, Note>
     */
    public function latest(): Collection
    {
        return Note::query()
            ->latest()
            ->latest('id')
            ->limit(self::LIST_LIMIT)
            ->get();
    }

    public function create(string $title, ?string $body): Note
    {
        return Note::query()->create([
            'title' => $title,
            'body' => $body,
        ]);
    }

    public function delete(Note $note): void
    {
        $note->delete();
    }
}
