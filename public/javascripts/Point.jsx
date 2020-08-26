
class Point extends React.Component {

    render() {
        return (
            <div className="ServiceCenter">
                <Menu/>
                <div className="keyimage">
                    <img src="/images/keyimage1.png"/>
                </div>
                <div className="content">
                    <form method="post" action="/users/charge">
                        <input type="radio" name="point" value="1"/>565rp 4900원<br/>
                        <input type="radio" name="point" value="2"/>1200rp 9900원<br/>
                        <input type="radio" name="point" value="3"/>2450rp 19900원<br/>
                        <input type="radio" name="point" value="4"/>4350rp 35000원<br/>
                        <input type="radio" name="point" value="5"/>6275rp 49900원<br/>
                        <input type="radio" name="point" value="6"/>13000rp 99000원<br/>
                        <input type="submit" value="결 제"/>
                    </form>
                </div>
            </div>

        );
    }


}

ReactDOM.render(<Point/>, document.getElementById('point'));