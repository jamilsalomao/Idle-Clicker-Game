import { Resources } from "../../types";
import styles from "./PortalMission.module.css";
import { PORTAL_STAGES } from "../../constants";

interface PortalMissionProps {
  resources: Resources;
  stageIndex: number;
  stardust: number;
  onContribute: () => void;
  onPrestige: () => void;
}

export default function PortalMission({ resources, stageIndex, stardust, onContribute, onPrestige }: PortalMissionProps) {
  const isFinished = stageIndex >= PORTAL_STAGES.length - 1;
  const currentStage = PORTAL_STAGES[stageIndex];
  
  let canAfford = true;
  if (!isFinished) {
    for (const req of currentStage.reqs) {
      if ((resources[req.resourceType]?.amount || 0) < req.amount) {
        canAfford = false;
        break;
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>🌌 O Grande Portão Dimensional ({stageIndex}/5)</h2>
        {stardust > 0 && <span className={styles.stardust}>✨ Pó Estelar Acumulado: {stardust} (Bônus Passivo: +{stardust * 20}%)</span>}
      </div>

      <div className={styles.card}>
        <h3 className={styles.stageTitle}>Estágio Atual: {currentStage.title}</h3>
        <p className={styles.desc}>{currentStage.desc}</p>
        
        {!isFinished ? (
          <ul className={styles.reqList}>
            {currentStage.reqs.map(req => {
              const hasAmount = resources[req.resourceType]?.amount || 0;
              const hasEnough = hasAmount >= req.amount;
              const resourceInfo = resources[req.resourceType];
              return (
                <li key={req.resourceType} className={hasEnough ? styles.reqMet : styles.reqMissing}>
                  {resourceInfo?.icon} {Math.floor(hasAmount).toLocaleString()} / {req.amount.toLocaleString()} {resourceInfo?.name}
                </li>
              );
            })}
          </ul>
        ) : (
          <p className={styles.victory}>O Universo Aguarda. Clique para Renascer!</p>
        )}

        {isFinished ? (
          <button className={`${styles.actionBtn} ${styles.prestigeBtn}`} onClick={onPrestige}>
            Adentrar no Portal (+1 Pó Estelar)
          </button>
        ) : (
          <button className={styles.actionBtn} disabled={!canAfford} onClick={onContribute}>
            Entregar Materiais e Avançar
          </button>
        )}
      </div>
    </div>
  );
}
