import React from "react";
import styles from "./Status.module.scss";

import { useEditorStore } from "./store";

const Status: React.FC = () => {
  const store = useEditorStore();

  return (
    <div className={styles.status}>
      SelectedNode: {JSON.stringify(store.selectedNode?.id)}
    </div>
  );
};

export default Status;
