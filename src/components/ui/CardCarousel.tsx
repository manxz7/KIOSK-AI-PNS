import { useEffect, useRef } from "react";
import KioskCard from "./KioskCard";

interface CarouselItem {
  key: string;
  icon: string;
  label: string;
  description?: string;
  onClick?: () => void;
}

interface CardCarouselProps {
  items: CarouselItem[];
  cardWidthClass?: string;
}

/**
 * Horizontally swipeable "globe" carousel — cards curve away in 3D as they
 * drift from center, like they're wrapping around a cylinder. Snap-scroll
 * keeps one card centered at rest; no page-level scrolling required.
 */
export default function CardCarousel({ items, cardWidthClass = "w-56 sm:w-60" }: CardCarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;
    function applyTransforms() {
      const containerRect = scroller!.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const half = containerRect.width / 2;

      for (const card of cardRefs.current) {
        if (!card) continue;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const raw = (cardCenter - centerX) / half;
        const clamped = Math.max(-1.6, Math.min(1.6, raw));
        const rotateY = clamped * -38;
        const translateZ = -Math.min(Math.abs(clamped), 1) * 110;
        const translateX = clamped * -8;
        const scale = 1 - Math.min(Math.abs(clamped), 1) * 0.2;
        const opacity = 1 - Math.min(Math.abs(clamped), 1.2) * 0.55;

        card.style.transform = `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        card.style.opacity = String(Math.max(opacity, 0.25));
        card.style.zIndex = String(200 - Math.round(Math.abs(clamped) * 50));
      }
    }

    function onScroll() {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(applyTransforms);
    }

    applyTransforms();
    scroller.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      scroller.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items.length]);

  return (
    <div
      ref={scrollerRef}
      className="flex w-full snap-x snap-mandatory items-center gap-6 overflow-x-auto overscroll-x-contain py-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      style={{ perspective: "1400px" }}
    >
      <div className="w-[calc(50%-7rem)] shrink-0 sm:w-[calc(50%-7.5rem)]" aria-hidden />
      {items.map((item, i) => (
        <div
          key={item.key}
          ref={(el) => {
            cardRefs.current[i] = el;
          }}
          className={`${cardWidthClass} shrink-0 snap-center will-change-transform`}
        >
          <KioskCard
            icon={item.icon}
            label={item.label}
            description={item.description}
            onClick={item.onClick}
          />
        </div>
      ))}
      <div className="w-[calc(50%-7rem)] shrink-0 sm:w-[calc(50%-7.5rem)]" aria-hidden />
    </div>
  );
}
