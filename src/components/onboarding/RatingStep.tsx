import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

interface RatingStepProps {
  onNext: () => void;
}

const RatingStep = ({ onNext }: RatingStepProps) => {
  const starsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stars = starsRef.current;
    const testimonials = testimonialsRef.current;

    if (stars) {
      // Animate stars
      const starElements = stars.querySelectorAll('.rating-star');
      starElements.forEach((star, index) => {
        const element = star as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'scale(0.5) rotate(-180deg)';
        
        setTimeout(() => {
          element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'scale(1) rotate(0deg)';
        }, 300 + (index * 100));
      });
    }

    if (testimonials) {
      // Animate testimonials
      const testimonialElements = testimonials.querySelectorAll('.testimonial');
      testimonialElements.forEach((testimonial, index) => {
        const element = testimonial as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, 1200 + (index * 300));
      });
    }
  }, []);

  return (
    <div className="flex flex-col h-full px-6 py-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-8">
            Give us a rating
          </h1>

          {/* Rating display */}
          <div ref={starsRef} className="mb-6">
            <div className="flex items-center justify-center space-x-1 mb-2">
              <span className="text-2xl font-bold text-foreground mr-2">4.8</span>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="rating-star h-6 w-6 fill-yellow-400 text-yellow-400 animate-fade-in"
                  style={{ animationDelay: `${0.8 + i * 0.1}s` }}
                />
              ))}
            </div>
            <div className="text-muted-foreground">100K+ App Ratings</div>
            
            {/* Decorative laurels */}
            <div className="flex items-center justify-center mt-4">
              <div className="text-2xl bg-white rounded-full p-3 shadow-lg">🏆</div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Kalore was made for people like you
            </h2>
            
            {/* User avatars */}
            <div className="flex justify-center space-x-2 mb-2">
              <img 
                src="/lovable-uploads/4652c667-b491-4fe5-9719-6825139f6e3f.png" 
                alt="User avatar" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <img 
                src="/lovable-uploads/da1c207b-3dbf-453e-bcff-f8bdd24a7e06.png" 
                alt="User avatar" 
                className="w-12 h-12 rounded-full object-cover"
              />
              <img 
                src="/lovable-uploads/1dcdc75d-e476-44bc-8319-5be4fe445ee2.png" 
                alt="User avatar" 
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="text-sm text-muted-foreground">10k+ Kalore Users</div>
          </div>
        </div>

        {/* Testimonials */}
        <div ref={testimonialsRef} className="space-y-4">
          <div className="testimonial bg-muted/30 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <img 
                src="/lovable-uploads/4652c667-b491-4fe5-9719-6825139f6e3f.png" 
                alt="User avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-foreground">Jake Sullivan</span>
              <div className="flex space-x-1 ml-auto">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              I lost 15 lbs in 2 months! I was about to go on Ozempic but decided to give this app a shot and it worked :)
            </p>
          </div>

          <div className="testimonial bg-muted/30 rounded-2xl p-4 shadow-lg">
            <div className="flex items-center space-x-3 mb-3">
              <img 
                src="/lovable-uploads/1dcdc75d-e476-44bc-8319-5be4fe445ee2.png" 
                alt="User avatar" 
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-foreground">Benny Marcs</span>
              <div className="flex space-x-1 ml-auto">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">
              The time I have saved by just taking pictures of my food is incredible. Kalore makes tracking so easy!
            </p>
          </div>
        </div>
      </div>

      <div className="mt-auto pt-4 pb-16">
        <Button
          onClick={onNext}
          className="w-full h-14 text-lg font-medium rounded-full"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default RatingStep;