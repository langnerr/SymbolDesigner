import React from "react";
import classNames from "classnames";

import styles from "./Toolbar.module.scss";
import { useEditorStore } from "./store";

const Toolbar: React.FC = () => {
  const store = useEditorStore();

  return (
    <div className={styles.toolbar}>
      <button
        className={classNames({
          [styles.active]: store.currentTool === "SELECT",
        })}
        onClick={() => store.setTool("SELECT")}
      >
        select
      </button>
      <button
        className={classNames({
          [styles.active]: store.currentTool === "CREATE_LINE",
        })}
        onClick={() => store.setTool("CREATE_LINE")}
      >
        createLine
      </button>
    </div>
  );
};

export default Toolbar;
