import { IconTrendingDown, IconTrendingUp, IconAlertCircle, IconActivity } from "@tabler/icons-react"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card"

export function SectionCards({ cards = [] }) {
  const cardsToRender = cards.length > 0 ? cards : [];

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "up":
        return <IconTrendingUp className="size-4" />;
      case "down":
        return <IconTrendingDown className="size-4" />;
      case "warning":
        return <IconAlertCircle className="size-4" />;
      case "optimal":
        return <IconActivity className="size-4" />;
      default:
        return null;
    }
  };

  if (cardsToRender.length === 0) {
    return null;
  }

  return (
    <div
      className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cardsToRender.map((card, index) => (
        <Card key={index} className="@container/card">
          <CardHeader>
            <CardDescription>{card.description}</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              {card.trendText || ""}
              {getTrendIcon(card.trend)}
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
