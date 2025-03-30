// config/classes.js
export const mainClasses = [
    { name: '남귀검사', image: 'ms', subKey: 'MS' },
    { name: '여귀검사', image: 'fs', subKey: 'FS' },
    { name: '남격투가', image: 'mf', subKey: 'MF' },
    { name: '여격투가', image: 'ff', subKey: 'FF' },
    { name: '남거너', image: 'mg', subKey: 'MG' },
    { name: '여거너', image: 'fg', subKey: 'FG' },
    { name: '남마법사', image: 'mm', subKey: 'MM' },
    { name: '여마법사', image: 'fm', subKey: 'FM' },
    { name: '남프리스트', image: 'mp', subKey: 'MP' },
    { name: '여프리스트', image: 'fp', subKey: 'FP' },
    { name: '마창사', image: 'dl', subKey: 'DL' },
    { name: '도적', image: 'th', subKey: 'TH' },
    { name: '총검사', image: 'gb', subKey: 'GB' },
    { name: '나이트', image: 'kn', subKey: 'KN' },
    { name: '아처', image: 'ar', subKey: 'AR' },
    { name: '다크나이트', image: 'dn', subKey: 'DK' },
    { name: '크리에이터', image: 'cr', subKey: 'CR' },
];

export const subClasses = {
    MS: [
        { name: '웨펀마스터', image: 'weaponmaster' },
        { name: '소울브링어', image: 'soulbringer' },
        { name: '버서커', image: 'berserker' },
        { name: '아수라', image: 'asura' },
        { name: '검귀', image: 'ghostblade' }
    ],
    FS: [
        { name: '소드마스터', image: 'swordmaster' },
        { name: '다크템플러', image: 'darktemplar' },
        { name: '데몬슬레이어', image: 'demonslayer' },
        { name: '베가본드', image: 'vegabond' },
        { name: '블레이드', image: 'blade' }
    ],
    MF: [
        { name: '넨마스터', image: 'Mnenmaster' },
        { name: '스트라이커', image: 'Mstriker' },
        { name: '스트리트파이터', image: 'Mstreetfighter' },
        { name: '그래플러', image: 'Mgrappler' }
    ],
    FF: [
        { name: '넨마스터', image: 'Fnenmaster' },
        { name: '스트라이커', image: 'Fstriker' },
        { name: '스트리트파이터', image: 'Fstreetfighter' },
        { name: '그래플러', image: 'Fgrappler' }
    ],
    MG: [
        { name: '레인저', image: 'Mranger' },
        { name: '런처', image: 'Mlauncher' },
        { name: '메카닉', image: 'Mmechanic' },
        { name: '스핏파이어', image: 'Mspitfire' },
        { name: '어썰트', image: 'assault' }
    ],
    FG: [
        { name: '레인저', image: 'Franger' },
        { name: '런처', image: 'Flauncher' },
        { name: '메카닉', image: 'Fmechanic' },
        { name: '스핏파이어', image: 'Fspitfire' }
    ],
    MM: [
        { name: '엘레멘탈바머', image: 'elementalbomber' },
        { name: '빙결사', image: 'glacialmaster' },
        { name: '블러드메이지', image: 'bloodmage' },
        { name: '스위프트마스터', image: 'swiftmaster' },
        { name: '디멘션워커', image: 'dimensionwalker' }
    ],
    FM: [
        { name: '엘레멘탈마스터', image: 'elementalmaster' },
        { name: '소환사', image: 'summoner' },
        { name: '배틀메이지', image: 'witch' },
        { name: '마도학자', image: 'battlemage' },
        { name: '인챈트리스', image: 'enchantress' }
    ],
    MP: [
        { name: '크루세이더', image: 'crusader' },
        { name: '인파이터', image: 'infighter' },
        { name: '퇴마사', image: 'exorcist' },
        { name: '어벤저', image: 'avenger' }
    ],
    FP: [
        { name: '크루세이더', image: 'femalecrusader' },
        { name: '이단심판관', image: 'inquisitor' },
        { name: '무녀', image: 'sorceress' },
        { name: '미스트리스', image: 'mistress' }
    ],
    TH: [
        { name: '로그', image: 'rogue' },
        { name: '사령술사', image: 'necromancer' },
        { name: '쿠노이치', image: 'kunoichi' },
        { name: '섀도우댄서', image: 'shadowdancer' }
    ],
    KN: [
        { name: '엘븐나이트', image: 'elvenknight' },
        { name: '카오스', image: 'chaos' },
        { name: '팔라딘', image: 'paladin' },
        { name: '드래곤나이트', image: 'dragonknight' }
    ],
    DL: [
        { name: '뱅가드', image: 'vanguard' },
        { name: '듀얼리스트', image: 'duelist' },
        { name: '드래고니안랜서', image: 'dragonianlancer' },
        { name: '다크랜서', image: 'darklancer' }
    ],
    GB: [
        { name: '히트맨', image: 'hitman' },
        { name: '요원', image: 'agent' },
        { name: '트러블슈터', image: 'troubleshooter' },
        { name: '스페셜리스트', image: 'specialist' }
    ],
    AR: [
        { name: '뮤즈', image: 'muse' },
        { name: '트래블러', image: 'traveler' },
        { name: '헌터', image: 'hunter' },
        { name: '비질란테', image: 'vigilante' }
    ],
    DK: [
        { name: '다크나이트', image: 'darkknight' }
    ],
    CR: [
        { name: '크리에이터', image: 'creator' }
    ]
};

export const uiConfig = {
    mainClass: {
        startX: 80,
        startY: 50,
        spacing: 70,
        textStyle: { 
            fontSize: '13px', 
            fill: '#fff', 
            fontFamily: 'Arial',
            stroke: '#000',
            strokeThickness: 5,
            align: 'center'
        }
    },
    subClass: {
        startX: 80,
        startY: 155,
        spacingX: 130,
        spacingY: 130,
        maxPerRow: 5,
        textStyle: { 
            fontSize: '18px', 
            fill: '#FFFF', 
            fontFamily: 'Arial',
            stroke: '#000',
            strokeThickness: 5
        }
    },
    skillSet: {
        startX: 30,   
        startY: 260,  
        skillSpacingX: 45,  // 스킬 아이콘 간 가로 간격
        skillSpacingY: 0,    // 스킬 아이콘 간 세로 간격 (가로 정렬이므로 0)
        setSpacingY: 45,    // 스킬셋 간 세로 간격
        columns: 1         // 스킬셋을 세로로 1열 배치
    }
};


export const skillConfig = {
    Mranger: {
        skillSets: [
            {
                talismans: [6, 9, 11],
                mainSkill: 6,
                skills: [10, 13],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,13]
            },
            {
                talismans: [6, 9, 11],
                mainSkill: 6,
                skills: [12, 13, 10],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,12,13]
            },
            {
                talismans: [6, 9, 11],
                mainSkill: 6,
                skills: [10, 12, 13, 8],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,12,13]
            }
        ]
    },
    Mlauncher: {
        skillSets: [
            {
                talismans: [6, 7, 9],
                mainSkill: 6,
                skills: [11, 14],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,13,14]
            },
            {
                talismans: [6, 7, 9],
                mainSkill: 6,
                skills: [12, 11],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,13]  
            },
            {
                talismans: [6, 7, 9],
                mainSkill: 6,
                skills: [11, 12],
                useskills: [1,2,3,4,5,6,7,8,9,10,12,13]  
            },
            {
                talismans: [6, 7, 5],
                mainSkill: 6,
                skills: [11, 14],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,13,14]  
            },
            {
                talismans: [6, 7, 5],
                mainSkill: 6,
                skills: [12, 11],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,13]   
            },
            {
                talismans: [6, 7, 5],
                mainSkill: 6,
                skills: [11, 12],
                useskills: [1,2,3,4,5,6,7,8,9,10,12,13]   
            },
            {
                talismans: [6, 5, 9],
                mainSkill: 6,
                skills: [11, 14],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,13,14]  
            },
            {
                talismans: [6, 5, 9],
                mainSkill: 6,
                skills: [12, 11],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,13]    
            },
            {
                talismans: [6, 5, 9],
                mainSkill: 6,
                skills: [11, 12],
                useskills: [1,2,3,4,5,6,7,8,9,10,12,13]   
            },
        ]
    },
    Mmechanic: {
        skillSets: [
            {
                talismans: [6, 8, 9],
                mainSkill: 6,
                skills: [],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,12,13,14]  
            }
        ]
    },
    Mspitfire: {
        skillSets: [
            {
                talismans: [6, 8, 9],
                mainSkill: 8,
                skills: [],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,12,13,14] 
            }
        ]
    },
    assault: {
        skillSets: [ 
            {
                talismans: [6, 10, 8],
                mainSkill: 6,
                skills: [16, 12],
                useskills: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]   
            },
            {
                talismans: [6, 10, 8],
                mainSkill: 6,
                skills: [12, 16]  
            },
            {
                talismans: [6, 10, 5],
                mainSkill: 6,
                skills: [16, 12]  
            },
            {
                talismans: [6, 10, 5],
                mainSkill: 6,
                skills: [12, 16]  
            }
        ]
    }

};