// src/hooks/useFriends.js
import { useState, useEffect, useCallback, useMemo } from "react";

export function useFriends() {
  const [incoming, setIncoming]       = useState([]); // richieste in arrivo
  const [outgoing, setOutgoing]       = useState([]); // richieste inviate
  const [connections, setConnections] = useState([]);
  const [foundUser, setFoundUser]     = useState(null);
  const [searchError, setSearchError] = useState("");
  const token = localStorage.getItem("token");
  const meId  = Number(localStorage.getItem("userId"));

  const authHeaders = useMemo(() => ({
    "Authorization": `Bearer ${token}`,
    "Content-Type":  "application/json"
  }), [token]);

  // 1) fetch incoming
  const fetchIncoming = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/friends/pending", { headers: authHeaders });
      if (res.ok) setIncoming(await res.json());
    } catch (err) {
      console.error("fetchIncoming failed:", err);
    }
  }, [authHeaders]);

  // 2) fetch outgoing
  const fetchOutgoing = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/friends/outgoing", { headers: authHeaders });
      if (res.ok) setOutgoing(await res.json());
    } catch (err) {
      console.error("fetchOutgoing failed:", err);
    }
  }, [authHeaders]);

  // 3) fetch connections
  const fetchConnections = useCallback(async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/friends/connections", { headers: authHeaders });
      if (!res.ok) return;
      const frs = await res.json();
      const peers = frs.map(fr => fr.requester.id === meId ? fr.target : fr.requester);
      const unique = peers.filter((u, i) => peers.findIndex(p => p.id === u.id) === i);
      setConnections(unique);
    } catch (err) {
      console.error("fetchConnections failed:", err);
    }
  }, [authHeaders, meId]);

  // 4) search by email
  const searchByEmail = useCallback(async email => {
    setSearchError("");
    setFoundUser(null);
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/users?email=${encodeURIComponent(email)}`,
        { headers: authHeaders }
      );
      if (res.ok) {
        const user = await res.json();
        if (user.id === meId) {
          setSearchError("That's you!");
        } else {
          setFoundUser(user);
        }
      } else {
        setSearchError("User not found");
      }
    } catch {
      setSearchError("Network error");
    }
  }, [authHeaders, meId]);

  // 5) send request
  const sendRequest = useCallback(async toUserId => {
    const res = await fetch("http://localhost:8080/api/v1/friends/request", {
      method: "POST",
      headers: authHeaders,
      body: JSON.stringify({ toUserId })
    });
    if (res.ok) {
      await fetchOutgoing();
    } else {
      const err = await res.json();
      setSearchError(err.message || "Request failed");
    }
  }, [authHeaders, fetchOutgoing]);

  // 6) respond
  const respond = useCallback(async (requestId, accept) => {
    await fetch(
      `http://localhost:8080/api/v1/friends/${requestId}/respond?accept=${accept}`,
      { method: "PUT", headers: authHeaders }
    );
    await fetchIncoming();
    await fetchConnections();
  }, [authHeaders, fetchIncoming, fetchConnections]);

  // inizializza
  useEffect(() => {
    fetchIncoming();
    fetchOutgoing();
    fetchConnections();
  }, [fetchIncoming, fetchOutgoing, fetchConnections]);

  return {
    incoming,
    outgoing,
    connections,
    foundUser,
    searchError,
    searchByEmail,
    sendRequest,
    respond
  };
}
