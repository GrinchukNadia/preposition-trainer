import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/** =========================
 *  Types
 *  ========================= */

type Gender = "m" | "f" | "n" | "pl";
type Case = "NOM" | "AKK" | "DAT" | "GEN";

type NounHint = {
  lemma: string;
  gender: Gender;
  plural?: string;
  translationRu?: string;
};

type Gap =
  | {
    id: string;
    kind: "preposition";
    correct: string;
    options: [string, string, string, string];
    ruleHint?: string;
  }
  | {
    id: string;
    kind: "articleCase";
    correct: string;
    options: [string, string, string, string];
    targetNoun: NounHint;
    requiredCase: Case;
    requiredGender: Gender;
  }
  | {
    id: string;
    kind: "verb";
    correct: string;
    options: [string, string, string, string];
  };

export type NvvExercise = {
  id: string;
  level?: "B1" | "B2" | "C1";
  grammarLabel: string;
  meaningRu?: string;
  template: string;
  gaps: Gap[];
  solution: string;
  grammarHint?: string;
};

/** =========================
 *  Helpers
 *  ========================= */

function shuffle<T>(arr: T[], rnd: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildNounTooltip(n: NounHint) {
  if (n.gender === "pl") {
    return n.plural ? `Plural: ${n.plural}` : "Plural";
  }
  if (n.gender === "m") return `der ${n.lemma}`;
  if (n.gender === "f") return `die ${n.lemma}`;
  if (n.gender === "n") return `das ${n.lemma}`;
  return "";
}

type Token =
  | { type: "text"; value: string }
  | { type: "gap"; gapId: string }
  | { type: "noun"; gapId: string };

function tokenizeTemplate(template: string): Token[] {
  const tokens: Token[] = [];
  const re = /\{(noun:)?([a-zA-Z0-9_-]+)\}/g;

  let last = 0;
  let m: RegExpExecArray | null;

  while ((m = re.exec(template)) !== null) {
    const idx = m.index;
    const full = m[0];
    const isNoun = Boolean(m[1]);
    const id = m[2];

    if (idx > last) tokens.push({ type: "text", value: template.slice(last, idx) });
    tokens.push(isNoun ? { type: "noun", gapId: id } : { type: "gap", gapId: id });

    last = idx + full.length;
  }

  if (last < template.length) tokens.push({ type: "text", value: template.slice(last) });
  return tokens;
}

function isCorrect(selected: string | null, gap: Gap) {
  if (!selected) return null;
  return selected === gap.correct;
}

/** =========================
 *  Component
 *  ========================= */

type Props = {
  exercises: NvvExercise[];
  initialIndex?: number;
  /** если true — кнопка "Nächste" выбирает случайное упражнение (без повтора подряд) */
  randomExercise?: boolean;
};

export default function NomenVerb({
  exercises,
  initialIndex = 0,
  randomExercise = false,
}: Props) {
  const [index, setIndex] = useState(initialIndex);
  const ex = exercises[index];

  const [answers, setAnswers] = useState<Record<string, string | null>>({});

  // фиксируем перемешивание вариантов на одно упражнение (чтобы не прыгало при кликах)
  const shuffledOptionsByGapId = useMemo(() => {
    const map = new Map<string, string[]>();
    ex.gaps.forEach((g) => map.set(g.id, shuffle(g.options)));
    return map;
  }, [ex.id]);

  const tokens = useMemo(() => tokenizeTemplate(ex.template), [ex.template]);

  const gapsById = useMemo(() => {
    const map = new Map<string, Gap>();
    ex.gaps.forEach((g) => map.set(g.id, g));
    return map;
  }, [ex.gaps]);

  const activeGapId = useMemo(() => {
    for (const g of ex.gaps) {
      if (!answers[g.id]) return g.id;
    }
    return null;
  }, [ex.gaps, answers]);

  const activeGap = activeGapId ? gapsById.get(activeGapId) : null;

  const allAnswered = useMemo(
    () => ex.gaps.every((g) => Boolean(answers[g.id])),
    [ex.gaps, answers]
  );

  const allCorrect = useMemo(() => {
    if (!allAnswered) return false;
    return ex.gaps.every((g) => answers[g.id] === g.correct);
  }, [allAnswered, ex.gaps, answers]);

  function selectOption(gapId: string, option: string) {
    setAnswers((prev) => ({ ...prev, [gapId]: option }));
  }

  function resetExercise() {
    setAnswers({});
  }

  function nextExercise() {
    setAnswers({});

    if (!randomExercise) {
      setIndex((i) => (i + 1 < exercises.length ? i + 1 : 0));
      return;
    }

    setIndex((prev) => {
      if (exercises.length <= 1) return prev;
      let next = prev;
      while (next === prev) next = Math.floor(Math.random() * exercises.length);
      return next;
    });
  }

  function renderSentence() {
    return (
      <div style={styles.sentence}>
        {tokens.map((t, i) => {
          if (t.type === "text") return <span key={i}>{t.value}</span>;

          if (t.type === "gap") {
            const gap = gapsById.get(t.gapId);
            if (!gap) {
              return (
                <span key={i} style={styles.missingToken}>
                  {`{${t.gapId}}`}
                </span>
              );
            }

            const chosen = answers[gap.id] ?? null;
            const correctness = isCorrect(chosen, gap);

            const style =
              correctness === null
                ? styles.gap
                : correctness
                  ? { ...styles.gap, ...styles.gapCorrect }
                  : { ...styles.gap, ...styles.gapWrong };

            return (
              <span key={i} style={style}>
                {chosen ?? "____"}
              </span>
            );
          }

          // noun anchor
          const gap = gapsById.get(t.gapId);
          if (!gap || gap.kind !== "articleCase") {
            return (
              <span key={i} style={styles.missingToken}>
                {`{noun:${t.gapId}}`}
              </span>
            );
          }

          const noun = gap.targetNoun;
          return (
            <span key={i} style={styles.noun} title={buildNounTooltip(noun)}>
              {noun.lemma}
            </span>
          );
        })}
      </div>
    );
  }

  const activeOptions = useMemo(() => {
    if (!activeGap) return [];
    return shuffledOptionsByGapId.get(activeGap.id) ?? activeGap.options;
  }, [activeGap, shuffledOptionsByGapId]);

  const navigate = useNavigate();

  return (
    <div style={styles.wrap}>
      <div style={styles.header}>
        <div>
          Nomen-Verb-Verbindungen
        </div>
        <div style={styles.backButton} onClick={() => navigate("/preposition-trainer/")}>
          ← Zurück
        </div>
      </div>

      {renderSentence()}

      <div style={styles.optionsBox}>
        {activeGap ? (
          <div style={styles.optionsGrid}>
            {activeOptions.map((opt) => {
              const picked = answers[activeGap.id] === opt;
              return (
                <button
                  key={opt}
                  style={{ ...styles.optionBtn, ...(picked ? styles.optionBtnPicked : null) }}
                  onClick={() => selectOption(activeGap.id, opt)}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <>
            <div style={styles.optionsTitle}>
              Fertig: {allCorrect ? "✅ alles ist richtig" : "❌ es gibt Fehler"}
            </div>

            <div style={styles.footerRow}>
              <button style={styles.secondaryBtn} onClick={resetExercise}>
                Wiederholen
              </button>
              <button style={styles.primaryBtn} onClick={nextExercise}>
                Nächste
              </button>
            </div>

            {(ex.grammarHint || ex.solution) && (
              <div style={styles.afterHint}>
                {ex.grammarHint && <div style={styles.afterHintLine}>💡 {ex.grammarHint}</div>}
                <div style={styles.afterHintLine}>✅ {ex.solution}</div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/** =========================
 *  Styles (простые inline)
 *  ========================= */

const styles: Record<string, React.CSSProperties> = {
  wrap: {
    maxWidth: 900,
    margin: "0 auto",
    padding: 16,
    fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
  },
  header: {
    marginBottom: 12,
    fontSize: "24px",
    fontWeight: "bold"
  },
  backButton: {
    cursor: "pointer",
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 10,
    alignSelf: "flex-start"
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 700,
  },
  badge: {
    fontSize: 12,
    padding: "2px 8px",
    borderRadius: 999,
    border: "1px solid #ddd",
  },
  sub: {
    marginTop: 6,
    fontSize: 14,
    opacity: 0.85,
  },
  sentence: {
    fontSize: 20,
    lineHeight: 1.5,
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 12,
    background: "#fafafa",
  },
  gap: {
    display: "inline-block",
    minWidth: 54,
    textAlign: "center",
    padding: "2px 8px",
    margin: "0 2px",
    borderRadius: 10,
    border: "1px dashed #bbb",
    background: "#fff",
    fontWeight: 700,
  },
  gapCorrect: {
    border: "1px solid #2e7d32",
    background: "#e8f5e9",
  },
  gapWrong: {
    border: "1px solid #c62828",
    background: "#ffebee",
  },
  noun: {
    display: "inline-block",
    padding: "0 4px",
    borderBottom: "1px dotted #666",
    cursor: "help",
    fontWeight: 600,
  },
  missingToken: {
    color: "#c62828",
    fontWeight: 700,
  },
  optionsBox: {
    marginTop: 14,
    padding: 12,
    border: "1px solid #eee",
    borderRadius: 12,
  },
  optionsTitle: {
    fontSize: 14,
    marginBottom: 10,
  },
  hintInline: {
    marginLeft: 8,
    fontSize: 12,
    opacity: 0.85,
  },
  optionsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 10,
  },
  optionBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#fff",
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
  },
  optionBtnPicked: {
    border: "1px solid #333",
  },
  footerRow: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },
  primaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #333",
    background: "#333",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    flex: 1,
  },
  secondaryBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid #ddd",
    background: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    flex: 1,
  },
  afterHint: {
    marginTop: 12,
    paddingTop: 10,
    borderTop: "1px solid #eee",
    fontSize: 14,
    lineHeight: 1.5,
  },
  afterHintLine: {
    marginTop: 6,
  },
};

