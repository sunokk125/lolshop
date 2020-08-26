
class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <h2>{this.props.division}</h2>
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

class Home extends React.Component {

    render() {
        return (
            <div className="home">
                <Menu/>
                <div className="keyimage">
                    <img src="/images/keyimage1.png"/>
                </div>
                <Content division="챔피언"/>
                <Content division="스킨"/>
            </div>

        );
    }


}

ReactDOM.render(<Home/>, document.getElementById('Home'));