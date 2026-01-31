export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-bold tracking-tight">DevNotes</p>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>
          
          <nav className="flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="transition-colors hover:text-primary">Privacy</a>
            <a href="#" className="transition-colors hover:text-primary">Terms</a>
            <a href="#" className="transition-colors hover:text-primary">RSS</a>
            <a href="#" className="transition-colors hover:text-primary">GitHub</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}