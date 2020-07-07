import React from "react" ; 

class Forminp extends React.Component {
    state = { companyName: "" ,
                amount : "" , 
                currency : "ETH", 
                };


    resetInput = (event) => {
        
        this.props.onSubmit(event, this.state.companyName, this.state.amount, this.state.currency);
        this.setState({ companyName: "" });
        this.setState({amount : 0.00}) ; 
        this.setState({currency : "ETH" }) ; 
    };

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ currency: event.target.value });
    };

    render() {
        if (this.props.companyName === 0) {
            this.setState({ companyName: "" });
            super.setState({ companyName: 1 });
        }
        return (


            <div className="tc bt bw1">

                <form className=" form " onSubmit={this.resetInput}>
                    <input
                        className="pa2"
                            
                        type="string"
                        value={this.state.companyName}
                        onChange={event => this.setState({ companyName: event.target.value })}
                        placeholder="To address"
                        required
                    />
                    <div style = {{padding: 5}}/>
                    <input
                        className="pa2"
                            
                        type="currency"
                        value={this.state.amount}
                        onChange={event => this.setState({ amount: event.target.value })}
                        placeholder="Enter amount"
                        required
                    />
                    <div style = {{padding: 5}}/>
            <div><select
                onChange={this.handleChange}
                defaultValue={this.state.currency}
                placeholder={"Query Type"}
                className=""
            >
                <option value="ETH" > ETH</option>
                <option value="BTC" > BTC</option>
                <option value="XRP" > XRP</option>


            </select></div>
        
                    <div className="send"><button className="">SEND</button></div>
                    
                </form>
            </div>
        );
    }
}

export default Forminp; 