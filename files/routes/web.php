<?php

use App\Http\Controllers\NoteController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Home');

Route::controller(NoteController::class)->group(function (): void {
    Route::get('/notes', 'index')->name('notes.index');
    Route::post('/notes', 'store')->name('notes.store');
    Route::delete('/notes/{note}', 'destroy')->name('notes.destroy');
});
