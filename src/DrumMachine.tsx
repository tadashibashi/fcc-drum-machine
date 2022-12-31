import React, { ChangeEvent, MouseEvent, ReactElement } from "react";

import { Bank } from "./store/PadBanks";

export interface PadProps {
    id: string;
    name: string;
    src: string;
    isOn: boolean;
    volume: number;

    setLabel(label: string): void;
}

class Pad extends React.PureComponent<PadProps> {
    constructor(props) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
        this.keydownHandler = this.keydownHandler.bind(this);
        this.keyupHandler = this.keyupHandler.bind(this);
    }

    keydownHandler(event: KeyboardEvent) {
        if (event.repeat) // not a repeat
            return;
        if (event.key === this.props.id.toLowerCase() || event.key === this.props.id) {
            const target = document.getElementById("drum-pad-" + this.props.id);
            if (target)
                target.classList.add("active");
            this.playAudio();
        }
            
    }

    keyupHandler(event: KeyboardEvent) {
        if (event.key === this.props.id.toLowerCase() || event.key === this.props.id) {
            const target = document.getElementById("drum-pad-" + this.props.id);
            if (target)
                target.classList.remove("active");
        }
        
    }

    override componentDidMount() {
        window.addEventListener("keydown", this.keydownHandler);
        window.addEventListener("keyup", this.keyupHandler);
    }

    override componentWillUnmount() {
        window.removeEventListener("keydown", this.keydownHandler);
        window.removeEventListener("keyup", this.keyupHandler);
    }

    playAudio() {
        if (!this.props.isOn)
            return;
        const audio = this.audio;

        if (audio) {
            if (!audio.paused)
                audio.currentTime = 0;

            audio.play();
            this.props.setLabel(this.props.name);

        } else {
            console.error("Pad audio could not be retrived!");
        }
    }

    clickHandler(ev: MouseEvent<HTMLDivElement>) {
        this.playAudio();
    }

    get audio() {
        return document.querySelector("#" + this.props.id) as HTMLAudioElement;
    }

    componentDidUpdate() {
        this.audio.volume = this.props.volume;
    }

    override render() {
        return (
            <div id={"drum-pad-" + this.props.id} className="drum-pad-wrapper" onClick={this.clickHandler}>
                <div className="drum-pad" id={this.props.name}>
                    <p>{this.props.id}</p>
                    <audio id={this.props.id} className="clip" src={this.props.src + ".mp3"} hidden>
                        {/* <source src={this.props.src + ".ogg"} type="audio/ogg" />
                        <source src={this.props.src + ".mp3"} type="audio/mpeg" /> */}
                    </audio>
                </div>
                {/* Moved this outside .drum-pad due to FCC test requirements */}
                <p className="drum-pad-name">{this.props.name}</p>
            </div>
        );
    }
}

const PAD_IDS = [
    'Q', 'W', 'E',
    'A', 'S', 'D',
    'Z', 'X', 'C'
];

interface DrumMachineProps {
    bank: Bank;
    id: string;
    displayId: string;
    display: string;
    isOn: boolean;
    volume: number;

    setLabel(label: string): void;
    setOnOff(isOn: boolean): void;
    setVolume(volume: number): void;
}

export class DrumMachine extends React.PureComponent<DrumMachineProps> {
    constructor(props) {
        super(props);

        this.handleOnOffChange = this.handleOnOffChange.bind(this);
        this.handleVolumeChange = this.handleVolumeChange.bind(this);
    }

    handleOnOffChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.setOnOff(event.target.checked);
    }

    handleVolumeChange(event: ChangeEvent<HTMLInputElement>) {
        const value = parseFloat(event.target.value);

        this.props.setVolume(value);
    }

    componentDidMount() {
        // Make checkbox start off checked
        const onOffCheckbox = document.querySelector('#' + this.props.id + " input[type='checkbox']") as HTMLInputElement;
        onOffCheckbox.checked = true;
    }

    render() {
        // Create the drum pads
        let pads: Array<ReactElement> = [];
        for (let i = 0; i < this.props.bank.pads.length; ++i) {
            pads.push(
                <Pad
                    setLabel={this.props.setLabel}
                    key={PAD_IDS[i]}
                    isOn={this.props.isOn}
                    id={PAD_IDS[i]} 
                    name={this.props.bank.pads[i].name} 
                    volume={this.props.volume}
                    src={this.props.bank.pads[i].src} />
            );
        }

        return (
            <div id={this.props.id} className="drum-machine">
                <div className="pads">
                    {pads}
                </div>
            
                <div className="controls">
                    <h1>fccDrums<span className="small"> MK1</span></h1>
                    <label><input type="checkbox" onChange={this.handleOnOffChange} />{this.props.isOn ? " On" : " Off"}</label>
                    <p className="display" id={this.props.displayId}>{this.props.display}</p>
                    <label><input type="range" onChange={this.handleVolumeChange}  min="0" max="1.0" value={this.props.volume} step=".01"/>Volume</label>
                </div>
            </div>
        );
    }    
}