import React from 'react';

function command(name, payload) {
    return JSON.stringify({ c: name, p: payload });
}


class Draw extends React.Component{

    componentDidMount() {
        this.ws = new WebSocket(`ws://${window.location.host}/ws`);
        this.ws.onopen = () => this.ws.send(command("join", {name: this.props.name}))
        //     console.log("ws connected");
        // this.ws.onclose = e => console.log("ws disconnected");
        this.ws.onmessage = e => console.log("ws data: " + e.data);
        // this.ws.onerror = err => console.log("ws error: " + err.message);
    }

    componentWillUnmount() {
        this.ws && this.ws.close();
    }

    render() {
        return <canvas width={this.props.width}
                       height={this.props.height}
                       ref="canvas">
        </canvas>;
    }

};

export default Draw;