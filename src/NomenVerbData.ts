import { NvvExercise } from "./NomenVerb";

export const exercises: NvvExercise[] = [
  {
    id: "nvv_in_acht_nehmen_vor",
    grammarLabel: "sich in Acht nehmen vor (+Dat.)",

    template:
      "{p1} ihr muss man sich {p2} Acht {v1}, sie ist verrückt.",

    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "Vor",
        options: ["Vor", "Mit", "Bei", "Von"],
        ruleHint: "vor (+Dat.)",
      },
      {
        id: "p2",
        kind: "preposition",
        correct: "in",
        options: ["in", "an", "bei", "mit"],
        ruleHint: "in Acht nehmen",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "nehmen",
        options: ["nehmen", "machen", "halten", "bringen"],
      },
    ],

    solution:
      "Vor ihr muss man sich in Acht nehmen, sie ist verrückt.",

    grammarHint:
      "sich in Acht nehmen vor (+Dat.) → aufpassen, vorsichtig sein.",
  },
  {
    id: "nvv_abschied_nehmen_von",
    grammarLabel: "Abschied nehmen von (+Dat.)",

    template: "Am späten Abend haben wir Abschied {p1} den Gästen {v1}.",

    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "von",
        options: ["von", "vor", "an", "bei"],
        ruleHint: "von (+Dat.)",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "genommen",
        options: ["genommen", "gemacht", "gegeben", "gestellt"],
      },
    ],

    solution: "Am späten Abend haben wir Abschied von den Gästen genommen.",

    grammarHint: "Abschied nehmen von (+Dat.) → sich verabschieden.",
  },
  {
    id: "nvv_zum_abschluss_kommen",
    grammarLabel: "zum Abschluss kommen",

    template: "Die Verträge sind {p1} Abschluss {v1}.",

    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "zum",
        options: ["zum", "am", "im", "beim"],
        ruleHint: "zu + dem = zum",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "gekommen",
        options: ["gekommen", "gegangen", "gebracht", "geblieben"],
      },
    ],

    solution: "Die Verträge sind zum Abschluss gekommen.",

    grammarHint: "zum Abschluss kommen → etwas beenden / fertigstellen.",
  },
  {
    id: "nvv_die_absicht_haben",
    grammarLabel: "die Absicht haben",

    template: "Ich {v1} die Absicht, bald die Prüfung zu machen.",

    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "habe",
        options: ["habe", "bin", "mache", "nehme"],
      },
    ],

    solution: "Ich habe die Absicht, bald die Prüfung zu machen.",

    grammarHint: "die Absicht haben → beabsichtigen / wollen.",
  },
  {
    id: "nvv_abstriche_machen_bei_dat",
    grammarLabel: "Abstriche machen bei (+Dat.)",

    template:
      "Wegen der vielen Arbeit muss ich Abstriche {p1} privaten Verabredungen {v1}.",

    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "bei",
        options: ["bei", "mit", "an", "für"],
        ruleHint: "bei (+Dat.)",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "machen",
        options: ["machen", "nehmen", "halten", "bringen"],
      },
    ],

    solution:
      "Wegen der vielen Arbeit muss ich Abstriche bei privaten Verabredungen machen.",

    grammarHint:
      "Abstriche machen bei (+Dat.) → teilweise verzichten.",
  },
  // 6) Ahnung haben von (+Dat.)
  {
    id: "nvv_ahnung_haben",
    grammarLabel: "Ahnung haben von (+Dat.)",
    template: "Ich habe {x1} keine Ahnung.",
    gaps: [
      {
        id: "x1",
        kind: "preposition",
        correct: "davon",
        options: ["davon", "davor", "damit", "darüber"],
        ruleHint: "von (+Dat.) → davon",
      },
    ],
    solution: "Ich habe davon keine Ahnung.",
    grammarHint: "Ahnung haben von (+Dat.) → wissen / sich auskennen.",
  },

  // 7) eine Änderung vornehmen an (+Dat.)
  {
    id: "nvv_aenderung_vornehmen",
    grammarLabel: "eine Änderung vornehmen an (+Dat.)",
    template: "Jeder kann Änderungen {p1} seinem Passwort selbst {v1}.",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "an",
        options: ["an", "bei", "mit", "für"],
        ruleHint: "an (+Dat.)",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "vornehmen",
        options: ["vornehmen", "annehmen", "aufnehmen", "mitnehmen"],
      },
    ],
    solution: "Jeder kann Änderungen an seinem Passwort selbst vornehmen.",
    grammarHint: "eine Änderung vornehmen an (+Dat.) → ändern.",
  },

  // 8) Anerkennung finden / erfahren / verdienen
  {
    id: "nvv_anerkennung_finden",
    grammarLabel: "Anerkennung finden / erfahren / verdienen",
    template: "Ihr Engagement wird sicher viel Anerkennung {v1}.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "finden",
        options: ["finden", "machen", "nehmen", "bringen"],
      },
    ],
    solution: "Ihr Engagement wird sicher viel Anerkennung finden.",
    grammarHint: "Anerkennung finden → anerkannt werden.",
  },

  // 9) den Anfang machen
  {
    id: "nvv_anfang_machen",
    grammarLabel: "den Anfang machen",
    template: "Wollen Sie den Anfang {v1}?",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "machen",
        options: ["machen", "nehmen", "bringen", "halten"],
      },
    ],
    solution: "Wollen Sie den Anfang machen?",
    grammarHint: "den Anfang machen → anfangen.",
  },

  // 10) ein Angebot machen / unterbreiten
  {
    id: "nvv_angebot_machen",
    grammarLabel: "ein Angebot machen / unterbreiten",
    template: "Die Firma hat mir ein tolles Angebot {v1}.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "gemacht",
        options: ["gemacht", "genommen", "gegeben", "gebracht"],
      },
    ],
    solution: "Die Firma hat mir ein tolles Angebot gemacht.",
    grammarHint: "ein Angebot machen / unterbreiten → etw. anbieten.",
  },

  // 11) etw. in Angriff nehmen
  {
    id: "nvv_in_angriff_nehmen",
    grammarLabel: "etw. in Angriff nehmen",
    template: "Wir haben die Renovierung unserer Wohnung endlich {p1} Angriff {v1}.",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "in",
        options: ["in", "an", "bei", "für"],
        ruleHint: "in Angriff nehmen",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "genommen",
        options: ["genommen", "gemacht", "gebracht", "gestellt"],
      },
    ],
    solution: "Wir haben die Renovierung unserer Wohnung endlich in Angriff genommen.",
    grammarHint: "etw. in Angriff nehmen → beginnen / anfangen.",
  },

  // 12) Anklage erheben gegen (+Akk.)
  {
    id: "nvv_anklage_erheben_gegen",
    grammarLabel: "Anklage erheben gegen (+Akk.)",
    template: "Der Staatsanwalt {v1} Anklage {p1} die Verdächtigen.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "erhebt",
        options: ["erhebt", "nimmt", "macht", "stellt"],
      },
      {
        id: "p1",
        kind: "preposition",
        correct: "gegen",
        options: ["gegen", "bei", "mit", "von"],
        ruleHint: "gegen (+Akk.)",
      },
    ],
    solution: "Der Staatsanwalt erhebt Anklage gegen die Verdächtigen.",
    grammarHint: "Anklage erheben gegen (+Akk.) → jdn. anklagen.",
  },

  // 13) einer Ansicht / der Meinung / der Überzeugung sein
  {
    id: "nvv_der_ansicht_sein",
    grammarLabel: "einer Ansicht / der Meinung / der Überzeugung sein",
    template: "Ich {v1} der Ansicht, dass man mehr {p1} die Armut {v2} muss.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "bin",
        options: ["bin", "bist", "ist", "sind"],
      },
      {
        id: "p1",
        kind: "preposition",
        correct: "gegen",
        options: ["gegen", "bei", "mit", "von"],
        ruleHint: "gegen (+Akk.)",
      },
      {
        id: "v2",
        kind: "verb",
        correct: "tun",
        options: ["tun", "machen", "nehmen", "bringen"],
      },
    ],
    solution: "Ich bin der Ansicht, dass man mehr gegen die Armut tun muss.",
    grammarHint: "einer Ansicht / der Meinung / der Überzeugung sein → meinen.",
  },

  // 14) in Anspruch nehmen
  {
    id: "nvv_in_anspruch_nehmen",
    grammarLabel: "in Anspruch nehmen",
    template: "Das hat alles sehr viel Zeit {p1} Anspruch {v1}.",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "in",
        options: ["in", "an", "bei", "für"],
        ruleHint: "in Anspruch nehmen",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "genommen",
        options: ["genommen", "gemacht", "gebracht", "gestellt"],
      },
    ],
    solution: "Das hat alles sehr viel Zeit in Anspruch genommen.",
    grammarHint: "in Anspruch nehmen → (be)nutzen, beanspruchen.",
  },

  // 15) Anteil nehmen an (+Dat.)
  {
    id: "nvv_anteil_nehmen_an",
    grammarLabel: "Anteil nehmen an (+Dat.)",
    template: "Ich {v1} Anteil {p1} dem Schicksal der betroffenen Personen.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "nehme",
        options: ["nehme", "mache", "habe", "gebe"],
      },
      {
        id: "p1",
        kind: "preposition",
        correct: "an",
        options: ["an", "bei", "für", "von"],
        ruleHint: "an (+Dat.)",
      },
    ],
    solution: "Ich nehme Anteil an dem Schicksal der betroffenen Personen.",
    grammarHint: "Anteil nehmen an (+Dat.) → mitfühlen.",
  },
  // 1) einen Antrag stellen auf (+Akk.)
  {
    id: "nvv_antrag_stellen_auf",
    grammarLabel: "einen Antrag stellen auf (+Akk.)",
    template: "Familie Müller hat einen Antrag {p1} finanzielle Unterstützung {v1}.",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "auf",
        options: ["auf", "an", "bei", "für"],
        ruleHint: "auf (+Akk.)",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "gestellt",
        options: ["gestellt", "gemacht", "gegeben", "gebracht"],
      },
    ],
    solution: "Familie Müller hat einen Antrag auf finanzielle Unterstützung gestellt.",
    grammarHint: "einen Antrag stellen auf (+Akk.) → beantragen.",
  },

  // 2) eine Antwort geben auf (+Akk.)
  {
    id: "nvv_antwort_geben_auf",
    grammarLabel: "eine Antwort geben auf (+Akk.)",
    template: "Bisher hat er mir noch keine Antwort {p1} meine Frage {v1}.",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "auf",
        options: ["auf", "an", "bei", "für"],
        ruleHint: "auf (+Akk.)",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "gegeben",
        options: ["gegeben", "gemacht", "gestellt", "gebracht"],
      },
    ],
    solution: "Bisher hat er mir noch keine Antwort auf meine Frage gegeben.",
    grammarHint: "eine Antwort geben auf (+Akk.) → antworten.",
  },

  // 3) zur Anwendung kommen
  {
    id: "nvv_zur_anwendung_kommen",
    grammarLabel: "zur Anwendung kommen",
    template: "Bei einem Urteil kommen meist verschiedene Gesetze {p1} Anwendung {v1}.",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "zur",
        options: ["zur", "zum", "im", "am"],
        ruleHint: "zur Anwendung kommen"
      },
      {
        id: "v1",
        kind: "verb",
        correct: "kommen",
        options: ["kommen", "gehen", "stehen", "fallen"],
      },
    ],
    solution: "Bei einem Urteil kommen meist verschiedene Gesetze zur Anwendung.",
    grammarHint: "zur Anwendung kommen → angewendet werden.",
  },

  // 4) Anzeige erstatten
  {
    id: "nvv_anzeige_erstatten",
    grammarLabel: "Anzeige erstatten",
    template: "Ich möchte wegen des Unfalls eine Anzeige {v1}.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "erstatten",
        options: ["erstatten", "erheben", "erteilen", "erklären"],
      },
    ],
    solution: "Ich möchte wegen des Unfalls eine Anzeige erstatten.",
    grammarHint: "Anzeige erstatten → jdn. anzeigen.",
  },

  // 5) jdm. unter die Arme greifen
  {
    id: "nvv_unter_die_arme_greifen",
    grammarLabel: "jdm. unter die Arme greifen",
    template: "Als mein Bruder studierte, habe ich ihm finanziell ab und zu {p1} die Arme {v1}.",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "unter",
        options: ["unter", "über", "vor", "mit"],
        ruleHint: "unter Aufsicht stehen"
      },
      {
        id: "v1",
        kind: "verb",
        correct: "gegriffen",
        options: ["gegriffen", "gegeben", "gemacht", "gebracht"],
      },
    ],
    solution: "Als mein Bruder studierte habe ich ihm finanziell ab und zu unter die Arme gegriffen.",
    grammarHint: "jdm. unter die Arme greifen → jdm. helfen.",
  },

  // 6) sich etw. zur Aufgabe machen
  {
    id: "nvv_zur_aufgabe_machen",
    grammarLabel: "sich etw. zur Aufgabe machen",
    template: "Ich habe es mir {p1} Aufgabe {v1}, den Kontakt zu unseren Nachbarn zu verbessern.",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "zur",
        options: ["zur", "zum", "im", "am"],
      },
      {
        id: "v1",
        kind: "verb",
        correct: "gemacht",
        options: ["gemacht", "genommen", "gestellt", "gebracht"],
      },
    ],
    solution: "Ich habe es mir zur Aufgabe gemacht, den Kontakt zu unseren Nachbarn zu verbessern.",
    grammarHint: "sich etw. zur Aufgabe machen →  aktiv sein für etw. / sich für etw. einsetzen.",
  },

  // 7) jdm. / etw. Aufmerksamkeit schenken
  {
    id: "nvv_aufmerksamkeit_schenken",
    grammarLabel: "jdm. / etw. Aufmerksamkeit schenken",
    template: "Eltern {v1} ihren Kindern viel Aufmerksamkeit.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "schenken",
        options: ["schenken", "geben", "machen", "bringen"],
      },
    ],
    solution: "Eltern schenken ihren Kindern viel Aufmerksamkeit.",
    grammarHint: "jdm./ etw. Aufmerksamkeit schenken → beachtet werden.",
  },

  // 8) einen Auftrag erteilen
  {
    id: "nvv_auftrag_erteilen",
    grammarLabel: "einen Auftrag erteilen",
    template: "Hat die Firma den Auftrag schon {v1}?",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "erteilt",
        options: ["erteilt", "erstattet", "erhoben", "erstellt"],
      },
    ],
    solution: "Hat die Firma den Auftrag schon erteilt?",
    grammarHint: "einen Auftrag erteilen → beauftragen.",
  },

  // 9) etw. in Auftrag geben
  {
    id: "nvv_in_auftrag_geben",
    grammarLabel: "etw. in Auftrag geben",
    template: "Hat die Firma die Maschine schon {p1} Auftrag {v1}?",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "in",
        options: ["in", "an", "bei", "für"],
        ruleHint: "in Auftrag geben",
      },
      {
        id: "v1",
        kind: "verb",
        correct: "gegeben",
        options: ["gegeben", "gemacht", "gestellt", "gebracht"],
      },
    ],
    solution: "Hat die Firma die Maschine schon in Auftrag gegeben?",
    grammarHint: "etw. in Auftrag geben → etw. beauftragen.",
  },

  // 10) unter Aufsicht stehen
  {
    id: "nvv_unter_aufsicht_stehen",
    grammarLabel: "unter Aufsicht stehen",
    template: "Die Produktion {v1} {p1} Aufsicht des Qualitäts-Teams.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "steht",
        options: ["steht", "geht", "kommt", "fällt"],
      },
      {
        id: "p1",
        kind: "preposition",
        correct: "unter",
        options: ["unter", "über", "vor", "mit"],
        ruleHint: "unter Aufsicht stehen"
      }
    ],
    solution: "Die Produktion steht unter Aufsicht des Qualitäts-Teams.",
    grammarHint: "unter Aufsicht stehen → kontrolliert werden.",
  },

  // 11) im Auge behalten
  {
    id: "nvv_im_auge_behalten",
    grammarLabel: "im Auge behalten",
    template: "Wir müssen die wirtschaftlichen Entwicklungen {p1} Auge {v1}.",
    gaps: [
      {
        id: "p1",
        kind: "preposition",
        correct: "im",
        options: ["ins", "im", "in", "ans"],
        ruleHint: "ins Auge fallen"
      },
      {
        id: "v1",
        kind: "verb",
        correct: "behalten",
        options: ["behalten", "halten", "nehmen", "bringen"],
      },
    ],
    solution: "Wir müssen die wirtschaftlichen Entwicklungen im Auge behalten.",
    grammarHint: "im Auge behalten → weiter beobachten.",
  },

  // 12) ins Auge fallen
  {
    id: "nvv_ins_auge_fallen",
    grammarLabel: "ins Auge fallen",
    template: "Im Supermarkt {v1} die Produkte in den oberen Regalen besonders stark {p1} Auge.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "fallen",
        options: ["fallen", "stehen", "gehen", "kommen"],
      },
      {
        id: "p1",
        kind: "preposition",
        correct: "ins",
        options: ["ins", "im", "in", "ans"],
        ruleHint: "ins Auge fallen"
      }
    ],
    solution: "Im Supermarkt fallen die Produkte in den oberen Regalen besonders stark ins Auge.",
    grammarHint: "ins Auge fallen → auffallen.",
  },

  // 13) zum Ausdruck bringen
  {
    id: "nvv_zum_ausdruck_bringen",
    grammarLabel: "zum Ausdruck bringen",
    template: "Er {v1} seinen Ärger {p1} Ausdruck.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "brachte",
        options: ["brachte", "nahm", "machte", "gab"],
      },
      {
        id: "p1",
        kind: "preposition",
        correct: "zum",
        options: ["zum", "zur", "im", "am"],
        ruleHint: "zum Ausdruck bringen"
      }
    ],
    solution: "Er brachte seinen Ärger zum Ausdruck.",
    grammarHint: "zum Ausdruck bringen → etw. äußern / ausdrücken.",
  },

  // 14) in Aussicht stellen
  {
    id: "nvv_in_aussicht_stellen",
    grammarLabel: "in Aussicht stellen",
    template: "Mir wurden gute Aufstiegsmöglichkeiten in Aussicht {v2}.",
    gaps: [
      {
        id: "v2",
        kind: "verb",
        correct: "gestellt",
        options: ["gestellt", "gegeben", "gemacht", "gebracht"],
      },
    ],
    solution: "Mir wurden gute Aufstiegsmöglichkeiten in Aussicht gestellt.",
    grammarHint: "in Aussicht stellen → etwas als wahrscheinlich darstellen / Positives andeuten.",
  },

  // 15) im Austausch stehen / sein mit (+Dat.)
  {
    id: "nvv_im_austausch_stehen_mit",
    grammarLabel: "im Austausch stehen / sein mit (+Dat.)",
    template: "Wir {v1} auch {p1} Austausch {p2} anderen Gruppen.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "stehen",
        options: ["stehen", "gehen", "kommen", "fallen"],
      },
      {
        id: "p1",
        kind: "preposition",
        correct: "im",
        options: ["im", "am", "um", "in"],
        ruleHint: "im Auge behalten"
      },
      {
        id: "p2",
        kind: "preposition",
        correct: "mit",
        options: ["mit", "bei", "für", "von"],
        ruleHint: "mit (+Dat.)",
      },
    ],
    solution: "Wir stehen auch im Austausch mit anderen Gruppen.",
    grammarHint: "im Austausch stehen/sein mit (+Dat.) → sich austauschen.",
  },

  // 16) zur Auswahl stehen
  {
    id: "nvv_zur_auswahl_stehen",
    grammarLabel: "zur Auswahl stehen",
    template: "Es {v1} viele Produkte zur Auswahl.",
    gaps: [
      {
        id: "v1",
        kind: "verb",
        correct: "stehen",
        options: ["stehen", "gehen", "kommen", "fallen"],
      },
    ],
    solution: "Es stehen viele Produkte zur Auswahl.",
    grammarHint: "zur Auswahl stehen → angeboten werden.",
  },
  {
    id: "beachtung_finden",
    grammarLabel: "Beachtung finden",
    template: "Erneuerbare Energieformen {v1} momentan große Beachtung.",
    gaps: [
      { id: "v1", kind: "verb", correct: "finden", options: ["finden", "machen", "nehmen", "bringen"] }
    ],
    solution: "Erneuerbare Energieformen finden momentan große Beachtung.",
    grammarHint: "Beachtung finden → beachtet werden."
  },

  {
    id: "beduerfnis_erfuellen",
    grammarLabel: "ein Bedürfnis erfüllen",
    template: "Mit der neuen Stelle ist mein Bedürfnis nach Kreativität voll {v1}.",
    gaps: [
      { id: "v1", kind: "verb", correct: "erfüllt", options: ["erfüllt", "gelöst", "erreicht", "gedeckt"] }
    ],
    solution: "Mit der neuen Stelle ist mein Bedürfnis nach Kreativität voll erfüllt.",
    grammarHint: "ein Bedürfnis erfüllen → bekommen, was man braucht."
  },

  {
    id: "beitrag_leisten",
    grammarLabel: "einen Beitrag leisten zu (+Dat.)",
    template: "Jeder kann einen Beitrag {p1} Verbesserung der Situation {v1}.",
    gaps: [
      { id: "p1", kind: "preposition", correct: "zur", options: ["zur", "zum", "für", "bei"], ruleHint: "zu + Dat" },
      { id: "v1", kind: "verb", correct: "leisten", options: ["leisten", "machen", "geben", "bringen"] }
    ],
    solution: "Jeder kann einen Beitrag zur Verbesserung der Situation leisten.",
    grammarHint: "einen Beitrag leisten zu  (+Dat.) → etw. beitragen / mitarbeiten an."
  },

  {
    id: "beruf_ausueben",
    grammarLabel: "einen Beruf ausüben",
    template: "Sie {v1} ihren Beruf schon seit über 20 Jahren {p1}.",
    gaps: [
      { id: "v1", kind: "verb", correct: "übt", options: ["übt", "macht", "führt", "nimmt"] },
      { id: "p1", kind: "preposition", correct: "aus", options: ["aus", "an", "bei", "mit"] }
    ],
    solution: "Sie übt ihren Beruf schon seit über 20 Jahren aus.",
    grammarHint: "einen Beruf ausüben → arbeiten als."
  },

  {
    id: "bescheid_geben",
    grammarLabel: "Bescheid geben / sagen",
    template: "Können Sie mir bitte Bescheid {v1} / {v2}, wenn Herr Maag da ist?",
    gaps: [
      { id: "v1", kind: "verb", correct: "geben", options: ["geben", "informieren", "machen", "bringen"] },
      { id: "v2", kind: "verb", correct: "sagen", options: ["sagen", "informieren", "machen", "bringen"] }
    ],
    solution: "Können Sie mir bitte Bescheid geben / sagen, wenn Herr Maag da ist?",
    grammarHint: "Bescheid geben / sagen → jdn. informieren."
  },

  {
    id: "bescheid_wissen",
    grammarLabel: "Bescheid wissen über (+Akk.)",
    template: "Wer {v1} denn {p1} dieses Projekt Bescheid?",
    gaps: [
      { id: "v1", kind: "verb", correct: "weiß", options: ["weiß", "kennt", "sieht", "merkt"] },
      { id: "p1", kind: "preposition", correct: "über", options: ["über", "von", "mit", "bei"] }
    ],
    solution: "Wer weiß denn über dieses Projekt Bescheid?",
    grammarHint: "Bescheid wissen über (+Akk.) → informiert sein."
  },

  {
    id: "bestellung_aufgeben",
    grammarLabel: "eine Bestellung aufgeben",
    template: "Hat der Kunde die Bestellung schon {v1}?",
    gaps: [
      { id: "v1", kind: "verb", correct: "aufgegeben", options: ["aufgegeben", "aufgestellt", "aufgelegt", "aufgenommen"] }
    ],
    solution: "Hat der Kunde die Bestellung schon aufgegeben?",
    grammarHint: "eine Bestellung aufgeben → etw. bestellen."
  },

  {
    id: "in_betracht_kommen",
    grammarLabel: "in Betracht kommen",
    template: "Zur Lösung des Problems {v1} mehrere Möglichkeiten {p1} Betracht.",
    gaps: [
      { id: "v1", kind: "verb", correct: "kommen", options: ["kommen", "gehen", "stehen", "fallen"] },
      { id: "p1", kind: "preposition", correct: "in", options: ["in", "bei", "an", "mit"] }
    ],
    solution: "Zur Lösung des Problems kommen mehrere Möglichkeiten in Betracht.",
    grammarHint: "in Betracht kommen → möglich sein."
  },

  {
    id: "in_betracht_ziehen",
    grammarLabel: "in Betracht ziehen",
    template: "Viele Leute {v1} {p1} Betracht, wegen einer Arbeitsstelle umzuziehen.",
    gaps: [
      { id: "v1", kind: "verb", correct: "ziehen", options: ["ziehen", "nehmen", "machen", "bringen"] },
      { id: "p1", kind: "preposition", correct: "in", options: ["in", "bei", "an", "mit"] }
    ],
    solution: "Viele Leute ziehen in Betracht, wegen einer Arbeitsstelle umzuziehen.",
    grammarHint: "in Betracht ziehen → überlegen."
  },

  {
    id: "bezug_herstellen",
    grammarLabel: "einen Bezug herstellen zu (+Dat.)",
    template: "Im Studium müssen wir immer wieder einen Bezug {p1} Praxis {v1}.",
    gaps: [
      { id: "p1", kind: "preposition", correct: "zur", options: ["zur", "zum", "für", "bei"] },
      { id: "v1", kind: "verb", correct: "herstellen", options: ["herstellen", "darstellen", "aufstellen", "feststellen"] }
    ],
    solution: "Im Studium müssen wir immer wieder einen Bezug zur Praxis herstellen.",
    grammarHint: "einen Bezug herstellen / haben zu (+Dat.) → etw. verbinden mit etw."
  },

  {
    id: "bezug_nehmen",
    grammarLabel: "Bezug nehmen auf (+Akk.)",
    template: "Ich {v1} Bezug {p1} Ihr Schreiben vom 12.4.",
    gaps: [
      { id: "v1", kind: "verb", correct: "nehme", options: ["nehme", "mache", "gebe", "habe"] },
      { id: "p1", kind: "preposition", correct: "auf", options: ["auf", "an", "bei", "von"] }
    ],
    solution: "Ich nehme Bezug auf Ihr Schreiben vom 12.4.",
    grammarHint: "Bezug nehmen auf (+Akk.) → sich beziehen auf."
  },

  {
    id: "bild_machen",
    grammarLabel: "sich ein Bild machen von (+Dat.)",
    template: "Die Polizei {v1} sich am Unfallort ein Bild {p1} der Situation.",
    gaps: [
      { id: "v1", kind: "verb", correct: "machte", options: ["machte", "nahm", "gab", "stellte"] },
      { id: "p1", kind: "preposition", correct: "von", options: ["von", "über", "bei", "mit"] }
    ],
    solution: "Die Polizei machte sich am Unfallort ein Bild von der Situation.",
    grammarHint: "sich ein Bild machen von (+Dat.) / über (+Akk.) → sich orientieren / sich informieren."
  },

  {
    id: "bindung_aufbauen",
    grammarLabel: "eine Bindung aufbauen zu (+Dat.)",
    template: "So können wir eine Bindung {p1} unserem Gegenüber {v1}.",
    gaps: [
      { id: "p1", kind: "preposition", correct: "zu", options: ["zu", "mit", "für", "bei"] },
      { id: "v1", kind: "verb", correct: "aufbauen", options: ["aufbauen", "ausbauen", "abbauen", "aufstellen"] }
    ],
    solution: "So können wir eine Bindung zu unserem Gegenüber aufbauen.",
    grammarHint: "eine Bindung aufbauen zu (+Dat.) → sich besser kennenlernen."
  },

  {
    id: "blamage_sein",
    grammarLabel: "eine Blamage sein",
    template: "Das Fußballspiel endete 0:7 und {v1} eine echte Blamage!",
    gaps: [
      { id: "v1", kind: "verb", correct: "war", options: ["war", "blieb", "wirkte", "schien"] }
    ],
    solution: "Das Fußballspiel endete 0:7 und war eine echte Blamage!",
    grammarHint: "eine Blamage sein → sich blamieren."
  },

  {
    id: "blickfeld_geraten",
    grammarLabel: "aus dem Blickfeld geraten",
    template: "Bei der Planung unseres Hauses sind uns die Kosten {p1} dem Blickfeld {v1}.",
    gaps: [
      { id: "p1", kind: "preposition", correct: "aus", options: ["aus", "von", "bei", "an"] },
      { id: "v1", kind: "verb", correct: "geraten", options: ["geraten", "gekommen", "gefallen", "gegangen"] }
    ],
    solution: "Bei der Planung unseres Hauses sind uns die Kosten aus dem Blickfeld geraten.",
    grammarHint: "aus dem Blickfeld geraten → vernachlässigt / nicht mehr gesehen werden."
  },

  {
    id: "blick_werfen",
    grammarLabel: "einen Blick werfen auf (+Akk.)",
    template: " Du solltest einen Blick {p1} den Vertrag {v1}, bevor du ihn unterschreibst.",
    gaps: [
      { id: "p1", kind: "preposition", correct: "auf", options: ["in", "auf", "an", "bei"] },
      { id: "v1", kind: "verb", correct: "werfen", options: ["werfen", "machen", "bringen", "nehmen"] }
    ],
    solution: " Du solltest einen Blick auf den Vertrag werfen, bevor du ihn unterschreibst.",
    grammarHint: "einen Blick werfen auf (+Akk.) → etw. genauer beobachten / ansehen."
  }
];