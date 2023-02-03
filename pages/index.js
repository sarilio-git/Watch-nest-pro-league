import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";

export default function Home() {
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
    },
      };
  const [streamers, setStreamers] = useState([]);
  const [queue, setQueue] = useState([]);
  const [matches, setMatches] = useState([]);
  const [ranking, setRanking] = useState({});
  const [entity, setEntity] = useState(
    translateId[getFromStorage("hub_selected")] || translateId.SA
  );

  const handleSelectHub = (hub) => {
    setToStorage("hub_selected", hub);
    setEntity(translateId[hub]);
  };

  const getRanking = () => {
    axios
      .get(
        `/api/rankings/${entity.hub_id}?leaderboard_id=${entity.leaderboard_id}`
      )
      .then((res) => {
        setRanking(res.data.payload);
      });
  };

  const getQueues = () => {
    axios.get(`/api/queue/${entity.queue_id}`).then((res) => {
      setQueue(res.data.payload);
    });
  };

  const getStreamers = () => {
    axios.get(`/api/streamers/${entity.hub_id}`).then((res) => {
      setStreamers(res.data.results);
    });
  };

  const getMatches = () => {
    axios.get(`/api/matches/${entity.hub_id}`).then((res) => {
      setMatches(res.data.payload);
    });
  };

  const verifyStream = (id) => {
    const playerStreaming = streamers.filter((stream) => {
      return stream.profile.id == id;
    });

    return playerStreaming[0];
  };

  const getMap = (maps, pick, allMaps) => {
    const map = maps?.filter((map) => {
      return map.class_name == pick;
    })[0];
    if (!map) {
      if (!allMaps)
        return {
          class_name: "Picking map",
          image_lg:
            "https://quoramarketing.com/wp-content/uploads/2022/09/CSGO-All-Maps-in-Competitive-Pool-Active-Duty.jpg",
        };
      return allMaps[0];
    }
    return map;
  };

  const updateStats = () => {
    getMatches();
    getStreamers();
    getQueues();
    getRanking();
  };

  const formatDate = (date) => {
    if (!date) return "";
    var today = new Date(date); // yyyy-mm-dd

    var month = today
      .toLocaleString("default", { month: "short" })
      .replace(".", "");
    month = month.charAt(0).toUpperCase() + month.slice(1);
    var day = today.getDate();
    return month + " " + day;
  };

  const verifyResult = (score1, score2) => {
    if (score1 == score2) {
      return "stat-value text-gray-400 font-semibold text-4xl";
    } else if (score1 > score2) {
      return "stat-value text-green-500 font-semibold text-4xl";
    }

    return "stat-value text-red-500 font-semibold text-4xl";
  };

  useEffect(() => {
    updateStats();
  }, [entity.hub_id, entity.queue_id]);

  return (
    <div className={styles.container}>
      <Head>
        <title>NPL | NEST PRO LEAGUE</title>
      </Head>
      <a href="https://www.nestgo.online">
      <div className="w-2000 h-200 mt-10 ml-10 absolute top-0 left-0">
        <img className="h-24 w-25" src="/nest_logohw.png" alt="Logo" />
      </div>
    </a>
          <main className={styles.main}>
        <div className="select-header flex gap-2">
                  <select
            onChange={(e) => handleSelectHub(e.target.value)}
            value={
              getFromStorage("hub_selected") ||
              "ef607668-a51a-4ea6-8b7b-dab07e0ab151"
            }
            className="text-4xl font-bold mb-4 text-center select select-ghost w-fit"
          >
            <option className="text-base font-bold" value="SA">
              HUB | NESTGO
            </option>
            <option className="text-base font-bold" value="CSA">
              NEST PRO LEAGUE | NPL
            </option>
          </select>
          <label htmlFor="my-modal" className="ranking-mobile btn modal-button">
            VER TOP 10!
          </label>
        </div>
              <div className="flex flex-col items-center gap-2 mb-8">
          <div className="badge badge-accent font-bold bg-orange-600 border-orange-600">
            {matches.length} LIVE MATCH{matches.length != 1 ? "ES" : ""}
          </div>
          <div className="dropdown dropdown-hover dropdown-center">
            <label
              tabIndex="0"
              className="badge font-bold badge-primary mb-2"
            >
              {queue.length} PLAYERS NA FILA
            </label>
            <ul
              tabIndex="0"
              className="dropdown-content menu text-center p-2 shadow bg-base-100 rounded-box w-full"
            >
              {queue.map((player) => {
                return (
                  <li key={player.nickname}>
                    <a
                      href={`https://www.faceit.com/pt/players/${player.nickname}`}
                      target="blank"
                      className="p-2 font-red-hat font-semibold text-gray-300"
                    >
                      {player.nickname}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
                      <div className="content w-full grid gap-4 grid-cols-8">
                        <div className="ranking max-w-fit col-start-1 col-end-3">
                      <div className="text-2xl font-bold mb-4 w-fit">
              Ranking{" "}
              <span className="ml-4 stat-desc text-lg font-medium">{` ${formatDate(
                ranking.leaderboard?.start_date
              )} - ${formatDate(ranking.leaderboard?.end_date)}`}</span>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>TOP 10!</th>
                  </tr>
                </thead>
                                <tbody>
                  {ranking.rankings?.slice(0, 10).map((player) => {
                    return (
                      <tr key={player.position}>
                        <td>{player.position}</td>
                                                <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div
                                className={
                                  verifyStream(player.placement.entity_id)
                                    ? "mask mask-squircle w-8 h-8 rounded-full border-purple-500 border-2"
                                    : "mask mask-squircle w-8 h-8 rounded-full"
                                }
                              >
                                <img
                                  src={player.placement.entity_avatar}
                                  alt="Player image"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-medium text-sm">
                                {player.placement.entity_name}
                              </div>
                              {verifyStream(player.placement.entity_id) ? (
                                <a
                                  className="flex items-center"
                                  target="blank"
                                  href={
                                    verifyStream(player.placement.entity_id)
                                      .stream.channel_url
                                  }
                                >
                                  <span className="flex gap-2 font-medium text-purple-500 hover:font-bold">
                                    {
                                      verifyStream(player.placement.entity_id)
                                        .stream.channel_name
                                    }
                                    <div className="mb-auto gap-1 text-red-500 font-medium flex items-center">
                                      <span className="text-red-500 text-base font-bold material-symbols-outlined">
                                        person
                                      </span>
                                      {
                                        verifyStream(player.placement.entity_id)
                                          .stream.viewers
                                      }
                                    </div>
                                  </span>
                                </a>
                              ) : (
                                ""
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="gap-8 col-start-3 col-end-7 flex flex-col">
            {matches.map((match) => {
              return (
                <div
                  key={match.id}
                  className="card rounded-lg max-w-4xl bg-card"
                >
                  <div className="card-bg flex absolute w-full h-full">
                    <figure>
                      <img
                        src={match.teams.faction1.avatar}
                        alt={match.teams.faction1.name}
                      />
                    </figure>
                    <figure>
                      <img
                        src={match.teams.faction2.avatar}
                        alt={match.teams.faction2.name}
                      />
                    </figure>
                  </div>
                  <div className="p-4 px-8 pb-8 card-body">
                    <div className="relative">
                      <div className="scoreboard flex justify-center mb-4 w-full gap-8">
                        <h2 className="w-1/2 mr-auto flex items-center font-red-hat text-2xl gap-2 text-white font-medium min-w-fit">
                          {match.teams.faction1.name}
                        </h2>
                        <div className="score flex gap-2 pt-1 pb-2 px-4 rounded-lg font-semibold text-3xl align-middle">
                          <div
                            className={verifyResult(
                              match.summaryResults?.factions?.faction1.score,
                              match.summaryResults?.factions?.faction2.score
                            )}
                          >
                            {match.summaryResults?.factions?.faction1.score < 10
                              ? `0${match.summaryResults?.factions?.faction1.score}`
                              : match.summaryResults?.factions?.faction1.score}
                          </div>
                          :
                          <div
                            className={verifyResult(
                              match.summaryResults?.factions?.faction2.score,
                              match.summaryResults?.factions?.faction1.score
                            )}
                          >
                            {match.summaryResults?.factions?.faction2.score < 10
                              ? `0${match.summaryResults?.factions?.faction2.score}`
                              : match.summaryResults?.factions?.faction2.score}
                          </div>
                        </div>
                        <h2 className="w-1/2 ml-auto justify-end flex text-2xl font-red-hat items-center gap-2 text-white font-medium min-w-fit">
                          {match.teams.faction2.name}
                        </h2>
                      </div>
                      <div className="w-full h-fit flex justify-center">
                        <div className="map-card h-fit p-1 rounded-lg flex items-center justify-center w-52 image-full">
                          <figure>
                            <img
                              src={
                                getMap(
                                  match.voting?.map.entities,
                                  match.voting?.map.pick,
                                  match.maps
                                )?.image_lg
                              }
                              className="rounded-lg"
                              alt={
                                getMap(
                                  match.voting?.map.entities,
                                  match.voting?.map.pick,
                                  match.maps
                                )?.class_name
                              }
                            />
                          </figure>
                          <div className="map-card-body h-8 flex items-center justify-center">
                            <h2 className="text-gray-200 text-base mx-auto">
                              {
                                getMap(
                                  match.voting?.map.entities,
                                  match.voting?.map.pick,
                                  match.maps
                                )?.class_name
                              }
                            </h2>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col gap-4">
                        {match.teams.faction1.roster.map((player) => {
                          return (
                            <div
                              key={player.id}
                              className="flex h-10 gap-2 items-center"
                            >
                              <div className="avatar">
                                <div
                                  className={
                                    verifyStream(player.id)
                                      ? "w-8 h-fit rounded-full border-purple-500 border-2"
                                      : "w-8 border-2 border-white h-fit rounded-full"
                                  }
                                >
                                  <img src={player.avatar} />
                                </div>
                              </div>
                              <div className="flex flex-col text-gray-400 font-medium text-base">
                                {player.nickname}
                                {verifyStream(player.id) ? (
                                  <a
                                    className="flex items-center"
                                    target="blank"
                                    href={
                                      verifyStream(player.id).stream.channel_url
                                    }
                                  >
                                    <span className="flex gap-2 font-medium text-purple-500 hover:font-bold">
                                      {
                                        verifyStream(player.id).stream
                                          .channel_name
                                      }
                                      <div className="mb-auto gap-1 text-red-500 font-medium flex items-center">
                                        <span className="text-red-500 text-base font-bold material-symbols-outlined">
                                          person
                                        </span>
                                        {verifyStream(player.id).stream.viewers}
                                      </div>
                                    </span>
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="flex flex-col gap-4 items-end">
                        {match.teams.faction2.roster.map((player) => {
                          return (
                            <div
                              key={player.id}
                              className="flex p-1 h-10 gap-2 items-center"
                            >
                              <div className="flex flex-col items-end font-medium text-gray-400 text-base">
                                {player.nickname}
                                {verifyStream(player.id) ? (
                                  <a
                                    className="flex items-center"
                                    target="blank"
                                    href={
                                      verifyStream(player.id).stream.channel_url
                                    }
                                  >
                                    <span className="flex gap-2 font-medium text-purple-500 hover:font-bold">
                                      <div className="mb-auto gap-1 text-red-500 font-medium flex items-center">
                                        {verifyStream(player.id).stream.viewers}
                                        <span className="text-red-500 text-base font-bold material-symbols-outlined">
                                          person
                                        </span>
                                      </div>
                                      {
                                        verifyStream(player.id).stream
                                          .channel_name
                                      }
                                    </span>
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                              <div className="avatar">
                                <div
                                  className={
                                    verifyStream(player.id)
                                      ? "w-8 h-fit rounded-full border-purple-500 border-2"
                                      : "w-8 border-2 border-white h-fit rounded-full"
                                  }
                                >
                                  <img src={player.avatar} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box bg-main relative">
            <label
              htmlFor="my-modal"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div>
              <div className="text-2xl font-bold mb-4 w-fit">
                Ranking{" "}
                <span className="ml-4 stat-desc text-lg font-medium">{` ${formatDate(
                  ranking.leaderboard?.start_date
                )} - ${formatDate(ranking.leaderboard?.end_date)}`}</span>
              </div>
              <div className="overflow-x-auto w-full">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                    </tr>
                    </thead>
                  <tbody>
                    {ranking.rankings?.slice(0, 10).map((player) => {
                      return (
                        <tr key={player.position}>
                          <td>{player.position}</td>
                          <td>
                            <div className="flex items-center space-x-3">
                              <div className="avatar">
                                <div
                                  className={
                                    verifyStream(player.placement.entity_id)
                                      ? "mask mask-squircle w-8 h-8 rounded-full border-purple-500 border-2"
                                      : "mask mask-squircle w-8 h-8 rounded-full"
                                  }
                                >
                                  <img
                                    src={player.placement.entity_avatar}
                                    alt="Player image"
                                  />
                                </div>
                              </div>
                              <div>
                                <div className="font-medium text-sm">
                                  {player.placement.entity_name}
                                </div>
                                {verifyStream(player.placement.entity_id) ? (
                                  <a
                                    className="flex items-center"
                                    target="blank"
                                    href={
                                      verifyStream(player.placement.entity_id)
                                        .stream.channel_url
                                    }
                                  >
                                    <span className="flex gap-2 font-medium text-purple-500 hover:font-bold">
                                      {
                                        verifyStream(player.placement.entity_id)
                                          .stream.channel_name
                                      }
                                      <div className="mb-auto gap-1 text-red-500 font-medium flex items-center">
                                        <span className="text-red-500 text-base font-bold material-symbols-outlined">
                                          person
                                        </span>
                                        {
                                          verifyStream(
                                            player.placement.entity_id
                                          ).stream.viewers
                                        }
                                      </div>
                                    </span>
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="modal-action">
              <label htmlFor="my-modal" className="btn">
                CLOSE
              </label>
            </div>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <div className="items-center align-middle justify-center"><a className="items-center align-middle justify-center" href="https://www.nestgo.online"><img className="max-w-fit h-10 w-25" alt="Logo" src="/nest_logohw2.png"/></a></div>
        <div className="bg-center items-center"><a
          className="font-bold max-w-fit"
          href="https://www.nestgo.online"
          target="blank"
          rel="noopener noreferrer"
        ><span className="text-center text">GAME ON, LEARN ON</span>
        </a>
        <a
          className="font-medium max-w-fit"
          href="https://github.com/Conrage"
          target="blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className="font-medium text-blue-500 text-center">Crazynn</span>
        </a>
                </div>
          </footer>
    </div>
  );
}
