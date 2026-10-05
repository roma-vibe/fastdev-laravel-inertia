<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * Validates a new note. Strings are trimmed and empty strings become null by Laravel's global
 * middleware before these rules run.
 */
class StoreNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, list<string>>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:200'],
            'body' => ['nullable', 'string', 'max:2000'],
        ];
    }

    public function title(): string
    {
        return $this->string('title')->toString();
    }

    public function body(): ?string
    {
        return $this->filled('body') ? $this->string('body')->toString() : null;
    }
}
