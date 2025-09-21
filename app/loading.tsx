export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-accent rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-text-primary">Loading TuneSphere</h2>
          <p className="text-text-secondary">Preparing your music experience...</p>
        </div>
      </div>
    </div>
  );
}
