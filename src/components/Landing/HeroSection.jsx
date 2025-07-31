import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useMemo } from 'react';

export default function HeroSection() {
  const backgroundLayer1Ref = useRef(null);
  const backgroundLayer2Ref = useRef(null);
  const overlayRef = useRef(null);

  const backgrounds = useMemo(
    () => [
      '/images/landing-splash-1.webp',
      '/images/landing-splash-2.webp',
      '/images/landing-splash-3.webp',
      '/images/landing-splash-4.webp',
      '/images/landing-splash-5.webp',
    ],
    []
  );

  useEffect(() => {
    let currentIndex = 0;
    let timeline;
    let isLayer1Active = true;

    const preloadImages = () => {
      backgrounds.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };

    const changeBackground = () => {
      const nextIndex = (currentIndex + 1) % backgrounds.length;
      const currentLayer = isLayer1Active
        ? backgroundLayer1Ref.current
        : backgroundLayer2Ref.current;
      const nextLayer = isLayer1Active
        ? backgroundLayer2Ref.current
        : backgroundLayer1Ref.current;

      nextLayer.style.backgroundImage = `url(${backgrounds[nextIndex]})`;

      gsap.set(nextLayer, {
        opacity: 0,
        scale: 1.05,
        filter: 'blur(8px)',
      });

      timeline = gsap.timeline({
        onComplete: () => {
          currentIndex = nextIndex;
          isLayer1Active = !isLayer1Active;
          gsap.set(currentLayer, { opacity: 0, filter: 'blur(0px)', scale: 1 });
        },
      });

      timeline
        .to(
          nextLayer,
          {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
            duration: 2,
            ease: 'power4.inOut',
          },
          0
        )
        .to(
          currentLayer,
          {
            opacity: 0,
            scale: 0.95,
            filter: 'blur(6px)',
            duration: 2,
            ease: 'power4.inOut',
          },
          0
        );
    };

    backgroundLayer1Ref.current.style.backgroundImage = `url(${backgrounds[0]})`;
    gsap.set(backgroundLayer1Ref.current, { opacity: 1 });
    gsap.set(backgroundLayer2Ref.current, { opacity: 0 });

    preloadImages();

    const interval = setInterval(changeBackground, 5000);

    return () => {
      clearInterval(interval);
      if (timeline) timeline.kill();
    };
  }, [backgrounds]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dual Layer Background for Smooth Transitions */}
      <div
        ref={backgroundLayer1Ref}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgrounds[0]})` }}
      />
      <div
        ref={backgroundLayer2Ref}
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      />

      {/* Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/40 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 text-center text-white max-w-4xl mx-auto px-6">
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Hotel Stay
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Discover luxury accommodations worldwide with SkyPay Hotel. Book
            your dream getaway with ease and comfort.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Explore Hotels
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-black hover:bg-white px-8 py-3 text-lg"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏨</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Premium Hotels</h3>
              <p className="text-gray-300">Handpicked luxury accommodations</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-300">Safe and encrypted transactions</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Best Rates</h3>
              <p className="text-gray-300">Competitive prices guaranteed</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
