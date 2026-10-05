<?php

namespace Tests\Feature;

use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class NotesTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_list_shows_the_newest_notes_first(): void
    {
        Note::factory()->create(['title' => 'Older', 'created_at' => now()->subHour()]);
        Note::factory()->create(['title' => 'Newer', 'body' => null]);

        $this->get('/notes')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Notes/Index')
                ->has('notes', 2)
                ->has('notes.0', fn (Assert $note) => $note
                    ->where('title', 'Newer')
                    ->where('body', null)
                    ->has('id')
                    ->has('createdAt'))
                ->where('notes.1.title', 'Older'));
    }

    public function test_a_note_can_be_created(): void
    {
        $this->post('/notes', ['title' => '  Buy milk  ', 'body' => 'Two litres'])
            ->assertRedirect('/notes')
            ->assertSessionHasNoErrors()
            ->assertInertiaFlash('success', 'Note added.');

        $this->assertDatabaseHas('notes', ['title' => 'Buy milk', 'body' => 'Two litres']);
    }

    public function test_an_empty_body_is_stored_as_null(): void
    {
        $this->post('/notes', ['title' => 'Title only', 'body' => ''])->assertRedirect('/notes');

        $this->assertDatabaseHas('notes', ['title' => 'Title only', 'body' => null]);
    }

    public function test_the_title_is_required(): void
    {
        $this->from('/notes')
            ->post('/notes', ['title' => '   '])
            ->assertRedirect('/notes')
            ->assertSessionHasErrors('title');

        $this->assertDatabaseCount('notes', 0);
    }

    public function test_long_values_are_rejected(): void
    {
        $this->from('/notes')
            ->post('/notes', ['title' => Str::repeat('a', 201), 'body' => Str::repeat('b', 2001)])
            ->assertSessionHasErrors(['title', 'body']);

        $this->assertDatabaseCount('notes', 0);
    }

    public function test_a_note_can_be_deleted(): void
    {
        $note = Note::factory()->create();

        $this->delete("/notes/{$note->id}")
            ->assertRedirect('/notes')
            ->assertInertiaFlash('success', 'Note deleted.');

        $this->assertModelMissing($note);
    }

    public function test_deleting_a_missing_note_returns_404(): void
    {
        $this->delete('/notes/999')->assertNotFound();
    }
}
