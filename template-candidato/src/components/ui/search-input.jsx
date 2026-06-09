import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

export function SearchInput({ placeholder }) {
  return (
    <div className="relative">
      <SearchIcon className="size-4 text-navy-200 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      <Input type="text" placeholder={placeholder} className="w-72 pl-8" />
    </div>
  );
}