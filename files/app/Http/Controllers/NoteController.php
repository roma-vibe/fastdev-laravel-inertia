<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoteRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use App\Services\NoteService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class NoteController extends Controller
{
    public function __construct(private readonly NoteService $notes) {}

    public function index(): Response
    {
        return Inertia::render('Notes/Index', [
            'notes' => NoteResource::collection($this->notes->latest())->resolve(),
        ]);
    }

    public function store(StoreNoteRequest $request): RedirectResponse
    {
        $this->notes->create($request->title(), $request->body());

        Inertia::flash('success', 'Note added.');

        return to_route('notes.index');
    }

    public function destroy(Note $note): RedirectResponse
    {
        $this->notes->delete($note);

        Inertia::flash('success', 'Note deleted.');

        return to_route('notes.index');
    }
}
