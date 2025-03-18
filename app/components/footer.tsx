export const Footer = () => {
    return (
        <footer className="text-center p-4 text-sm text-gray-500 bg-white border-t border-gray-200">
            <p>&copy; {new Date().getFullYear()} Man-Do</p>
            <div className="mt-1">
                <p className="hover:text-gray-700">Contact: marcelikarman1@gmail.com</p>
            </div>
        </footer>
    )
}