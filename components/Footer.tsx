'use client'

export function Footer() {
    return (
        <footer className="w-full bg-green-900 text-white py-6 mt-10">
            <div className="container mx-auto px-4 flex flex-col md:flex-row justify-around items-center">
                <p className="text-sm">&copy; {new Date().getFullYear()} Delicious Meals. All rights reserved.</p>
                <div className="flex space-x-4 mt-4 md:mt-0">
                    <a href="/about" className="hover:underline">About</a>
                    <a href="/contact" className="hover:underline">Contact</a>
                    <a href="/privacy" className="hover:underline">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}