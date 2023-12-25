import { Card, List, SubCard } from "@prisma/client";

export type ListWithCards = List & { cards: Card[] };
export type CardWithSubCards = Card & { subCards: SubCard[] };

export type CardwithList = Card & { list: List };
export type SubCardsWithCard = SubCard & { card: Card };