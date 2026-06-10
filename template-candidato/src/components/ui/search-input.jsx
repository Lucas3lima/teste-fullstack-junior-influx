import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export function SearchInput({
  placeholder,
  value,
  onChange,
  className,
  inputClassName,
}) {
  return (
    <div className={cn('relative', className)}>
      <SearchIcon className="size-4 text-navy-200 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn('w-72 pl-8', inputClassName)}
      />
    </div>
  );
}