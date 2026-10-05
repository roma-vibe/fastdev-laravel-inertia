import { useForm } from '@inertiajs/react';
import type { SubmitEvent } from 'react';

export default function NoteForm() {
    const form = useForm({
        title: '',
        body: '',
    });

    function submit(event: SubmitEvent<HTMLFormElement>): void {
        event.preventDefault();
        form.post('/notes', {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
            },
        });
    }

    return (
        <form className="card" noValidate onSubmit={submit}>
            <div className="card-body">
                <h2 className="card-title">New note</h2>
                <div className="field">
                    <label htmlFor="note-title" className="form-label">
                        Title
                    </label>
                    <input
                        id="note-title"
                        type="text"
                        className={form.errors.title ? 'form-control is-invalid' : 'form-control'}
                        value={form.data.title}
                        onChange={(event) => {
                            form.setData('title', event.target.value);
                        }}
                        maxLength={200}
                        required
                    />
                    {form.errors.title && (
                        <div className="invalid-feedback">{form.errors.title}</div>
                    )}
                </div>
                <div className="field">
                    <label htmlFor="note-body" className="form-label">
                        Text (optional)
                    </label>
                    <textarea
                        id="note-body"
                        className={form.errors.body ? 'form-control is-invalid' : 'form-control'}
                        value={form.data.body}
                        onChange={(event) => {
                            form.setData('body', event.target.value);
                        }}
                        rows={4}
                        maxLength={2000}
                    />
                    {form.errors.body && <div className="invalid-feedback">{form.errors.body}</div>}
                </div>
                <button type="submit" className="btn btn-primary" disabled={form.processing}>
                    Add note
                </button>
            </div>
        </form>
    );
}
