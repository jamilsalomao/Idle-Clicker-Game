export enum ResourceType {
  wood = "wood",
  coin = "coin",
  house = "house",
  worker = "worker",
  merchant = "merchant",
  stone = "stone",
  quarry = "quarry",
}

export interface Resource {
  name: string;
  icon: string;
  amount: number;
  production: number;
}

export interface Resources {
  wood: Resource;
  stone: Resource;
  coin: Resource;
  house: Resource;
  worker: Resource;
  merchant: Resource;
  miner: Resource;
  quarry: Resource; 
}

export interface Trade {
  resourceType: ResourceType;
  amount: number;
  production: number;
}

export enum ActionType {
  chopWood = "chopWood",
  sellWood = "sellWood",
  buildHouse = "buildHouse",
  hireWorker = "hireWorker",
  hireMerchant = "hireMerchant",
  mineStone = "mineStone",
}

export interface Action {
  name: string;
  icon: string;
  trades: { resourceType: ResourceType; amount: number; production: number }[];
}

export type Actions = {
  [key: string]: Action;
};