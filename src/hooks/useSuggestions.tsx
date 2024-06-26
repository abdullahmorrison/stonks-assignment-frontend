import { useCallback, useMemo } from 'react'
import Fuse, { FuseResult } from 'fuse.js'

export default function useSuggestions(dataSet: string[]) {
  const fuzzySearch = useMemo(() => {
    return new Fuse(dataSet, {includeScore: true});
  }, [dataSet])

  const suggest = useCallback((text: string) => {
    const SEARCH_ACCURACY_THRESHOLD = 0.4
    if (text.length==1) {//nothing to search so return lastest 5 items
      const latestItems = Array.from(new Set(dataSet.slice(-5)))// removing duplicates
      return latestItems
    } else {
      // Fuzzy search for the rest
      const searchResults = fuzzySearch.search(text.slice(1))
        .filter((result: FuseResult<string>)=>result.score && result.score<SEARCH_ACCURACY_THRESHOLD)//high accuary results

      return Array.from(new Set(searchResults.map(result => result.item)))//removing duplicates
    }
  }, [fuzzySearch, dataSet])

  return [ suggest ]
}
