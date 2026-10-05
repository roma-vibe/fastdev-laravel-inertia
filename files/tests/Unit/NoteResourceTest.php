<?php

namespace Tests\Unit;

use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Tests\TestCase;

class NoteResourceTest extends TestCase
{
    public function test_a_note_is_sent_to_pages_in_camel_case(): void
    {
        $note = new Note(['title' => 'Title', 'body' => null]);
        $note->id = 7;
        $note->created_at = Carbon::parse('2026-01-02T03:04:05Z');

        $this->assertSame([
            'id' => 7,
            'title' => 'Title',
            'body' => null,
            'createdAt' => '2026-01-02T03:04:05+00:00',
        ], (new NoteResource($note))->toArray(new Request));
    }
}
