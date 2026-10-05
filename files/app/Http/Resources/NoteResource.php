<?php

namespace App\Http\Resources;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * The shape of a note in page props; keep it in sync with the Note type in resources/js/types.
 *
 * @mixin Note
 */
class NoteResource extends JsonResource
{
    /**
     * @return array{id: int, title: string, body: string|null, createdAt: string}
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'createdAt' => $this->created_at->toIso8601String(),
        ];
    }
}
