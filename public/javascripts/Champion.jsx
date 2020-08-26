
class Content extends React.Component {
    render() {
        return (
            <div className="content">
                <a href="/users/addCp"><button>글쓰기</button></a>
                <h2>챔피언</h2>
                <div className="item">
                    <form action="/users/payment" method="post">
                        <img src="/images/logo.png"/>
                        <p>아펠리오스</p>
                        <input type="hidden" name="name" value="아펠리오스"/>
                        <span>975 RP</span>
                        <input type="hidden" name="price" value="975"/>
                        <input type="submit" value="결제하기"/>
                    </form>
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

class Champion extends React.Component {

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

ReactDOM.render(<Champion/>, document.getElementById('champion'));