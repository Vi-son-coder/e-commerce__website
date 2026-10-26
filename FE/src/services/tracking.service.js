import { request } from "../api/request.api";

export async function trackAction(actionType, targetId, metadata = {}) {
  try {
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId =
        "sess_" + Math.random().toString(36).substring(2, 15) + Date.now();
      localStorage.setItem("sessionId", sessionId);
    }
    request({
      reqPATH: "/api/tracking",
      method: "POST",
      data: { sessionId, actionType, targetId, metadata },
    }).catch((err) => console.log.error("Tracking error", err));
  } catch (error) {
    console.log(error);
  }
}
