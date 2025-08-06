export default function wordlist_root({children}: {children: React.ReactNode}) {
    return (
        <div className="w-auto min-h-[100vh] bg-gradient-to-br bg-[url('/word_bg.webp')] bg-cover from-amber-300 via-orange-300 to-amber-600 py-10 lg:px-48 sm:px-0 relative overflow-hidden">
            {/* Blurred background overlay */}
            <div className="absolute inset-0 backdrop-blur-sm pointer-events-none z-0"></div>
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
}