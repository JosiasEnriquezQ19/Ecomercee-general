import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { CarouselApi } from "@/components/ui/carousel";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { promoSlides, type PromoSlide } from "@/data/products";
import { cn } from "@/lib/utils";

const themeClasses: Record<PromoSlide["theme"], string> = {
  ink: "bg-ink text-ink-foreground",
  brand: "bg-brand text-brand-foreground",
  soft: "bg-brand-soft text-accent-foreground",
};

const ctaClasses: Record<PromoSlide["theme"], string> = {
  ink: "bg-brand text-brand-foreground hover:bg-brand/90",
  brand: "bg-ink text-ink-foreground hover:bg-ink/90",
  soft: "bg-ink text-ink-foreground hover:bg-ink/90",
};


function SlideContent({ slide }: { slide: PromoSlide }) {
  return (
    <div
      className={cn(
        "relative flex h-full flex-col justify-center gap-4 overflow-hidden rounded-3xl px-8 py-10 md:px-14 md:py-14",
        themeClasses[slide.theme],
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-current opacity-[0.07]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-32 size-80 rounded-full bg-current opacity-[0.05]"
      />
      <span className="w-fit rounded-full border border-current/25 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
        {slide.eyebrow}
      </span>
      <h2 className="font-display text-4xl font-bold leading-none tracking-tight md:text-6xl">
        {slide.title}{" "}
        <span className="opacity-70">{slide.highlight}</span>
      </h2>
      <p className="max-w-md text-sm opacity-80 md:text-base">
        {slide.description}
      </p>
      <Button asChild className={cn("w-fit rounded-full px-6", ctaClasses[slide.theme])}>
        <Link to="/" search={{ cat: slide.categoryId, q: undefined }}>
          {slide.cta}
        </Link>
      </Button>
    </div>
  );
}

export function HeroCarousel() {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const id = window.setInterval(() => api.scrollNext(), 5000);
    return () => window.clearInterval(id);
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full"
      opts={{ loop: true, align: "start" }}
    >
      <CarouselContent>
        {promoSlides.map((slide) => (
          <CarouselItem key={slide.eyebrow}>
            <div className="h-64 md:h-80">
              <SlideContent slide={slide} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex justify-center gap-2">
        {promoSlides.map((slide, i) => (
          <button
            key={slide.eyebrow}
            type="button"
            aria-label={`Ir a la promoción ${i + 1}`}
            onClick={() => api?.scrollTo(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === current ? "w-7 bg-ink" : "w-2.5 bg-muted-foreground/30",
            )}
          />
        ))}
      </div>
    </Carousel>
  );
}
