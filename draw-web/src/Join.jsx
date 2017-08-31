import React from "react";
import Draw from "./Draw";

const JoinForm = ({onChangeName, onSubmit, name}) => <form onSubmit={onSubmit}>
    <div className="form-element">
        <label htmlFor="name">Name</label>
        <input id="name" type="text" onChange={onChangeName} value={name}/>
    </div>
    <div className="form-element">
        <button type="submit">Join</button>
    </div>
</form>;

export default class Join extends React.Component {

    constructor(props) {
        super(props);
        this.state = { name: "", joined: false };
    }

    changeName = e => this.setState({ name: e.target.value });

    join = e => {
        this.setState({ joined: true });
        e.preventDefault();
    };

    render() {
        return <div>
            { this.state.joined
                ? <Draw name={this.state.name}/>
                : <JoinForm name={this.state.name} onChangeName={this.changeName} onSubmit={this.join}/>
            }
        </div>
    }

};