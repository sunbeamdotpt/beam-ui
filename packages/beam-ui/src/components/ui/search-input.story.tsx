import { SearchInput } from "./search-input.tsx";

export default function SearchInputStory() {
  return <SearchInput />;
}

export function WithCustomClass() {
  return <SearchInput className="custom-search" />;
}
