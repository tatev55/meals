export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-green-800 italic mb-4 text-center">Contact Us</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6 text-center">
                Do you have any questions, suggestions or comments? You can write to us using the details below.
            </p>

            <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 space-y-4">
                <p><strong>Email:</strong> support@deliciousmeals.com</p>
                <p><strong>Phone:</strong> +374 55 123456</p>
                <p><strong>Address:</strong> Yerevan, Armenia</p>
            </div>
        </div>
    );
}
