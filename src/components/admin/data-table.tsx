'use client'

import { useState } from 'react'
import { Trash2, Pencil, Plus, Search, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'

export interface Column<T> {
  key: keyof T | string
  header: string
  render?: (row: T) => React.ReactNode
  className?: string
}

interface DataTableProps<T extends { id: string }> {
  title: string
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  onAdd?: () => void
  onEdit?: (row: T) => void
  onDelete?: (id: string) => Promise<void>
  searchKeys?: Array<keyof T>
  addLabel?: string
}

export function DataTable<T extends { id: string }>({
  title,
  data,
  columns,
  loading,
  onAdd,
  onEdit,
  onDelete,
  searchKeys = [],
  addLabel = 'Add New',
}: DataTableProps<T>) {
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null)
  const [deleting, setDeleting] = useState(false)

  const filtered = search
    ? data.filter(row =>
        searchKeys.some(k => {
          const val = row[k]
          return typeof val === 'string' && val.toLowerCase().includes(search.toLowerCase())
        })
      )
    : data

  const handleDelete = async () => {
    if (!deleteTarget || !onDelete) return
    setDeleting(true)
    try {
      await onDelete(deleteTarget.id)
    } finally {
      setDeleting(false)
      setDeleteTarget(null)
    }
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h2 className="text-xl font-bold font-serif text-navy-800">{title}</h2>
        <div className="flex gap-2 w-full sm:w-auto">
          {searchKeys.length > 0 && (
            <div className="relative flex-1 sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
                aria-label={`Search ${title}`}
              />
            </div>
          )}
          {onAdd && (
            <Button onClick={onAdd} variant="navy" size="sm">
              <Plus className="mr-1.5 h-4 w-4" aria-hidden="true" />
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="p-8 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-10 rounded bg-gray-100 animate-pulse" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-muted-foreground">
              <p className="text-sm">No records found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table" aria-label={title}>
                <thead>
                  <tr className="border-b bg-gray-50">
                    {columns.map(col => (
                      <th
                        key={String(col.key)}
                        className={`px-4 py-3 text-left font-semibold text-navy-700 ${col.className ?? ''}`}
                        scope="col"
                      >
                        {col.header}
                      </th>
                    ))}
                    {(onEdit || onDelete) && (
                      <th className="px-4 py-3 text-right font-semibold text-navy-700 w-28" scope="col">
                        Actions
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, idx) => (
                    <tr
                      key={row.id}
                      className={`border-b last:border-0 hover:bg-gray-50 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/50'}`}
                    >
                      {columns.map(col => (
                        <td key={String(col.key)} className={`px-4 py-3 ${col.className ?? ''}`}>
                          {col.render
                            ? col.render(row)
                            : String((row as Record<string, unknown>)[String(col.key)] ?? '')}
                        </td>
                      ))}
                      {(onEdit || onDelete) && (
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            {onEdit && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onEdit(row)}
                                aria-label={`Edit record`}
                                className="h-8 w-8 text-navy-600 hover:text-navy-800 hover:bg-navy-50"
                              >
                                <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                              </Button>
                            )}
                            {onDelete && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setDeleteTarget(row)}
                                aria-label={`Delete record`}
                                className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                              </Button>
                            )}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" aria-hidden="true" />
              Confirm Deletion
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure you want to delete this record?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)} disabled={deleting}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
              aria-busy={deleting}
            >
              {deleting ? 'Deleting…' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
