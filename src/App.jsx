import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Quelle: Tatoeba API
 * OpenAPI: https://api.tatoeba.org/openapi.json
 */

const PREPOSITIONS = [
  "in", "an", "auf", "unter", "über", "vor", "hinter", "neben", "zwischen",
  "mit", "ohne", "für", "gegen", "bei", "nach", "von", "zu", "aus",
  "seit", "um", "durch", "bis", "gegenüber"
];

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickDistractors(correctLower, count = 5) {
  const pool = PREPOSITIONS.filter((p) => p.toLowerCase() !== correctLower);
  return shuffle(pool).slice(0, count);
}

function buildQuestionFromSentence(text) {
  // найдём ВСЕ предлоги из списка, которые реально встречаются как отдельное слово
  const matches = [];

  for (const prep of PREPOSITIONS) {
    const re = new RegExp(`\\b${escapeRegex(prep)}\\b`, "ig"); // g: собрать все
    let m;
    while ((m = re.exec(text)) !== null) {
      matches.push({
        found: m[0],                 // "In" / "in"
        foundLower: m[0].toLowerCase(),
        index: m.index,
        length: m[0].length
      });
    }
  }

  if (matches.length === 0) return null;

  // выбираем СЛУЧАЙНОЕ совпадение
  const pick = matches[Math.floor(Math.random() * matches.length)];

  const cloze =
    text.slice(0, pick.index) +
    "____" +
    text.slice(pick.index + pick.length);

  const correctLower = pick.foundLower;

  const options = shuffle([
    correctLower,
    ...pickDistractors(correctLower, 5)
  ]);

  return {
    cloze,
    correctOption: correctLower, // теперь всегда lowercase
    correctLower,
    original: text,
    options
  };
}

async function fetchSentences({ q, limit = 50, signal }) {
  const url = new URL("https://api.tatoeba.org/v1/sentences");
  url.searchParams.set("lang", "deu");
  url.searchParams.set("q", q);
  url.searchParams.set("is_unapproved", "no");
  url.searchParams.set("is_orphan", "no");
  url.searchParams.set("sort", "random");
  url.searchParams.set("word_count", "3-14");
  url.searchParams.set("limit", String(limit));

  const res = await fetch(url.toString(), { signal });
  if (!res.ok) throw new Error(`Tatoeba API Fehler: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json?.data) ? json.data : [];
}

async function fetchExampleList({ prep, excludeText, count = 3, signal }) {
  // берём больше, чтобы отфильтровать дубликаты
  const batch = await fetchSentences({ q: prep, limit: 80, signal });

  const prepRe = new RegExp(`\\b${escapeRegex(prep)}\\b`, "i");

  const uniq = [];
  const seen = new Set();

  for (const item of batch) {
    const t = item?.text;
    if (!t) continue;
    if (t === excludeText) continue;
    if (!prepRe.test(t)) continue;

    const norm = t.trim().toLowerCase();
    if (seen.has(norm)) continue;
    seen.add(norm);

    uniq.push(t.trim());
    if (uniq.length >= count) break;
  }

  return uniq;
}

// 1) Простые правила управления (B1–B2)
const PREP_RULES = {
  // Akkusativ
  für: {
    title: "für + Akkusativ",
    text: "„Für“ verlangt immer den Akkusativ."
  },
  durch: {
    title: "durch + Akkusativ",
    text: "„Durch“ steht immer mit Akkusativ."
  },
  gegen: {
    title: "gegen + Akkusativ",
    text: "„Gegen“ verlangt immer den Akkusativ."
  },
  ohne: {
    title: "ohne + Akkusativ",
    text: "„Ohne“ steht immer mit Akkusativ."
  },
  um: {
    title: "um + Akkusativ",
    text: "„Um“ verlangt immer den Akkusativ."
  },

  // Dativ
  mit: {
    title: "mit + Dativ",
    text: "„Mit“ steht immer mit Dativ."
  },
  bei: {
    title: "bei + Dativ",
    text: "„Bei“ steht mit Dativ."
  },
  nach: {
    title: "nach + Dativ",
    text: "„Nach“ verlangt den Dativ."
  },
  aus: {
    title: "aus + Dativ",
    text: "„Aus“ steht mit Dativ."
  },
  von: {
    title: "von + Dativ",
    text: "„Von“ verlangt den Dativ."
  },
  zu: {
    title: "zu + Dativ",
    text: "„Zu“ steht mit Dativ."
  },
  seit: {
    title: "seit + Dativ",
    text: "„Seit“ steht mit Dativ (Zeitangabe)."
  },
  gegenüber: {
    title: "gegenüber + Dativ",
    text: "„Gegenüber“ steht mit Dativ."
  },

  // Wechselpräpositionen — общий текст (Wo/Wohin)
  in: {
    title: "in (Wechselpräposition)",
    text: "„In“ ist eine Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ."
  },
  an: {
    title: "an (Wechselpräposition)",
    text: "„An“ ist eine Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ."
  },
  auf: {
    title: "auf (Wechselpräposition)",
    text: "„Auf“ ist eine Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ."
  },
  unter: {
    title: "unter (Wechselpräposition)",
    text: "„Unter“ ist eine Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ."
  },
  über: {
    title: "über (Wechselpräposition)",
    text: "„Über“ ist eine Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ."
  },
  vor: {
    title: "vor (Wechselpräposition)",
    text: "„Vor“ ist eine Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ."
  },
  hinter: {
    title: "hinter (Wechselpräposition)",
    text: "„Hinter“ ist eine Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ."
  },
  neben: {
    title: "neben (Wechselpräposition)",
    text: "„Neben“ ist eine Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ."
  },
  zwischen: {
    title: "zwischen (Wechselpräposition)",
    text: "„Zwischen“ ist eine Wechselpräposition: Wo? = Dativ, Wohin? = Akkusativ."
  }
};

function getGrammarHint(prepLower, originalSentence) {
  const base = PREP_RULES[prepLower];
  if (!base) return null;

  // Доп. строка с примером из текущего предложения: "... → <prep + следующий кусок>"
  // Без сложного парсинга: берём фрагмент вокруг предлога.
  const re = new RegExp(`\\b${escapeRegex(prepLower)}\\b`, "i");
  const m = originalSentence.match(re);

  let exampleLine = null;
  if (m) {
    const idx = m.index ?? -1;
    if (idx >= 0) {
      const after = originalSentence.slice(idx).split(/[,.!?]/)[0].trim();
      // ограничим длину, чтобы не было полотна
      const short = after.length > 60 ? after.slice(0, 57) + "…" : after;
      exampleLine = `→ ${short}`;
    }
  }

  return {
    title: base.title,
    text: base.text,
    exampleLine
  };
}

export default function App() {
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [error, setError] = useState("");
  const [question, setQuestion] = useState(null);

  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const [examplesStatus, setExamplesStatus] = useState("idle"); // idle | loading | ready | error
  const [examples, setExamples] = useState([]);

  const [score, setScore] = useState({ richtig: 0, gesamt: 0 });

  const [hint, setHint] = useState(null); // {title, text, exampleLine} | null

  const lastPrepRef = useRef(null);

  const queueRef = useRef([]);
  const abortRef = useRef(null);

  const scoreText = useMemo(
    () => `${score.richtig} / ${score.gesamt}`,
    [score]
  );

  async function fillQueueIfNeeded() {
    if (queueRef.current.length >= 6) return;

    // случайный предлог как поисковый токен — так мы чаще получаем предложения с предлогами
    // широкий токен: частое слово, чтобы получать много разных предложений
    const broadTokens = ["ich", "du", "er", "sie", "wir", "nicht", "und", "ein", "ist"];
    const token = broadTokens[Math.floor(Math.random() * broadTokens.length)];

    abortRef.current?.abort?.();
    abortRef.current = new AbortController();

    const batch = await fetchSentences({
      q: token,
      limit: 80,
      signal: abortRef.current.signal
    });

    const built = batch
      .map((x) => x?.text)
      .filter(Boolean)
      .map(buildQuestionFromSentence)
      .filter(Boolean);

    queueRef.current = queueRef.current.concat(shuffle(built));
  }

  async function loadNextQuestion() {
    setStatus("loading");
    setError("");
    setSelected(null);
    setIsCorrect(null);
    setExamples([]);
    setExamplesStatus("idle");
    setHint(null);

    try {
      // подкачать очередь (важно: fillQueueIfNeeded должен делать "широкий" поиск, не по предлогу)
      await fillQueueIfNeeded();

      let next = null;
      const last = lastPrepRef.current; // useRef(null) где-то сверху

      // 1) Сначала пытаемся взять вопрос с ДРУГИМ предлогом, чтобы не было полос "gegen gegen gegen..."
      if (last) {
        const idx = queueRef.current.findIndex((q) => q?.correctLower && q.correctLower !== last);
        if (idx >= 0) {
          next = queueRef.current.splice(idx, 1)[0];
        }
      }

      // 2) Если не нашли — берём первый как есть
      if (!next) {
        next = queueRef.current.shift() || null;
      }

      if (!next) {
        setStatus("error");
        setError("Keine passenden Sätze gefunden. Bitte erneut versuchen.");
        return;
      }

      // запоминаем предлог текущего вопроса для следующего анти-повтора
      lastPrepRef.current = next.correctLower;

      setQuestion(next);
      setStatus("ready");
    } catch (e) {
      if (e?.name === "AbortError") return;
      setStatus("error");
      setError(e?.message || "Unbekannter Fehler");
    }
  }

  useEffect(() => {
    loadNextQuestion();
    return () => abortRef.current?.abort?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadExamplesForPrep(prep, excludeText) {
    setExamplesStatus("loading");
    setExamples([]);

    try {
      // отдельный abort не обязателен, но аккуратнее так:
      const controller = new AbortController();
      const list = await fetchExampleList({
        prep,
        excludeText,
        count: 4,
        signal: controller.signal
      });
      setExamples(list);
      setExamplesStatus("ready");
    } catch (e) {
      setExamplesStatus("error");
    }
  }

  function answer(option) {
    if (status !== "ready" || !question || selected) return;

    setSelected(option);

    const ok =
      option.toLowerCase() === question.correctOption.toLowerCase();
    setIsCorrect(ok);
    setScore((s) => ({
      richtig: s.richtig + (ok ? 1 : 0),
      gesamt: s.gesamt + 1
    }));

    loadExamplesForPrep(question.correctLower, question.original);
    setHint(getGrammarHint(question.correctLower, question.original));
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.header}>
          <div>
            <div style={styles.title}>Präpositionen-Trainer</div>
            <div style={styles.subtitle}>Wähle die richtige Präposition (6 Optionen)</div>
          </div>
          <div style={styles.score}>Punktestand: {scoreText}</div>
        </div>

        {status === "loading" && (
          <div style={styles.info}>Satz wird geladen…</div>
        )}

        {status === "error" && (
          <div style={styles.errorBox}>
            <div style={{ fontWeight: 800, marginBottom: 6 }}>Fehler</div>
            <div style={{ marginBottom: 12 }}>{error}</div>
            <button style={styles.btnPrimary} onClick={loadNextQuestion}>
              Erneut versuchen
            </button>
          </div>
        )}

        {status === "ready" && question && (
          <>
            <div style={styles.sentence}>{question.cloze}</div>

            <div style={styles.grid}>
              {question.options.map((opt) => {
                const picked = selected === opt;
                const correct = opt === question.correctOption;

                let btnStyle = styles.optionBtn;
                if (selected) {
                  if (picked && correct) btnStyle = { ...btnStyle, ...styles.ok };
                  else if (picked && !correct) btnStyle = { ...btnStyle, ...styles.bad };
                  else if (!picked && correct) btnStyle = { ...btnStyle, ...styles.hint };
                  else btnStyle = { ...btnStyle, opacity: 0.75 };
                }

                return (
                  <button
                    key={opt}
                    style={btnStyle}
                    onClick={() => answer(opt)}
                    disabled={!!selected}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div style={styles.footer}>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  style={styles.btnNext}
                  onClick={loadNextQuestion}
                  disabled={status === "loading"}
                >
                  Nächster Satz
                </button>

                <button
                  style={styles.btnGhost}
                  onClick={() => {
                    // подсказка: показать правильный вариант
                    if (!selected) {
                      setSelected("__dummy__"); // чтобы включить подсветку
                      setIsCorrect(false);
                      setScore((s) => ({ ...s, gesamt: s.gesamt + 1 }));
                    }
                  }}
                  disabled={!!selected}
                  title="Zeigt die richtige Lösung durch Markierung an"
                >
                  Lösung zeigen
                </button>
              </div>

              <div style={styles.feedback}>
                {selected && (
                  isCorrect ? (
                    <span style={{ ...styles.tag, ...styles.tagOk }}>
                      ✓ Richtig!
                    </span>
                  ) : (
                    <span style={{ ...styles.tag, ...styles.tagBad }}>
                      ✗ Falsch — richtig ist: {question.correctOption}
                    </span>
                  )
                )}
              </div>
            </div>

            {selected && hint && (
              <div style={styles.hintBox}>
                <div style={styles.hintTitle}>🧠 Grammatik-Hinweis</div>
                <div style={styles.hintLine}><b>{hint.title}</b></div>
                <div style={styles.hintLine}>{hint.text}</div>
                {/* {hint.exampleLine && <div style={styles.hintExample}>{hint.exampleLine}</div>} */}
              </div>
            )}

            {/* Примеры (только если ответ правильный) */}
            {selected && (
              <div style={styles.examplesBox}>
                <div style={styles.examplesTitle}>
                  Weitere Beispiele mit <b>{question.correctLower}</b>:
                </div>

                {examplesStatus === "loading" && (
                  <div style={styles.examplesInfo}>Beispiele werden geladen…</div>
                )}

                {examplesStatus === "error" && (
                  <div style={styles.examplesInfo}>
                    Beispiele konnten nicht geladen werden.
                  </div>
                )}

                {examplesStatus === "ready" && (
                  <ul style={styles.examplesList}>
                    {examples.length === 0 ? (
                      <li>Keine zusätzlichen Beispiele gefunden.</li>
                    ) : (
                      examples.map((t) => <li key={t}>{t}</li>)
                    )}
                  </ul>
                )}
              </div>
            )}

            <details style={styles.details}>
              <summary>Originalsatz anzeigen</summary>
              <div style={styles.original}>{question.original}</div>
            </details>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "grid",
    placeItems: "start",
    padding: 16,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
    background: "#f6f7fb",
    color: "#0f172a"  
  },
  card: {
    width: "min(920px, 100%)",
    background: "white",
    borderRadius: 16,
    padding: 18,
    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
    color: "#0f172a"   
  },
  header: {
    display: "flex",
    gap: 12,
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14
  },
  title: { fontSize: 20, fontWeight: 900, lineHeight: 1.1 },
  subtitle: { fontSize: 13, opacity: 0.75, marginTop: 4 },
  score: {
    fontSize: 13,
    fontWeight: 800,
    background: "#f0f2ff",
    padding: "8px 10px",
    borderRadius: 12,
    color: "#0f172a"   
  },
  info: { padding: 14, borderRadius: 12, background: "#f7f7f7" },
  sentence: {
    fontSize: 22,
    fontWeight: 800,
    padding: 14,
    borderRadius: 12,
    background: "#fafafa",
    border: "1px solid #eee",
    marginBottom: 14,
    wordBreak: "break-word"
  },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 10 },
  optionBtn: {
    border: "1px solid #e6e6e6",
    background: "white",
    borderRadius: 12,
    padding: "12px 10px",
    fontSize: 16,
    fontWeight: 800,
    cursor: "pointer",
    color: "#0f172a"   
  },
  ok: { borderColor: "#34c759", background: "#eafff1" },
  bad: { borderColor: "#ff3b30", background: "#fff0ef" },
  hint: { borderColor: "#1f7aff", background: "#eef4ff" },
  footer: {
    marginTop: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10
  },
  btnPrimary: {
    border: "none",
    borderRadius: 12,
    padding: "10px 12px",
    fontWeight: 900,
    cursor: "pointer",
    background: "#1f7aff",
    color: "white"
  },
  btnGhost: {
    border: "1px solid #ddd",
    borderRadius: 12,
    padding: "10px 12px",
    fontWeight: 900,
    cursor: "pointer",
    background: "white",
    color: "#0f172a"   
  },
  btnNext: {
    border: "2px solid rgb(221, 221, 221)",
    borderRadius: "12px",
    padding: "10px 12px",
    fontWeight: "900",
    cursor: "pointer",
    background: "rgb(47 102 131)",
    color: "white",
    fontSize: "20px",
  },
  feedback: { minHeight: 28, display: "flex", alignItems: "center" },
  tag: { padding: "6px 10px", borderRadius: 999, fontWeight: 900, fontSize: 13 },
  tagOk: { background: "#eafff1", border: "1px solid #34c759" },
  tagBad: { background: "#fff0ef", border: "1px solid #ff3b30" },

  examplesBox: {
    marginTop: 14,
    padding: 14,
    borderRadius: 12,
    background: "#fff8e6",
    border: "1px solid #ffe2a8"
  },
  examplesTitle: { fontWeight: 900, marginBottom: 8 },
  examplesInfo: { opacity: 0.85 },
  examplesList: { margin: 0, paddingLeft: 18 },

  details: { marginTop: 12, opacity: 0.92 },
  original: { marginTop: 8, padding: 12, borderRadius: 12, background: "#fafafa", border: "1px solid #eee" },
  errorBox: { padding: 14, borderRadius: 12, border: "1px solid #ff3b30", background: "#fff0ef" },

  hintBox: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    background: "#eef4ff",
    border: "1px solid #cfe0ff"
  },
  hintTitle: {
    fontWeight: 900,
    marginBottom: 6
  },
  hintLine: {
    lineHeight: 1.35,
    marginTop: 2
  },
  hintExample: {
    marginTop: 8,
    fontWeight: 800,
    opacity: 0.9
  },
};