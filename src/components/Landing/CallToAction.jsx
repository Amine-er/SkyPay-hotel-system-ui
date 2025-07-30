import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CallToAction() {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
      <div className="container mx-auto px-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Download the SkyPay Hotel app and unlock exclusive deals, instant
              bookings, and personalized recommendations
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg font-semibold"
              >
                📱 Download App
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-blue-600 hover:bg-white px-8 py-3 text-lg font-semibold"
              >
                🏨 Explore Hotels
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-sm">
              <div className="flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <span>4.9/5 App Store Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">📱</span>
                <span>500K+ Downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                <span>Award-Winning Service</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
