"use client"
import React from 'react'
import { PaginationContent, PaginationPrevious, PaginationLink, PaginationNext , Pagination,PaginationItem } from '../pagination' // Removed PaginationEllipsis as it's not needed

type Props = {
  currentPage: number;
  hasNextPage: boolean; // Add hasNextPage prop to know if a next page exists
  // Optional: Add a function prop to handle page changes if not using href
  // onPageChange: (page: number) => void;
}

// Update component signature
export default function Footer({currentPage, hasNextPage}: Props) {

  // Determine if the previous button should be disabled
  const isFirstPage = currentPage <= 1;
  // Determine if the next button should be disabled
  const isLastPage = !hasNextPage;

  return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {/* Previous Button: Disabled if on the first page */}
              <PaginationPrevious
                href={!isFirstPage ? `?page=${currentPage - 1}` : '#'}
                aria-disabled={isFirstPage}
                tabIndex={isFirstPage ? -1 : undefined}
                className={isFirstPage ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
            <PaginationItem>
              {/* Display current page number - not necessarily a link */}
              <PaginationLink href="#" isActive> {/* Kept as PaginationLink for styling, but href="#" indicates no direct navigation */}
                {currentPage}
              </PaginationLink>
            </PaginationItem>
            {/* Removed PaginationEllipsis */}
            <PaginationItem>
              {/* Next Button: Disabled if hasNextPage is false */}
              <PaginationNext
                href={!isLastPage ? `?page=${currentPage + 1}` : '#'}
                aria-disabled={isLastPage}
                tabIndex={isLastPage ? -1 : undefined}
                className={isLastPage ? "pointer-events-none opacity-50" : undefined}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
  )
}