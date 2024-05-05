document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);

  // UTMタグを取得する
  const utmSource = urlParams.get("utm_source");
  const utmMedium = urlParams.get("utm_medium");
  const utmCampaign = urlParams.get("utm_campaign");
  const utmTerm = urlParams.get("utm_term");
  const utmContent = urlParams.get("utm_content");

  // Cookieからsession_idを取得または新しく生成する
  const getSessionId = () => {
    const existingSessionId = document.cookie
      .split("; ")
      .find((row) => row.startsWith("session_id="));
    if (existingSessionId != null) {
      return existingSessionId.split("=")[1];
    }
    const newSessionId = crypto.randomUUID();
    document.cookie = `session_id=${newSessionId}; path=/; secure; SameSite=Strict`;
    return newSessionId;
  };

  const sessionId = getSessionId();

  const postData = async () => {
    console.log({
      utm_source: utmSource,
      utm_medium: utmMedium,
      utm_campaign: utmCampaign,
      utm_term: utmTerm,
      utm_content: utmContent,
      session_id: sessionId,
    });
    const response = await fetch(
      "https://localhost:4000/public/landing_events",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          utm_source: utmSource,
          utm_medium: utmMedium,
          utm_campaign: utmCampaign,
          utm_term: utmTerm,
          utm_content: utmContent,
          session_id: sessionId,
        }),
      }
    );

    if (!response.ok) {
      console.error("Error with POST request:", response);
    }
  };

  postData();
});
