// export default async (context, locale) => {
//   await resolve({
//     welcome: 'aurevouir',
//   });
// };

export default {
  default: {
    header: {
      button: {
        deposit: 'Dépôt',
        login: "S'identifier",
        register: "S'inscrire",
      },
      menu: {
        today: "Match d'aujourd'hui",
        soccer: 'Football',
        statistics: 'Statistiques',
        livescore: 'Livescore',
        live: 'En direct en jeu',
        helpdesk: "Bureau d'aide",
        search: 'Chercher',
        esport: 'E-sport',
        virtuals: 'Virtuels',
        tutorial: 'Didacticiel',
        mobile: 'Mobile',
        'become-an-agent': 'Devenez un agent',
        promotions: 'Promotions',
        blog: 'Actualités et blog',
      },
    },

    footer: {
      button: {
        menu: 'MENU',
        live: 'VIVRE',
        betslip: 'PARI SLIP',
        checkCoupon: 'VÉRIFIER',
      },
      downloadApp: 'MOBILE APPLICATION',
      tc: 'T&C',
      help: 'AIDEZ-MOI',
      aboutUs: 'À PROPOS DE NOUS',
      howToPlay: 'COMMENT JOUER',
      copyright1: '© 2020 SimpleWave.',
      copyright2: 'Tous les droits sont réservés.',
      responsibleGaming: 'Jeu responsable',
    },
  },
  home: {
    showMore: 'MONTRE PLUS',
    popular: 'LE PLUS POPULAIRE',
    live: 'VIVRE',
    nextEvents: 'PROCHAINS ÉVÉNEMENTS ',
    event: 'un événement',
    markets: 'Marchés | + {n} Marchés | + {n} marchés',
    noData: 'Pas de données',
    title: {
      highlight: 'Points forts',
      live: 'Vivre',
      popular: 'Populaire',
      upcoming: 'A venir',
    },
    odds: {
      way: '3-voies',
      doubleChance: 'Double Chance',
      underAndOver: 'Moins de / Plus de 2.5',
      one: '1',
      x: 'X',
      two: '2',
      oneX: '1X',
      oneTwo: '12',
      xTwo: 'X2',
      over: 'Plus de',
      under: 'En dessous de',
    },
  },
  register: {
    agreeTC:
      "En cliquant sur ce bouton, vous acceptez les conditions générales et confirmez que vous avez l'âge légal et que toutes les informations fournies sont vraies.",
    title: 'enregistrement',
    tabPaneOne: {
      header: 'Inscrivez-vous avec votre numéro de téléphone',
      form: {
        placeholder: {
          phone: '7057153788',
        },
        selectOpt: '+234',
        submitButton: 'ENVOYER OTP',
      },
      paragraph: 'Vous avez déjà un compte? ',
      loginButton: "S'IDENTIFIER",
    },
    tabPaneTwo: {
      header: 'Inscrivez-vous avec vos données personnelles',
      form: {
        placeholder: {
          firstname: 'PRÉNOM',
          lastname: 'NOM DE FAMILLE',
          password: 'MOT DE PASSE',
          email: 'EMAIL',
          username: 'BON',
          phoneNumber: 'NUMÉRO DE TÉLÉPHONE',
          dob: 'DATE DE NAISSANCE',
          state: 'ETAT',
        },
        submitButton: 'CRÉER UN COMPTE',
      },
    },
    tabPaneThree: {
      header: 'Inscrivez-vous avec votre compte social',
    },
  },
  login: {
    title: 'SE CONNECTER',
    tabPaneOne: {
      title: "S'IDENTIFIER",
      header: 'CONNECTEZ-VOUS AVEC VOTRE IDENTIFIANT ET VOTRE MOT DE PASSE',
      form: {
        placeholder: {
          username: 'TÉLÉPHONE OU ID',
          password: 'MOT DE PASSE',
        },
        submitButton: "S'IDENTIFIER",
      },
      passwordLink: 'MOT DE PASSE OUBLIÉ?',
      registerLink: "VOUS N'AVEZ PAS DE COMPTE? S'INSCRIRE",
    },
    tabPaneTwo: {
      title: 'POCHE',
      header: 'Connectez-vous avec votre bon',
      form: {
        placeholder: {
          username: 'BON',
        },
        submitButton: "S'IDENTIFIER",
      },
    },
    tabPaneThree: {
      title: 'SOCIAL', // SOCIALE (feminine) Ask what to use
      header: 'CONNEXION AVEC VOTRE COMPTE SOCIAL',
    },
  },
  components: {
    grandPrize: 'GRAND PRIX',
    leftMenu: {
      title: 'MENU',
      'a-z-sport': 'SPORTS A-Z',
    },
    rightMenu: {
      coupon: 'COUPON',
      goToBetslip: 'Accéder au bulletin de paris',
      selectionCount: 'Sélection | {n} Sélection | {n} Sélections',
      selection: 'Sélection | Sélection: {n} | Sélections: {n}',
      acceptOddChanges: 'Acceptez tous les changements étranges',
      totalStake: 'Mise totale',
      totalOdds: 'Cotes totales',
      potentialWinnings: 'GAGNEMENTS POTENTIELS',
      netPotentialWinnings: 'Pot net. Gagner',
      bonus: 'Prime',
      totalWinnings: 'POT TOTAL. GAINS',
      noSelection: "Votre bulletin de paris est vide. Cliquez sur n'importe quel impair pour ajouter une sélection au bulletin de paris",
      button: {
        book: 'LIVRE',
        placeBet: 'PARIER',
        load: 'CHARGE',
        check: 'VÉRIFIER',
        cancel: 'ANNULER',
      },
      system: 'Système',
      myBet: 'mon pari',
      placeholder: "Entrez l'identifiant de réservation ...",
      ariaPlaceholder: "Entrez l'identifiant de réservation",
      header: {
        load: 'Charger le code de réservation',
        check: 'Vérifier la fiche de pari',
      },
      tab: {
        betSlip: 'PARI SLIP',
        multiple: 'Plusieurs',
        system: 'Système',
        myBet: 'MES paris',
      },
    },
    settings: {
      title: 'Réglages',
      language: 'Langue',
      oddsFormat: 'Format des cotes',
      timezone: 'Fuseau horaire',
      theme: 'Thème',
    },
  },
};
