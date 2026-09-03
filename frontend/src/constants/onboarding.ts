import {
MapPin,
ShoppingBag,
Store,
} from "lucide-react-native";

import { theme } from "./theme";

export const onboardingSlides = [
{
id: "discover",
title: "Discover what's near you",
description:
"Find phones, electronics, fashion, cosmetics, shoes and more from sellers around Burayu.",
icon: MapPin,
},

{
id: "shop",
title: "Shop with confidence",
description:
"Explore products, compare sellers, check ratings and get your purchases delivered to you.",
icon: ShoppingBag,
},

{
id: "sell",
title: "Turn products into business",
description:
"Anyone can become a seller. List your products and reach customers across Burayu.",
icon: Store,
},
] as const;
