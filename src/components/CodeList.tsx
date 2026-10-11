import { StatusCodeDetails } from '@/types';
import { CATEGORIES, categoryOf } from '@/assets/categories';
import { usePersistedState } from '@/utils/usePersistedState';
import SegmentedControl from './SegmentedControl';
import CodeExamples from './CodeExamples';

const VIEWS = ['list', 'cards'] as const;
const LAYOUTS = ['flat', 'sections'] as const;

type Category = 'all' | number;
type Heading = 'h2' | 'h3';

const CATEGORY_OPTIONS = [
    { value: 'all' as Category, label: 'All', title: 'All status codes' },
    ...CATEGORIES.map(({ id, name }) => ({ value: id as Category, label: `${id}xx`, title: `${id}xx ${name}` })),
];

// Accent per status class (1xx-5xx); full class names so Tailwind can detect them.
const CLASS_ACCENT: Record<number, string> = {
    1: 'border-t-sky-500 text-sky-700',
    2: 'border-t-green-500 text-green-700',
    3: 'border-t-amber-500 text-amber-700',
    4: 'border-t-orange-500 text-orange-700',
    5: 'border-t-red-500 text-red-700',
};

interface CodeListProps {
    filteredCode: StatusCodeDetails[];
    category: Category;
    onCategoryChange: (category: Category) => void;
}

export type { Category };

export default function CodeList({ filteredCode, category, onCategoryChange }: CodeListProps) {
    const [view, setView] = usePersistedState('status-codes-view', 'list', VIEWS);
    const [layout, setLayout] = usePersistedState('status-codes-layout', 'flat', LAYOUTS);

    const renderCodes = (codes: StatusCodeDetails[], Heading: Heading) =>
        view === 'cards' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {codes.map((code) => <StatusCard key={code.code} code={code} Heading={Heading} />)}
            </div>
        ) : (
            <div className="grid grid-cols-1 gap-6">
                {codes.map((code) => <StatusCode key={code.code} code={code} Heading={Heading} />)}
            </div>
        );

    return (
        <div className="container mx-auto px-4 py-20 xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <SegmentedControl label="Filter by category" options={CATEGORY_OPTIONS} value={category} onChange={onCategoryChange} />
                <div className="flex flex-wrap items-center gap-3">
                    <SegmentedControl
                        label="Choose layout"
                        options={[{ value: 'flat', label: 'Flat' }, { value: 'sections', label: 'Sections', title: 'Group by category' }]}
                        value={layout}
                        onChange={setLayout}
                    />
                    <SegmentedControl
                        label="Choose view"
                        options={[{ value: 'list', label: 'List' }, { value: 'cards', label: 'Cards' }]}
                        value={view}
                        onChange={setView}
                    />
                </div>
            </div>
            {filteredCode.length === 0 ? (
                <p className="text-gray-700" role="status">No status code details found</p>
            ) : layout === 'sections' ? (
                <div className="flex flex-col gap-10">
                    {CATEGORIES.map(({ id, name }) => {
                        const codes = filteredCode.filter((code) => categoryOf(code.code) === id);
                        if (codes.length === 0) return null;
                        return (
                            <section key={id} aria-labelledby={`category-${id}`}>
                                <h2 id={`category-${id}`} className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                                    {id}xx {name} <span className="text-sm font-normal text-gray-500">({codes.length})</span>
                                </h2>
                                {renderCodes(codes, 'h3')}
                            </section>
                        );
                    })}
                </div>
            ) : (
                renderCodes(filteredCode, 'h2')
            )}
        </div>
    );
}

interface StatusCodeProps {
    code: StatusCodeDetails;
    Heading: Heading;
}

function StatusCard({ code, Heading }: StatusCodeProps) {
    const accent = CLASS_ACCENT[categoryOf(code.code)] ?? '';
    return (
        <article className={`bg-white border border-gray-200 border-t-4 rounded shadow-sm hover:shadow-md transition-shadow p-4 ${accent}`}>
            <Heading className="font-bold">
                <span className="text-2xl">{code.code}</span>{' '}
                <span className="text-gray-700">{code.title}</span>
            </Heading>
            <p className="text-gray-600 mt-2">{code.description}</p>
            <p className="text-gray-500 mt-2">
                <span className="font-semibold">Example:</span> {code.example}
            </p>
            <details className="mt-3">
                <summary className="cursor-pointer text-sm font-semibold text-gray-700">Payload, headers &amp; response</summary>
                <CodeExamples code={code} />
            </details>
        </article>
    );
}

function StatusCode({ code, Heading }: StatusCodeProps) {
    return (
        <details
            className="code-container group bg-white transition-all overflow-hidden"
        >
            <summary className="cursor-pointer flex items-center justify-between p-4 bg-gray-100 hover:bg-gray-200 transition-colors">
                <Heading className="lg:text-xl md:text-base sm:text-sm font-bold text-gray-700">
                    {code.code} {code.title}
                </Heading>
                <span className="text-gray-500 transition-transform group-open:rotate-90">
                    ▶
                </span>
            </summary>
            <div className="p-4 border toggle">
                <p className="text-gray-600 mt-2">{code.description}</p>
                <p className="text-gray-500 mt-2">
                    <span className="font-semibold">Example:</span> {code.example}
                </p>
                <CodeExamples code={code} />
            </div>
        </details>
    );
}
