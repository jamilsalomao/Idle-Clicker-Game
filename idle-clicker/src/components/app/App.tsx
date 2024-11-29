import { Resource, Resources } from "../../types";
import ActionsContainer from "../ActionContainer/ActionContainer";
import Header from "../Header/Header";
import ResourcesContainer from "../ResourcesContainer/ResourcesContainer";
import styles from "./App.module.css";
import { useEffect, useState } from "react";

export default function App() {
  const [resources, setResources] = useState<Resources>({
    wood: {
      name: "Madeira",
      icon: "🌳",
      amount: 0,
      production: 0,
    },
    coin: {
      name: "Moeda",
      icon: "🪙",
      amount: 0,
      production: 0,
    },
    house: {
      name: "Casa",
      icon: "🏠",
      amount: 0,
      production: 0,
    },
    worker: {
      name: "Trabalhador",
      icon: "👷",
      amount: 0,
      production: 0,
    },
    merchant: { 
      name: "Comerciante", 
      icon: "🛒", 
      amount: 0, 
      production: 0 },
  });

  const [merchantSelling, setMerchantSelling] = useState(false);

  const produceResource = (resource: Resource) => {
    let newAmount = resource.amount + resource.production;
    if (newAmount < 0) newAmount = 0;
    return {
      ...resource,
      amount: newAmount,
    };
  };

  useEffect(() => {
    const produceResources = () => {
      setResources((resources: Resources) => {
        const updatedResources: Resources = {
          wood: {
            ...resources.wood,
            production: resources.worker.amount,  
            amount: resources.wood.amount + resources.worker.amount, 
          },
          coin: produceResource(resources.coin),
          house: produceResource(resources.house),
          worker: produceResource(resources.worker),
          merchant: produceResource(resources.merchant),
        };
        return updatedResources;
      });
    };
  
    const interval = setInterval(produceResources, 1000);
    return () => clearInterval(interval);
  }, [resources.worker.amount]);
  
  

  const contratarComerciante = () => {
    if (resources.coin.amount >= 50) {
      setResources((prev) => ({
        ...prev,
        coin: { ...prev.coin, amount: prev.coin.amount - 50 },
        merchant: { ...prev.merchant, amount: prev.merchant.amount + 1 },
      }));
    }
  };

  
  useEffect(() => {
    if (resources.merchant.amount > 0) {
      setMerchantSelling(true);
    }
  }, [resources.merchant.amount]);

  useEffect(() => {
    if (merchantSelling) {
      const interval = setInterval(() => {
        if (resources.wood.amount > 0) {
          const woodSold = resources.merchant.amount;
          setResources((prevResources) => ({
            ...prevResources,
            wood: { ...prevResources.wood, amount: prevResources.wood.amount - woodSold},
            coin: { ...prevResources.coin, amount: prevResources.coin.amount + woodSold },
          }));
        }
      }, 1000); 
      return () => clearInterval(interval);
    }
  },  [merchantSelling, resources.wood.amount, resources.coin.amount, resources.merchant.amount]);



  return (
    <article className={styles.container}>
      <Header />
      <ResourcesContainer resources={resources} />
      <ActionsContainer 
        resources={resources} 
        setResources={setResources}  
        contratarComerciante={contratarComerciante} 
      />
    </article>
  );
}