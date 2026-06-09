function PaginationControls({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPrevious,
  onNext,
}) {
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = totalItems === 0 ? 0 : Math.min(page * pageSize, totalItems);

  return (
    <footer className="flex flex-col gap-3 border-t border-border/60 px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground sm:text-sm">
        Mostrando {start}-{end} de {totalItems}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onPrevious}
          disabled={page <= 1}
          className="rounded-md border border-border/70 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          Anterior
        </button>

        <span className="text-xs text-muted-foreground sm:text-sm">
          Pagina {totalPages === 0 ? 0 : page} de {totalPages}
        </span>

        <button
          type="button"
          onClick={onNext}
          disabled={page >= totalPages || totalPages === 0}
          className="rounded-md border border-border/70 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
        >
          Proxima
        </button>
      </div>
    </footer>
  );
}

export default PaginationControls;

