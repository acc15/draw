import React, {Component} from 'react';
import './App.css';

//
// class Point {
//
//     x;
//     y;
//
//     Point(x, y) {
//         this.x = x;
//         this.y = y;
//     }
//
//
// }

class App extends Component {

    constructor(props) {
        super(props);
        this.state = { segment: [] };
    }

    componentDidMount() {
        this.draw();
    };

    componentDidUpdate() {
        this.draw();
    }

    drawSegment(ctx, segment, color = "#fff") {
        if (segment.length === 0) {
            return;
        }
        ctx.beginPath();
        segment.forEach((v, i) => {
            if (!v) {
                return;
            }
            if (segment[i-1]) {
                ctx.lineTo(...v);
            } else {
                ctx.moveTo(...v)
            }
        });
        ctx.strokeStyle = color;
        ctx.stroke();
    }

    draw() {

        let total = this.state.segment.length;
        console.log("total points: " + total);

        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.drawSegment(ctx, this.state.segment);

    }

    closeSegment = e => {
        const s = this.state.segment;
        if (s.length > 0 && s[s.length-1]) {
            this.setState({ segment: [...this.state.segment, this.makePt(e), null] });
        }
    };

    makePt = e => [ e.clientX - this.refs.canvas.offsetLeft, e.clientY - this.refs.canvas.offsetTop ];
    addToSegment = e => this.setState({ segment: [...this.state.segment, this.makePt(e)] });

    mouseMove = e => {
        if ((e.buttons & 1) === 1) {
            this.addToSegment(e);
        } else {
            this.closeSegment();
        }
    };

    render() {
        return (
            <div className="App">
                <canvas ref="canvas" id="drawing-canvas" width="800" height="600"
                        onMouseMove={this.mouseMove}
                        onMouseDown={this.addToSegment}
                        onMouseUp={this.closeSegment}
                        onMouseLeave={this.closeSegment} >
                </canvas>
            </div>
        );
    }
}

export default App;
