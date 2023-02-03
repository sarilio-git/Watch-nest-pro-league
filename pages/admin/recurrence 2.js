import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";

export default function Recurrence() {
  const getFromStorage = (key) => {
    if (typeof window !== "undefined") {
      return window.localStorage.getItem(key);
    }
  };

  const setToStorage = (key, value) => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, value);
    }
  };

  const translateId = {
    SA: {
      hub_id: "ae03ad00-c2c5-46ca-a1a7-689cbd668a3c",
      queue_id: "63d44ce85a9f42248a7a4f72",
      leaderboard_id: "63daaf33c2d6ee7da7a85db5",
    },
    CSA: {
      hub_id: "74effb8b-0155-4ae5-9a3a-3097c9833b7d",
      queue_id: "63d994246d84301789b0d428",
      leaderboard_id: "63dc08555ca9066d45790e1a",
  };

  const [entity, setEntity] = useState(
    translateId[getFromStorage("hub_selected")] || translateId.SA
  );
  const [matches, setMatches] = useState([]);

  const handleSelectHub = (hub) => {
    setToStorage("hub_selected", hub);
    setEntity(translateId[hub]);
  };

  const getMatches = () => {
    axios.get(`/api/matches/history/${entity.hub_id}`).then((res) => {
      setMatches(res.data.payload);
    });
  };

  useEffect(() => {
    getMatches();
  }, [entity.hub_id, entity.queue_id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>WatchFPL Admin - Recurrence</title>
      </Head>
      <a href="https://www.nestgo.online">
      <div className="w-2000 h-200 mt-10 ml-10 absolute top-0 left-0">
        <img className="h-24 w-25" src="/nest_logohw.png" alt="Logo" />
      </div>
    </a>
      <main className={styles.main}>
        <select
          onChange={(e) => handleSelectHub(e.target.value)}
          value={
            getFromStorage("hub_selected") ||
            "ef607668-a51a-4ea6-8b7b-dab07e0ab151"
          }
          className="text-4xl font-play font-bold mb-4 text-center select select-ghost w-fit"
        >
          <option className="text-base font-play font-bold" value="SA">
          HUB | NESTGO
          </option>
          <option className="text-base font-play font-bold" value="CSA">
          NEST PRO LEAGUE | NPL
          </option>
                 </select>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Period</th>
                <th>Players</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </main>
      <footer className={styles.footer}>
      <a
          className="font-sora max-w-fit"
          href="https://www.nestgo.online"
          target="blank"
          rel="noopener noreferrer"
        >
          nest - GAME ON, LEARN ON
        </a>
      </footer>
    </div>
  );
}
