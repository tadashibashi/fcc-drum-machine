export interface Pad {
    src: string;
    name: string;
}

export interface Bank {
    name: string;
    pads: Array<Pad>;
}

export function copyBank(bank: Bank): Bank {
    let newBank: Partial<Bank> = {};

    newBank.name = bank.name;

    let pads: Array<Pad> = [];

    for (let i = 0; i < bank.pads.length; ++i) {
        pads.push({
            src: bank.pads[i].src,
            name: bank.pads[i].name
        });
    }

    newBank.pads = pads;

    return newBank as Bank;
}

export const padBanks: Array<Bank> = [
    // Bank 0 (default)
    {
        name: "Drum Kit",
        pads: [
            {
                src: "./audio/bank0/Piano_Dm7",
                name: "Piano Dm7"
            },
            {
                src: "./audio/bank0/Piano_G7",
                name: "Piano G7",
            },
            {
                src: "./audio/bank0/Piano_Cmaj9",
                name: "Piano Cmaj9"
            },
            {
                src: "./audio/bank0/Piano_Am9",
                name: "Piano Am9"
            },
            {
                src: "./audio/bank0/HH_Closed",
                name: "HH Closed"
            },
            {
                src: "./audio/bank0/HH_Open",
                name: "HH Open"
            },
            {
                src: "./audio/bank0/BassKick",
                name: "Bass Kick"
            },
            {
                src: "./audio/bank0/Snare",
                name: "Snare"
            },
            {
                src: "./audio/bank0/Crash",
                name: "Crash"
            }
        ]

    },
    // Bank 1
    {
        name: "Wubz",
        pads: [
            {
                src: "",
                name: "Wub"
            },
            {
                src: "",
                name: "Wub2"
            },
            {
                src: "",
                name: "Wub3"
            }
        ]
    }
];
