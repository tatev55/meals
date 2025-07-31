export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-green-800 italic mb-4 text-center">About Delicious Meals</h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-4 text-center">
                Delicious Meals is a project that aims to help users discover delicious dishes from around the world. We use TheMealDB API to present you with hundreds of dishes by category.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed text-center">
                Our goal is to make finding recipes easy, interesting, and inspiring. If you love to cook or just discover new dishes, you have come to the right place.
            </p>
        </div>
    );
}