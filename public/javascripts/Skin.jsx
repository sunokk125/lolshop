
class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <h2>스킨</h2>
                <div className="item">
                    <img src="/images/logo.png"/>
                    <p>챔피언 이름</p>
                    <span>가격</span>
                </div>
                <div className="item">
                    <img src="/images/logo.png"/>
                    <p>챔피언 이름</p>
                    <span>가격</span>
                </div>
                <div className="item">
                    <img src="/images/logo.png"/>
                    <p>챔피언 이름</p>
                    <span>가격</span>
                </div>
                <div className="item">
                    <img src="/images/logo.png"/>
                    <p>챔피언 이름</p>
                    <span>가격</span>
                </div>
            </div>
        );
    }
}

class Skin extends React.Component {

    render() {
        return (
            <div className="champion">
                <Menu/>
                <div className="keyimage">
                    <img src="/images/keyimage1.png"/>
                </div>
                <Content division="챔피언"/>
            </div>

        );
    }


}

ReactDOM.render(<Skin/>, document.getElementById('skin'));