import { TagChip } from './TagChip';

type Topic = { slug: string; labelTr: string; group?: string };

export function TopicsInline({ topics }: { topics: Topic[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {topics.map((t) => (
        <li key={t.slug}>
          <TagChip slug={t.slug} label={t.labelTr} group={t.group} />
        </li>
      ))}
    </ul>
  );
}
