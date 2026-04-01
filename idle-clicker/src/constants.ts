import { ResourceType } from "./types";

interface StageRequirement {
  resourceType: ResourceType;
  amount: number;
}

export interface PortalStage {
  title: string;
  desc: string;
  reqs: StageRequirement[];
}

export const PORTAL_STAGES: PortalStage[] = [
  { title: "Fundações Arcanas", desc: "Alinhar pedras mágicas e toras grossas.", reqs: [{ resourceType: ResourceType.wood, amount: 1000 }, { resourceType: ResourceType.stone, amount: 500 }] },
  { title: "Anéis Condutores", desc: "Criar os aros gigantescos para captar energia.", reqs: [{ resourceType: ResourceType.copperBar, amount: 100 }, { resourceType: ResourceType.stone, amount: 2000 }] },
  { title: "O Núcleo de Ferro", desc: "Forjar o pedestal ultra-resistente.", reqs: [{ resourceType: ResourceType.ironBar, amount: 200 }, { resourceType: ResourceType.copperBar, amount: 200 }] },
  { title: "Energização do Ouro", desc: "Bastar pura riqueza para excitar as partículas.", reqs: [{ resourceType: ResourceType.coin, amount: 50000 }, { resourceType: ResourceType.ironBar, amount: 500 }] },
  { title: "Ativar o Portal!", desc: "Deixar tudo para trás e reencarnar mais forte noutra dimensão.", reqs: [] },
];
