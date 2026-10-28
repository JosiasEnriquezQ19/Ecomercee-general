import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  reviews?: number;
  className?: string;
}

export function StarRating({ rating, reviews, className }: StarRatingProps) {
  const filled = Math.round(rating);
  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5" aria-label={`${rating} de 5 estrellas`}>
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            className={cn(
              "size-3.5",
              i < filled ? "fill-star text-star" : "fill-muted text-muted-foreground/25",
            )}
          />
        ))}
      </div>
      {reviews !== undefined && (
        <span className="text-xs font-medium text-muted-foreground">
          {rating.toFixed(1)}
          <span className="font-normal"> ({reviews})</span>
        </span>
      )}
    </div>
  );
}
