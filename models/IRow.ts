import ICard from "./ICard";

export default interface IRow {
  type: string;
  title: string;
  cards: ICard[];
}
