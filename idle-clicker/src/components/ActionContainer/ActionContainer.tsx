import { Actions, Resources, ResourceType } from "../../types";
import ActionButton from "../ActionButton/ActionButton";
import styles from "./ActionContainer.module.css";

interface ActionsContainerProps {
  resources: Resources;
  setResources: React.Dispatch<React.SetStateAction<Resources>>;
  contratarComerciante: () => void;
  contratarMinerador: () => void;
  contratarWorker: () => void;
  construirPedreira: () => void; // Adicionando a função de contratar trabalhador
}


export default function ActionsContainer({
  resources,
  setResources,
  contratarComerciante,
  contratarMinerador,
  contratarWorker,
  construirPedreira,
}: ActionsContainerProps) {
  const actions: Actions = {
    chopWood: {
      name: "Cortar Madeira",
      icon: "🪓",
      trades: [{ resourceType: ResourceType.wood, amount: +1, production: 0 }],
    },
    sellWood: {
      name: "Vender Madeira",
      icon: "💰",
      trades: [
        { resourceType: ResourceType.wood, amount: -1, production: 0 },
        { resourceType: ResourceType.coin, amount: +1, production: 0 },
      ],
    },
    buildHouse: {
      name: "Construir Casa",
      icon: "🛠️",
      trades: [
        { resourceType: ResourceType.wood, amount: -5, production: 0 },
        { resourceType: ResourceType.coin, amount: -5, production: 0 },
        { resourceType: ResourceType.house, amount: +1, production: 0 },
      ],
    },
    hireWorker: {
      name: "Contratar Trabalhador",
      icon: "👷",
      trades: [
        { resourceType: ResourceType.coin, amount: -10, production: 0 },
        { resourceType: ResourceType.house, amount: -1, production: 0 },
        { resourceType: ResourceType.worker, amount: +1, production: 0 },
      ],
    },
    hireMerchant: {
      name: "Contratar Comerciante",
      icon: "🛒",
      trades: [
        { resourceType: ResourceType.coin, amount: -50, production: 0 },
        { resourceType: ResourceType.merchant, amount: +1, production: 0 },
      ],
    },
    hireMiner: {
      name: "Contratar Minerador",
      icon: "⛏️",
      trades: [
        { resourceType: ResourceType.coin, amount: -15, production: 0 },
        { resourceType: ResourceType.house, amount: -1, production: 0 },
      ],
    },
    construirPedreira: {
      name: "Construir Pedreira",
      icon: "⛰️",
      trades: [
        { resourceType: ResourceType.coin, amount: -30, production: 0 }, // Exemplo, pode ajustar conforme necessário
        { resourceType: ResourceType.wood, amount: -10, production: 0 },
        { resourceType: ResourceType.quarry, amount: +1, production: 0 },
      ],
    },
  };

  return (
    <section className={styles.container}>
      <div className={styles.group}>
        {Object.entries(actions).map(([actionType, action]) => (
          <div key={actionType} className={styles.card}>
            <ActionButton
              action={action}
              resources={resources}
              setResources={setResources}
              onSpecialAction={
                actionType === "hireMerchant"
                  ? contratarComerciante
                  : actionType === "hireMiner"
                  ? contratarMinerador
                  : actionType === "hireWorker"
                  ? contratarWorker
                  : actionType === "construirPedreira"
                  ? construirPedreira
                  : undefined
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}
