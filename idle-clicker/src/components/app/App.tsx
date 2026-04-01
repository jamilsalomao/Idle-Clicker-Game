import { Resources } from "../../types";
import ActionsContainer from "../ActionContainer/ActionContainer";
import Header from "../Header/Header";
import ResourcesContainer from "../ResourcesContainer/ResourcesContainer";
import PortalMission from "../PortalMission/PortalMission";
import { PORTAL_STAGES } from "../../constants";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

export default function App() {
  const [resources, setResources] = useState<Resources>({
    wood: { name: "Madeira", icon: "🌳", amount: 0, production: 0, unlocked: true },
    coin: { name: "Moedas", icon: "🪙", amount: 0, production: 0, unlocked: false },
    stone: { name: "Pedra", icon: "🪨", amount: 0, production: 0, unlocked: false },
    copperOre: { name: "Minério de Cobre", icon: "🥉", amount: 0, production: 0, unlocked: false },
    ironOre: { name: "Minério de Ferro", icon: "🥈", amount: 0, production: 0, unlocked: false },
    copperBar: { name: "Barra de Cobre", icon: "🟧", amount: 0, production: 0, unlocked: false },
    ironBar: { name: "Barra de Ferro", icon: "🔲", amount: 0, production: 0, unlocked: false },
    house: { name: "Casa", icon: "🏠", amount: 0, production: 0, unlocked: false },
    market: { name: "Mercado", icon: "🏪", amount: 0, production: 0, unlocked: false },
    quarry: { name: "Pedreira", icon: "⛰️", amount: 0, production: 0, unlocked: false },
    furnace: { name: "Fornalha", icon: "🔥", amount: 0, production: 0, unlocked: false },
    worker: { name: "Lenhador", icon: "🪓", amount: 0, production: 0, unlocked: false },
    merchant: { name: "Comerciante", icon: "🛒", amount: 0, production: 0, unlocked: false },
    miner: { name: "Minerador", icon: "⛏️", amount: 0, production: 0, unlocked: false },
    smelter: { name: "Fundidor", icon: "👨‍🏭", amount: 0, production: 0, unlocked: false },
  });

  const [portalStage, setPortalStage] = useState(0);
  const [stardust, setStardust] = useState(0);

  useEffect(() => {
    const produceResources = () => {
      setResources((prev) => {
        const prestigeMultiplier = 1 + (stardust * 0.2);

        let newWood = prev.wood.amount + (prev.worker.amount * prestigeMultiplier);
        let newStone = prev.stone.amount;
        let newCopperOre = prev.copperOre.amount;
        let newIronOre = prev.ironOre.amount;
        let newCopperBar = prev.copperBar.amount;
        let newIronBar = prev.ironBar.amount;
        let newCoin = prev.coin.amount;
        
        // 1. Mineração 
        if (prev.miner.amount > 0) {
          const totalMinerPower = prev.miner.amount * prestigeMultiplier;
          newStone += totalMinerPower * 0.7;
          newCopperOre += totalMinerPower * 0.2;
          newIronOre += totalMinerPower * 0.1;
        }
        
        // 2. Fundição (Smelters consumindo minérios)
        let smeltersAvailable = prev.smelter.amount * prestigeMultiplier;
        
        const ironToSmelt = Math.min(smeltersAvailable, newIronOre);
        newIronOre -= ironToSmelt;
        newIronBar += ironToSmelt;
        smeltersAvailable -= ironToSmelt;
        
        const copperToSmelt = Math.min(smeltersAvailable, newCopperOre);
        newCopperOre -= copperToSmelt;
        newCopperBar += copperToSmelt;
        smeltersAvailable -= copperToSmelt;

        // 3. Comércio Automático
        let woodToSell = 0;
        if (prev.merchant.amount > 0) {
          woodToSell = Math.min(prev.merchant.amount, newWood);
          newWood -= woodToSell;
          newCoin += woodToSell * 2; 
        }

        const updated: Resources = { ...prev };
        
        // Substituindo com os novos valores base
        updated.wood = { ...prev.wood, amount: newWood, production: (prev.worker.amount * prestigeMultiplier) - woodToSell };
        updated.stone = { ...prev.stone, amount: newStone, production: (prev.miner.amount * prestigeMultiplier) * 0.7 };
        updated.copperOre = { ...prev.copperOre, amount: newCopperOre, production: ((prev.miner.amount * prestigeMultiplier) * 0.2) - copperToSmelt };
        updated.ironOre = { ...prev.ironOre, amount: newIronOre, production: ((prev.miner.amount * prestigeMultiplier) * 0.1) - ironToSmelt };
        updated.copperBar = { ...prev.copperBar, amount: newCopperBar, production: copperToSmelt };
        updated.ironBar = { ...prev.ironBar, amount: newIronBar, production: ironToSmelt };
        updated.coin = { ...prev.coin, amount: newCoin, production: woodToSell * 2 };
        
        // Checagem de Desbloqueios Tecnológicos!
        if (updated.wood.amount >= 10 || updated.market.amount > 0) {
          updated.market.unlocked = true;
          updated.coin.unlocked = true; 
        }
        
        if (updated.market.amount > 0) {
           updated.house.unlocked = true;
           updated.worker.unlocked = true;
           updated.merchant.unlocked = true;
        }

        if (updated.coin.amount >= 20 || updated.quarry.amount > 0) {
           updated.quarry.unlocked = true;
        }

        if (updated.quarry.amount > 0) {
           updated.stone.unlocked = true;
           updated.copperOre.unlocked = true;
           updated.ironOre.unlocked = true;
           updated.miner.unlocked = true;
        }
        
        if (updated.stone.amount >= 20 || updated.furnace.amount > 0) {
           updated.furnace.unlocked = true;
        }

        if (updated.furnace.amount > 0) {
           updated.copperBar.unlocked = true;
           updated.ironBar.unlocked = true;
           updated.smelter.unlocked = true;
        }

        return updated;
      });
    };

    const interval = setInterval(produceResources, 1000);
    return () => clearInterval(interval);
  }, [stardust]);

  const handleContribute = () => {
    const stage = PORTAL_STAGES[portalStage];
    setResources(prev => {
      const updated = { ...prev };
      stage.reqs.forEach(req => {
        updated[req.resourceType] = {
          ...updated[req.resourceType],
          amount: updated[req.resourceType].amount - req.amount
        };
      });
      return updated;
    });
    setPortalStage(p => p + 1);
  };

  const handlePrestige = () => {
    setStardust(s => s + 1);
    setPortalStage(0);
    setResources({
      wood: { name: "Madeira", icon: "🌳", amount: 0, production: 0, unlocked: true },
      coin: { name: "Moedas", icon: "🪙", amount: 0, production: 0, unlocked: false },
      stone: { name: "Pedra", icon: "🪨", amount: 0, production: 0, unlocked: false },
      copperOre: { name: "Minério de Cobre", icon: "🥉", amount: 0, production: 0, unlocked: false },
      ironOre: { name: "Minério de Ferro", icon: "🥈", amount: 0, production: 0, unlocked: false },
      copperBar: { name: "Barra de Cobre", icon: "🟧", amount: 0, production: 0, unlocked: false },
      ironBar: { name: "Barra de Ferro", icon: "🔲", amount: 0, production: 0, unlocked: false },
      house: { name: "Casa", icon: "🏠", amount: 0, production: 0, unlocked: false },
      market: { name: "Mercado", icon: "🏪", amount: 0, production: 0, unlocked: false },
      quarry: { name: "Pedreira", icon: "⛰️", amount: 0, production: 0, unlocked: false },
      furnace: { name: "Fornalha", icon: "🔥", amount: 0, production: 0, unlocked: false },
      worker: { name: "Lenhador", icon: "🪓", amount: 0, production: 0, unlocked: false },
      merchant: { name: "Comerciante", icon: "🛒", amount: 0, production: 0, unlocked: false },
      miner: { name: "Minerador", icon: "⛏️", amount: 0, production: 0, unlocked: false },
      smelter: { name: "Fundidor", icon: "👨‍🏭", amount: 0, production: 0, unlocked: false },
    });
  };

  return (
    <article className={styles.container}>
      <Header />
      <PortalMission
        resources={resources}
        stageIndex={portalStage}
        stardust={stardust}
        onContribute={handleContribute}
        onPrestige={handlePrestige}
      />
      <ResourcesContainer resources={resources} />
      <ActionsContainer
        resources={resources}
        setResources={setResources}
      />
    </article>
  );
}