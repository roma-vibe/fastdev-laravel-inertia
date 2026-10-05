<?php

namespace App\Models;

use Database\Factories\NoteFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;

/**
 * A short note with an optional body (the example feature).
 *
 * @property int $id
 * @property string $title
 * @property string|null $body
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
#[Fillable(['title', 'body'])]
class Note extends Model
{
    /** @use HasFactory<NoteFactory> */
    use HasFactory;
}
