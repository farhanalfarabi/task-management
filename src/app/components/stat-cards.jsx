import { 
  IconCode, 
  IconCircleCheck, 
  IconAlertTriangle, 
  IconClock 
} from "@tabler/icons-react"

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/components/ui/card"

export function StatCards({ cards = [] }) {
  const getIcon = (iconType) => {
    switch (iconType) {
      case "code":
        return IconCode;
      case "check":
        return IconCircleCheck;
      case "warning":
        return IconAlertTriangle;
      case "clock":
        return IconClock;
      default:
        return IconCode;
    }
  };

  const getColorClasses = (color) => {
    switch (color) {
      case "purple":
        return {
          bg: "bg-primary/5 dark:bg-primary/10",
          icon: "text-primary",
          value: "text-primary",
          title: "text-primary"
        };
      case "green":
        return {
          bg: "bg-green-50 dark:bg-green-950/20",
          icon: "text-green-600 dark:text-green-400",
          value: "text-green-700 dark:text-green-300",
          title: "text-green-600 dark:text-green-400"
        };
      case "orange":
        return {
          bg: "bg-orange-50 dark:bg-orange-950/20",
          icon: "text-orange-600 dark:text-orange-400",
          value: "text-orange-700 dark:text-orange-300",
          title: "text-orange-600 dark:text-orange-400"
        };
      case "gray":
        return {
          bg: "bg-gray-50 dark:bg-gray-900/50",
          icon: "text-gray-600 dark:text-gray-400",
          value: "text-gray-700 dark:text-gray-300",
          title: "text-gray-600 dark:text-gray-400"
        };
      default:
        return {
          bg: "bg-gray-50 dark:bg-gray-900/50",
          icon: "text-gray-600 dark:text-gray-400",
          value: "text-gray-700 dark:text-gray-300",
          title: "text-gray-600 dark:text-gray-400"
        };
    }
  };

  if (cards.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      {cards.map((card, index) => {
        const IconComponent = getIcon(card.icon);
        const colors = getColorClasses(card.color);

        return (
          <Card 
            key={index} 
            className={`${colors.bg} border-0 shadow-sm hover:shadow-md transition-shadow duration-200 py-4`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 px-6 pt-0">
              <CardDescription className={`${colors.title} font-medium text-sm`}>
                {card.title}
              </CardDescription>
              <IconComponent className={`${colors.icon} size-4`} />
            </CardHeader>
            <div className="px-6 pb-0">
              <CardTitle className={`${colors.value} text-2xl font-bold tabular-nums`}>
                {card.value}
              </CardTitle>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

