import React, { Dispatch } from "react"
import ReactDOM from "react-dom/client"
import { connect, Provider } from "react-redux";
import { FullState, store } from "./store/store"
import { AppState, appActions } from "./store/AppSlice"
import { Action } from "redux";
import { DrumMachine } from "./DrumMachine";


interface AppProps {
    state: FullState;
    setBank: (bank: number) => void;
    setVolume: (volume: number) => void;
    setLabel: (label: string) => void;
    setOnOff: (isOn: boolean) => void;
    reset: () => void;
}

class App extends React.Component<AppProps> {
    constructor(props) {
        super(props);
    }

    override render() {
        return (
            <div>
                <DrumMachine 
                    id="drum-machine"
                    displayId="display"
                    volume={this.props.state.app.volume}
                    isOn={this.props.state.app.isOn}
                    bank={this.props.state.pads.bank}
                    display={this.props.state.app.label}
                    setLabel={this.props.setLabel} 
                    setOnOff={this.props.setOnOff}
                    setVolume={this.props.setVolume} />
            </div>
        );
    }
}

// ===== Redux Integration ====================================================

function mapStateToProps(state: FullState): Partial<AppProps> {
    return {
        state
    }
}

function mapDispatcherToProps(dispatch: Dispatch<Action>): Partial<AppProps> {
    return {
        setBank(bank: number) { 
            dispatch(appActions.setBank(bank));
        },
        setVolume(volume: number) {
            dispatch(appActions.setVolume(volume));
        },
        setLabel(label: string) {
            dispatch(appActions.setLabel(label));
        },
        setOnOff(isOn: boolean) {
            dispatch(appActions.setOnOff(isOn));
        },
        reset() { 
            dispatch(appActions.reset());
        }
    };
}

const Container = connect(mapStateToProps, mapDispatcherToProps)(App);

class AppWrapper extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider store={store}>
                <Container />
            </Provider>
        );
    }
}

// ===== Entrypoint ===========================================================

export function renderApp() {
    const rootEl = document.getElementById("app");
    if (!rootEl) {
        console.error("Failed to render app: could not get root element with id 'app'");
        return;
    }

    const root = ReactDOM.createRoot(rootEl);
    root.render(<AppWrapper />);
}
