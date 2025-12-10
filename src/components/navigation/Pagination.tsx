'use client';

import React, { useCallback, useMemo } from 'react';
import { Button } from '../ui/Button';

export interface PaginationProps {
  /** The currently active page number. */
  currentPage: number;
  /** The total number of pages available. */
  totalPages: number;
  /** Callback function invoked when the page is changed. */
  onPageChange: (page: number) => void;
  /** The maximum number of page buttons to display. */
  maxPageButtons?: number;
  /** Optional additional CSS classes for the container. */
  className?: string;
}

/**
 * @wizard
 * @name Pagination
 * @description A navigation control for moving between pages of content.
 * @tags navigation, ui, data-display
 * @props
 * - name: currentPage
 * type: number
 * description: The currently active page number (1-based index).
 * - name: totalPages
 * type: number
 * description: The total number of pages available.
 * - name: onPageChange
 * type: (page: number) => void
 * description: Callback function invoked when the user selects a new page.
 * - name: maxPageButtons
 * type: number
 * description: The maximum number of visible page number buttons.
 * default: 5
 * - name: className
 * type: string
 * description: Optional additional CSS classes for the container.
 * @category navigation
 */
export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 5,
  className,
}) => {
  const getPageNumbers = useMemo(() => {
    const pages: (number | '...')[] = [];
    if (totalPages <= maxPageButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    const half = Math.floor(maxPageButtons / 2);
    let startPage = Math.max(1, currentPage - half);
    let endPage = Math.min(totalPages, currentPage + half);

    if (currentPage - half <= 1) {
      endPage = maxPageButtons;
    }
    if (currentPage + half >= totalPages) {
      startPage = totalPages - maxPageButtons + 1;
    }

    if (startPage > 1) {
      pages.push(1);
      if (startPage > 2) {
        pages.push('...');
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  }, [currentPage, totalPages, maxPageButtons]);

  const handlePageClick = useCallback((page: number) => {
    onPageChange(page);
  }, [onPageChange]);

  const handlePrevClick = useCallback(() => {
    onPageChange(currentPage - 1);
  }, [currentPage, onPageChange]);

  const handleNextClick = useCallback(() => {
    onPageChange(currentPage + 1);
  }, [currentPage, onPageChange]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav className={`flex items-center justify-center gap-2 ${className || ''}`} aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        onClick={handlePrevClick}
        disabled={currentPage === 1}
        // FIX: Changed from `iconBefore` to `iconLeft` and passed the icon name string
        iconLeft="chevron-left"
      >
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {getPageNumbers.map((page, index) =>
          typeof page === 'number' ? (
            <Button
              key={page}
              variant={currentPage === page ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handlePageClick(page)}
              className="w-10"
            >
              {page}
            </Button>
          ) : (
            <span key={`ellipsis-${index}`} className="px-2 py-1 text-sm text-muted-foreground">
              ...
            </span>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
        // FIX: Changed from `iconAfter` to `iconRight` and passed the icon name string
        iconRight="chevron-right"
      >
        Next
      </Button>
    </nav>
  );
};