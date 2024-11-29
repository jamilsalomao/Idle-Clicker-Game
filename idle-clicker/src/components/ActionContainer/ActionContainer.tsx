import { Actions, Resources, ResourceType } from "../../types";
import ActionButton from "../ActionButton/ActionButton";
import styles from "./ActionContainer.module.css";

interface ActionsContainerProps {
  resources: Resources;
  setResources: React.Dispatch<React.SetStateAction<Resources>>;
  contratarComerciante: () => void; 
}

export default function ActionsContainer({
  resources,
  setResources,
  contratarComerciante, 
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
      icon: "🧾",
      trades: [
        { resourceType: ResourceType.wood, amount: 0, production: 1 },
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
              onSpecialAction={actionType === "hireMerchant" ? contratarComerciante : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
