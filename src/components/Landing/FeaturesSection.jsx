import { Card, CardContent } from '@/components/ui/card';

export default function FeaturesSection() {
  const features = [
    {
      icon: '🏊',
      title: 'Luxury Amenities',
      description:
        'World-class facilities including pools, spas, and fitness centers',
    },
    {
      icon: '🍽️',
      title: 'Fine Dining',
      description: 'Award-winning restaurants and room service available 24/7',
    },
    {
      icon: '🅿️',
      title: 'Free Parking',
      description: 'Complimentary valet parking and self-parking options',
    },
    {
      icon: '📶',
      title: 'High-Speed WiFi',
      description: 'Free unlimited internet access throughout the property',
    },
    {
      icon: '🛎️',
      title: 'Concierge Service',
      description:
        'Personal assistance for tours, reservations, and recommendations',
    },
    {
      icon: '🧳',
      title: 'Business Center',
      description:
        'Meeting rooms and business services for corporate travelers',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Premium Hotel Amenities
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience luxury and comfort with our comprehensive range of
            world-class amenities and services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
