import { Actions, Resources, ResourceType } from "../../types";
import ActionButton from "../ActionButton/ActionButton";
import styles from "./ActionContainer.module.css";

interface ActionsContainerProps {
  resources: Resources;
  setResources: React.Dispatch<React.SetStateAction<Resources>>;
}

export default function ActionsContainer({
  resources,
  setResources,
}: ActionsContainerProps) {
  const actions: Actions = {
    // FASE 1
    chopWood: {
      name: "Cortar Madeira",
      icon: "🪓",
      trades: [{ resourceType: ResourceType.wood, amount: +1, production: 0 }],
      showIf: () => true,
    },
    buildMarket: {
      name: "Construir Mercado",
      icon: "🏪",
      trades: [
        { resourceType: ResourceType.wood, amount: -20, production: 0 },
        { resourceType: ResourceType.market, amount: +1, production: 0 }
      ],
      showIf: (res) => res.market.unlocked && res.market.amount === 0, 
    },
    
    // FASE 2
    sellWood: {
      name: "Vender Madeira",
      icon: "💰",
      trades: [
        { resourceType: ResourceType.wood, amount: -1, production: 0 },
        { resourceType: ResourceType.coin, amount: +2, production: 0 },
      ],
      showIf: (res) => res.market.amount > 0,
    },
    buildHouse: {
      name: "Construir Casa",
      icon: "🛠️",
      trades: [
        { resourceType: ResourceType.wood, amount: -15, production: 0 },
        { resourceType: ResourceType.coin, amount: -5, production: 0 },
        { resourceType: ResourceType.house, amount: +1, production: 0 },
      ],
      showIf: (res) => res.market.amount > 0,
    },
    hireWorker: {
      name: "Contratar Lenhador",
      icon: "👷",
      trades: [
        { resourceType: ResourceType.coin, amount: -10, production: 0 },
        { resourceType: ResourceType.house, amount: -1, production: 0 },
        { resourceType: ResourceType.worker, amount: +1, production: 0 },
      ],
      showIf: (res) => res.market.amount > 0,
    },
    hireMerchant: {
      name: "Contratar Comerciante",
      icon: "🛒",
      trades: [
        { resourceType: ResourceType.coin, amount: -50, production: 0 },
        { resourceType: ResourceType.house, amount: -1, production: 0 },
        { resourceType: ResourceType.merchant, amount: +1, production: 0 },
      ],
      showIf: (res) => res.market.amount > 0,
    },

    // FASE 3
    buildQuarry: {
      name: "Construir Pedreira",
      icon: "⛰️",
      trades: [
        { resourceType: ResourceType.wood, amount: -50, production: 0 },
        { resourceType: ResourceType.coin, amount: -50, production: 0 },
        { resourceType: ResourceType.quarry, amount: +1, production: 0 },
      ],
      showIf: (res) => res.quarry.unlocked && res.quarry.amount === 0,
    },
    mineStone: {
      name: "Minerar Manual",
      icon: "⛏️",
      trades: [{ resourceType: ResourceType.stone, amount: +1, production: 0 }],
      showIf: (res) => res.quarry.amount > 0,
    },
    hireMiner: {
      name: "Contratar Minerador",
      icon: "⛏️",
      trades: [
        { resourceType: ResourceType.coin, amount: -30, production: 0 },
        { resourceType: ResourceType.house, amount: -1, production: 0 },
        { resourceType: ResourceType.miner, amount: +1, production: 0 },
      ],
      showIf: (res) => res.quarry.amount > 0,
    },
    sellStone: {
      name: "Vender Pedra", icon: "💰",
      trades: [{ resourceType: ResourceType.stone, amount: -5, production: 0 }, { resourceType: ResourceType.coin, amount: +5, production: 0 }],
      showIf: (res) => res.quarry.amount > 0,
    },
    sellCopper: {
      name: "Vender Cobre Bruto", icon: "💰",
      trades: [{ resourceType: ResourceType.copperOre, amount: -1, production: 0 }, { resourceType: ResourceType.coin, amount: +5, production: 0 }],
      showIf: (res) => res.quarry.amount > 0,
    },
    sellIron: {
      name: "Vender Ferro Bruto", icon: "💰",
      trades: [{ resourceType: ResourceType.ironOre, amount: -1, production: 0 }, { resourceType: ResourceType.coin, amount: +15, production: 0 }],
      showIf: (res) => res.quarry.amount > 0,
    },

    // FASE 4
    buildFurnace: {
      name: "Construir Fornalha",
      icon: "🔥",
      trades: [
        { resourceType: ResourceType.stone, amount: -100, production: 0 },
        { resourceType: ResourceType.coin, amount: -200, production: 0 },
        { resourceType: ResourceType.furnace, amount: +1, production: 0 },
      ],
      showIf: (res) => res.furnace.unlocked && res.furnace.amount === 0,
    },
    hireSmelter: {
      name: "Contratar Fundidor",
      icon: "👨‍🏭",
      trades: [
        { resourceType: ResourceType.coin, amount: -150, production: 0 },
        { resourceType: ResourceType.house, amount: -2, production: 0 },
        { resourceType: ResourceType.smelter, amount: +1, production: 0 },
      ],
      showIf: (res) => res.furnace.amount > 0,
    },
    sellCopperBar: {
      name: "Vender Barra Cobre", icon: "💎",
      trades: [{ resourceType: ResourceType.copperBar, amount: -1, production: 0 }, { resourceType: ResourceType.coin, amount: +50, production: 0 }],
      showIf: (res) => res.furnace.amount > 0,
    },
    sellIronBar: {
      name: "Vender Barra Ferro", icon: "💎",
      trades: [{ resourceType: ResourceType.ironBar, amount: -1, production: 0 }, { resourceType: ResourceType.coin, amount: +200, production: 0 }],
      showIf: (res) => res.furnace.amount > 0,
    },
  };

  return (
    <section className={styles.container}>
      <div className={styles.group}>
        {Object.entries(actions).map(([actionType, action]) => {
          if (action.showIf && !action.showIf(resources)) return null;
          return (
            <div key={actionType} className={styles.card}>
              <ActionButton
                action={action}
                resources={resources}
                setResources={setResources}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
