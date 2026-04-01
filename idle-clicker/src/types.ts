export enum ResourceType {
  wood = "wood",
  coin = "coin",
  stone = "stone",
  copperOre = "copperOre",
  ironOre = "ironOre",
  copperBar = "copperBar",
  ironBar = "ironBar",
  house = "house",
  market = "market",
  quarry = "quarry",
  furnace = "furnace",
  worker = "worker",
  merchant = "merchant",
  miner = "miner",
  smelter = "smelter",
}

export interface Resource {
  name: string;
  icon: string;
  amount: number;
  production: number;
  unlocked: boolean;
}

export type Resources = Record<ResourceType, Resource>;

export interface Action {
  name: string;
  icon: string;
  trades: { resourceType: ResourceType; amount: number; production: number }[];
  requires?: { resourceType: ResourceType; amount: number; errorMessage: string }[];
  showIf?: (resources: Resources) => boolean;
}

export type Actions = {
  [key: string]: Action;
};