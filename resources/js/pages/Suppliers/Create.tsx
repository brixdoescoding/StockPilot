import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        contact_person: '',
        email: '',
        phone: '',
        address: '',
    });

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post('/suppliers');
    }

    return (
        <>
            <Head title="Add Supplier" />

            <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-8">
                <div>
                    <h1 className="text-2xl font-bold">Add Supplier</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Add a supplier and their contact information.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border p-6">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                            Supplier Name *
                        </label>
                        <input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            maxLength={255}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            placeholder="e.g. Prime Supply Co."
                        />
                        {errors.name && (
                            <p className="text-sm text-destructive">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="contact_person" className="text-sm font-medium">
                            Contact Person
                        </label>
                        <input
                            id="contact_person"
                            value={data.contact_person}
                            onChange={(e) => setData('contact_person', e.target.value)}
                            maxLength={255}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            placeholder="Contact person's name"
                        />
                        {errors.contact_person && (
                            <p className="text-sm text-destructive">{errors.contact_person}</p>
                        )}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                maxLength={255}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                placeholder="supplier@example.com"
                            />
                            {errors.email && (
                                <p className="text-sm text-destructive">{errors.email}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="phone" className="text-sm font-medium">
                                Phone
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                                maxLength={30}
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                placeholder="Contact number"
                            />
                            {errors.phone && (
                                <p className="text-sm text-destructive">{errors.phone}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="address" className="text-sm font-medium">
                            Address
                        </label>
                        <textarea
                            id="address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            rows={3}
                            className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                            placeholder="Supplier's address (optional)"
                        />
                        {errors.address && (
                            <p className="text-sm text-destructive">{errors.address}</p>
                        )}
                    </div>

                    <div className="flex justify-end gap-3">
                        <Link
                            href="/suppliers"
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Supplier'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
