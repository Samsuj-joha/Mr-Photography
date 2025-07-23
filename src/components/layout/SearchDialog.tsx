'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface SearchDialogProps {
  className?: string
  iconSize?: 'small' | 'medium' | 'large'
}

export default function SearchDialog({ 
  className = "", 
  iconSize = 'medium' 
}: SearchDialogProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Icon size configurations
  const iconSizes = {
    small: "h-3 w-3",
    medium: "h-4 w-4 xl:h-5 xl:w-5",
    large: "h-5 w-5"
  }

  const buttonSizes = {
    small: "w-6 h-6",
    medium: "w-8 h-8 xl:w-10 xl:h-10",
    large: "w-10 h-10"
  }

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log('Searching for:', searchQuery)
      
      // Close dialog and reset
      setIsSearchOpen(false)
      setSearchQuery('')
      
      // Here you would typically:
      // - Navigate to search results page
      // - Call search API
      // - Update search context/state
    }
  }

  return (
    <Dialog open={isSearchOpen} onOpenChange={setIsSearchOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className={`hover:text-brand-accent transition-colors ${buttonSizes[iconSize]} ${className}`}
          aria-label="Search"
        >
          <Search className={iconSizes[iconSize]} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSearch} className="flex space-x-2">
          <Input
            placeholder="Search photos, blogs, galleries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-sm"
            autoFocus
          />
          <Button 
            type="submit" 
            size="icon" 
            aria-label="Submit search" 
            className="shrink-0 bg-brand-accent hover:bg-brand-accent/90 text-brand-dark"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        {/* Optional: Recent searches or suggestions */}
        <div className="mt-4">
          <div className="text-xs text-muted-foreground mb-2">Popular searches:</div>
          <div className="flex flex-wrap gap-2">
            {['Wedding Photography', 'Portraits', 'Events', 'Commercial'].map((term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="px-2 py-1 text-xs bg-muted hover:bg-brand-accent/10 hover:text-brand-accent rounded-md transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}