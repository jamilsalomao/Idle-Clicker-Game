import { Action, Resources } from "../../types";
import styles from "./ActionButton.module.css";

interface ActionButtonProps {
  action: Action;
  resources: Resources;
  setResources: React.Dispatch<React.SetStateAction<Resources>>;
  onSpecialAction?: () => void; 
}

export default function ActionButton({
  action,
  resources,
  setResources,
  onSpecialAction,
}: ActionButtonProps) {
  const performTrade = () => {
    if (onSpecialAction) {
      onSpecialAction();
      return;
    }

    let tradeIsPossible = true;
    const updatedResources = { ...resources };

    action.trades.forEach(({ resourceType, amount, production }) => {
      const resource = updatedResources[resourceType];
      if (!resource) {
        console.error(`Recurso "${resourceType}" não encontrado em resources.`);
        tradeIsPossible = false;
        return;
      }

      const newAmount = resource.amount + amount;
      const newProduction = resource.production + production;

      tradeIsPossible = tradeIsPossible && newAmount >= 0;
      tradeIsPossible = tradeIsPossible && newProduction >= 0;

      resource.amount = newAmount;
      resource.production = newProduction;
      updatedResources[resourceType] = resource;
    });

    if (tradeIsPossible) setResources(updatedResources);
  };

  const listItems = action.trades.map(({ resourceType, amount }) => {
    const resource = resources[resourceType];
    if (!resource) {
      console.warn(`Recurso "${resourceType}" não encontrado em resources.`);
      return null; 
    }

    return (
      <li key={resourceType}>
        {amount > 0 ? "+" : ""}
        {amount} {resource.icon} {resource.name}
      </li>
    );
  });

  return (
    <div className={styles.box}>
      <p className={styles.name}>{action.name}</p>
      <button className={styles.button} onClick={performTrade}>
        <span className={styles.icon}>{action.icon}</span>
      </button>
      <ul className={styles.trades}>{listItems}</ul>
    </div>
  );
}
