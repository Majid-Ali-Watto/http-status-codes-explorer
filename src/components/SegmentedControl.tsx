interface Option<T> {
    value: T;
    label: string;
    title?: string;
}

interface SegmentedControlProps<T extends string | number> {
    label: string;
    options: readonly Option<T>[];
    value: T;
    onChange: (value: T) => void;
}

export default function SegmentedControl<T extends string | number>({ label, options, value, onChange }: SegmentedControlProps<T>) {
    return (
        <div className="inline-flex" role="group" aria-label={label}>
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    title={option.title}
                    aria-pressed={value === option.value}
                    onClick={() => onChange(option.value)}
                    className={`px-3 py-1 text-sm border border-gray-300 -ml-px first:ml-0 first:rounded-l last:rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 ${
                        value === option.value ? 'bg-gray-900 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
}
