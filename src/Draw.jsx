import React from 'react';

import SegmentRenderer from "./SegmentRenderer";

class Draw extends React.Component{

    constructor(props) {
        super(props);

        const drawing = [];
        for (let i = 0; i < 1000; i++) {
            drawing.push({ pos: [i, 50 + Math.sin(i / 10) * 30], delta: 16 });
        }

        this.components = [ new SegmentRenderer(drawing) ]
    }

    componentDidMount() {
        this.loop(0, 0);
    }

    componentWillUnmount() {
        this.req && cancelAnimationFrame(this.req);
    }

    loop(cur, prev) {
        this.draw(cur - prev);
        this.req = requestAnimationFrame(t => this.loop(t, cur));
    }

    draw(delta) {
        for (let comp of this.components) {
            comp.process(delta);
        }

        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        for (let comp of this.components) {
            comp.render(ctx);
        }
    }

    render() {
        return <canvas width={this.props.width}
                       height={this.props.height}
                       ref="canvas">
        </canvas>;
    }

};

export default Draw;