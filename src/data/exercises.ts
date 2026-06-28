import { Exercise } from '../types';

export const exercises: Exercise[] = [
  {
    id: 'cat-cow',
    category: 'low_back',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/04d4ce58-2eba-4b96-bc68-8a896ae74099/cat-cow-stretch-f27ad4f5-1782675403938.webp',
    name: {
      en: 'Cat-Cow Stretch',
      ha: 'Mikewar Kyanwa da Sa'
    },
    description: {
      en: 'A gentle flow between two poses that warms the body and brings flexibility to the spine.',
      ha: 'Gudun rarrafe tsakanin hotuna biyu wanda ke dumama jiki da kawo sassauci ga kashin baya.'
    },
    instructions: {
      en: [
        'Start on your hands and knees in a tabletop position.',
        'Inhale as you drop your belly towards the mat (Cow Pose).',
        'Exhale as you draw your belly to your spine and round your back toward the ceiling (Cat Pose).'
      ],
      ha: [
        'Fara da hannuwanku da gwiwoyinku a matsayin tebur.',
        'Sha iska yayin da kuke sauke cikin ku zuwa tabarma (Cow Pose).',
        'Fitarda iska yayin da kuke jawo cikin ku zuwa kashin baya (Cat Pose).'
      ]
    }
  },
  {
    id: 'bridge',
    category: 'pelvic_floor',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/04d4ce58-2eba-4b96-bc68-8a896ae74099/bridge-exercise-da7bf174-1782675404114.webp',
    name: {
      en: 'Glute Bridge',
      ha: 'Gadar Gindi'
    },
    description: {
      en: 'Strengthens the glutes, hamstrings, and core while engaging the pelvic floor.',
      ha: 'Yana ƙarfafa gindi, hamstrings, da tsakiya yayin shigar da pelvic floor.'
    },
    instructions: {
      en: [
        'Lie on your back with knees bent and feet flat on the floor.',
        'Lift your hips toward the ceiling while squeezing your glutes.',
        'Hold for 2 seconds and slowly lower back down.'
      ],
      ha: [
        'Kwanta a bayanka tare da gwiwoyi a lanƙwashe da ƙafafu a ƙasa.',
        'Ɗaga kwankwasonka zuwa sama yayin da kake matse gindinka.',
        'Riƙe na daƙiƙa 2 sannan ka sauko a hankali.'
      ]
    }
  },
  {
    id: 'pelvic-ball',
    category: 'pregnancy',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/04d4ce58-2eba-4b96-bc68-8a896ae74099/pelvic-stability-ball-d9eae4df-1782675403739.webp',
    name: {
      en: 'Pelvic Stability Ball',
      ha: 'Ball na Karfafa Pelvic'
    },
    description: {
      en: 'Helps maintain pelvic stability and relieve pressure during pregnancy.',
      ha: 'Yana taimakawa wajen kiyaye kwanciyar hankali na pelvic da rage matsa lamba yayin daukar ciki.'
    },
    instructions: {
      en: [
        'Sit on an exercise ball with feet wide for balance.',
        'Gently rock your pelvis in circles.',
        'Keep your core engaged and breathe deeply.'
      ],
      ha: [
        'Zauna a kan ball na motsa jiki tare da ƙafafu a buɗe don daidaituwa.',
        "A hankali juya kashin kwankwasonka a cikin da'ira.",
        'Kiyaye tsakiyar jikinka kuma kayi numfashi sosai.'
      ]
    }
  },
  {
    id: 'seated-leg-raise',
    category: 'musculoskeletal',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/04d4ce58-2eba-4b96-bc68-8a896ae74099/seated-leg-raise-777f2baa-1782675404341.webp',
    name: {
      en: 'Seated Leg Raise',
      ha: 'Daga Kafa a Zaune'
    },
    description: {
      en: 'Strengthens the quadriceps and improves knee stability.',
      ha: 'Yana ƙarfafa quadriceps kuma yana inganta kwanciyar hankali na gwiwa.'
    },
    instructions: {
      en: [
        'Sit in a sturdy chair with your back straight.',
        'Slowly straighten one leg out in front of you.',
        'Hold for 3 seconds, then lower and repeat on the other side.'
      ],
      ha: [
        'Zauna a kan kujera mai ƙarfi tare da bayanka a miƙe.',
        'A hankali ka miƙe kafa ɗaya a gabanka.',
        'Riƙe na daƙiƙa 3, sannan ka sauko ka maimaita a ɗayan gefen.'
      ]
    }
  }
];
