

class SegmentRenderer {

    frame;
    drawing;
    remainder;
    style;

    constructor(drawing, style = "#fff") {
        this.frame = 0;
        this.remainder = 0;
        this.drawing = drawing;
        this.style = style;
    }

    process(delta) {
        this.remainder += delta;
        for (let i = this.frame; i < this.drawing.length; i++) {
            const t = this.drawing[i].delta;
            if (this.remainder < t) {
                break;
            }
            this.remainder -= t;
            ++this.frame;
        }
    }

    render(ctx) {
        const lim = Math.min(this.frame, this.drawing.length);


        ctx.beginPath();

        let prev = { pos: null };
        for (let i = 0; i < lim; i++) {
            const item = this.drawing[i];
            if (prev.pos === null) {
                ctx.moveTo(...item.pos);
            } else if (item.pos !== null) {
                ctx.lineTo(...item.pos);
            }
            prev = item;
        }
        ctx.strokeStyle = this.style;
        ctx.stroke();

    }

}

export default SegmentRenderer;