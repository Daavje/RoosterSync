async function haalICSurlOp() {
  const res = await fetch(chrome.runtime.getURL('ics_url.txt'));
  if (!res.ok) throw new Error("Kan URL niet ophalen");
  const url = (await res.text()).trim();
  return url;
}

async function haalICSop() {
  const url = await haalICSurlOp();
  const res = await fetch(url);
  if (!res.ok) throw new Error("Kan iCal niet ophalen");
  const text = await res.text();
  return text;
}

function parseICSDatum(dt) {
  const match = dt.match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
  if (!match) return null;
  const [, y, m, d, h, min] = match.map(Number);
  return new Date(y, m - 1, d, h, min);
}

function parseICS(ics) {
  const events = [];
  const blocks = ics.split("BEGIN:VEVENT").slice(1);
  for (const block of blocks) {
    const summary = (block.match(/SUMMARY:(.+)/) || [])[1];
    const dtstart = (block.match(/DTSTART;TZID=[^:]*:(.+)/) || [])[1];
    const dtend = (block.match(/DTEND;TZID=[^:]*:(.+)/) || [])[1];
    const location = (block.match(/LOCATION:(.+)/) || [])[1];
    const description = (block.match(/DESCRIPTION:(.+)/) || [])[1]?.replace(/\\n/g, "\n") || "";

    if (summary && dtstart && dtend) {
      const start = parseICSDatum(dtstart);
      const end = parseICSDatum(dtend);
      events.push({ summary, start, end, location, description });
    }
  }
  return events;
}

function isVandaag(d) {
  const nu = new Date();
  return d.getFullYear() === nu.getFullYear() &&
         d.getMonth() === nu.getMonth() &&
         d.getDate() === nu.getDate();
}

function berekenVoortgang(start, end) {
  const nu = new Date();
  if (nu < start) return 0;
  if (nu > end) return 100;
  const totaal = end - start;
  const gedaan = nu - start;
  return Math.min(100, Math.max(0, (gedaan / totaal) * 100));
}

function formatTijd(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function toonRooster(events) {
  const vandaag = events
    .filter(e => isVandaag(e.start))
    .sort((a, b) => a.start - b.start);

  const div = document.getElementById("rooster");
  div.innerHTML = "";

  if (vandaag.length === 0) {
    div.textContent = "Geen lessen vandaag!";
    return;
  }

  const nu = new Date();

  for (let i = 0; i < vandaag.length; i++) {
    const les = vandaag[i];

    if (les.end < nu) continue;

    const voortgang = berekenVoortgang(les.start, les.end);

    const wrapper = document.createElement("div");
    wrapper.className = "les";

    const tijdOverElement = document.createElement("div");
    tijdOverElement.className = "tijd-over";
    tijdOverElement.style.marginTop = "6px";
    tijdOverElement.style.fontWeight = "bold";

    function updateTimer() {
      const now = new Date();
      if (now > les.end) {
        tijdOverElement.textContent = "Les afgelopen";
        clearInterval(timerInterval);
        wrapper.remove();
        if (div.children.length === 0) {
          div.textContent = "Geen lessen vandaag!";
        }
        return;
      }
      const diffMs = les.end - now;
      const uur = Math.floor(diffMs / (1000 * 60 * 60));
      const min = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const sec = Math.floor((diffMs % (1000 * 60)) / 1000);
      tijdOverElement.textContent = `⏳ Tijd over: ${uur}u ${min}m ${sec}s`;
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    wrapper.innerHTML = `
      <h2>${les.summary}</h2>
      <div class="tijd">⏰ ${formatTijd(les.start)} - ${formatTijd(les.end)}</div>
      <div class="locatie">📍 ${les.location || "onbekend"}</div>
      <div class="progress-container">
        <div class="progress-bar" style="width: ${voortgang}%;"></div>
      </div>
      <div class="beschrijving">${les.description || "Geen extra info."}</div>
    `;

    wrapper.appendChild(tijdOverElement);

    const beschrijving = wrapper.querySelector(".beschrijving");
    beschrijving.style.maxHeight = "0px";

    wrapper.addEventListener("click", () => {
      const isOpen = beschrijving.classList.contains("open");
      if (isOpen) {
        beschrijving.style.maxHeight = beschrijving.scrollHeight + "px";
        requestAnimationFrame(() => {
          beschrijving.style.maxHeight = "0px";
        });
        beschrijving.classList.remove("open");
      } else {
        beschrijving.style.maxHeight = "auto";
        const hoogte = beschrijving.scrollHeight + "px";
        beschrijving.style.maxHeight = "0px";
        requestAnimationFrame(() => {
          beschrijving.style.maxHeight = hoogte;
        });
        beschrijving.classList.add("open");
      }
    });

    div.appendChild(wrapper);

    if (i < vandaag.length - 1) {
      const volgende = vandaag[i + 1];
      if (volgende.start > nu) {
        const pauzeMin = Math.round((volgende.start - les.end) / 60000);
        if (pauzeMin > 0) {
          const pauze = document.createElement("div");
          pauze.className = "les pauze";
          pauze.textContent = `⏳ ${pauzeMin} min pauze`;
          div.appendChild(pauze);
        }
      }
    }
  }

  if (div.children.length === 0) {
    div.textContent = "Geen lessen vandaag!";
  }
}

haalICSop()
  .then(parseICS)
  .then(toonRooster)
  .catch(err => {
    console.error(err);
    document.getElementById("rooster").textContent = "Fout bij laden.";
  });
