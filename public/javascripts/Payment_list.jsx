
class Content extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            orders : orders,
            rp_orders: rp_orders,
            cp_orders:cp_orders
        };
    }

    list = () => {
        var item = [];
        
        this.state.orders.forEach((orders) => {
            console.log(orders);
            var link ="/users/payment_cancel/"+orders._id;
            item.push(
                <tr>
                    <td>{orders.prdName}</td>
                    
                    <td>{orders.prdPrice}</td>
                    
                    <td>{orders.method}</td>
                    
                    <td><a href={link}>취소하기</a></td>
                </tr>

            );
        });
        return item;

    }
    rp_list = () => {
        var item = [];
        
        this.state.rp_orders.forEach((rp_orders) => {
            var link ="/users/payment_cancel/"+rp_orders._id;
            item.push(
                <tr>
                    <td>{rp_orders.prdName}</td>
                    
                    <td>{rp_orders.prdPrice}</td>
                    
                    <td>{rp_orders.method}</td>
                    
                    <td><a href={link}>취소하기</a></td>
                </tr>

            );
        });
        return item;

    }
    cp_list = () => {
        var item = [];
        
        this.state.cp_orders.forEach((cp_orders) => {
            var link ="/users/payment_cancel/"+cp_orders._id;
            item.push(
                <tr>
                    <td>{cp_orders.prdName}</td>
                    
                    <td>{cp_orders.prdPrice}</td>
                    
                    <td>{cp_orders.method}</td>
                    
                    <td><a href={link}>취소하기</a></td>
                </tr>

            );
        });
        return item;

    }


    render() {
        return (
            <div className="content">
                <h2>전체 구매내역</h2>
                <div className="item">
                    <table>
                        <tr>
                            <td width="300px">상품 이름</td>
                            <td width="300px">가격</td>
                            <td width="300px">결제 방식</td>
                            <td width="300px">결제 취소</td>
                        </tr>
                        {this.list()}
                    </table>
                </div>
                <h2>rp 구매내역</h2>
                <div className="item">
                    <table>
                        <tr>
                            <td>상품 이름</td>
                            <td>가격</td>
                            <td>결제 방식</td>
                        </tr>
                        {this.rp_list()}
                    </table>
                </div>
                <h2>챔피언 구매내역</h2>
                <div className="item">
                    <table>
                        <tr>
                            <td>상품 이름</td>
                            <td>가격</td>
                            <td>결제 방식</td>
                        </tr>
                        {this.cp_list()}
                    </table>
                </div>
            </div>
        );
    }
}

class List extends React.Component {

    render() {
        return (
            <div className="champion">
                <Menu/>
                <div className="keyimage">
                    <img src="/images/keyimage1.png"/>
                </div>
                <Content/>
            </div>

        );
    }


}

ReactDOM.render(<List/>, document.getElementById('payment_list'));