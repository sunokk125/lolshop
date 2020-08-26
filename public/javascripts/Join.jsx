class Join extends React.Component {
    render() {
        return (
            
    
            <div className="join">
                <Menu/>
                <div className="keyimage">
                    <img src="/images/keyimage2.png"/>
                </div>
                <div className="content">
                    <form action="/users/join" method="post">
                        <h3>회원가입</h3>
                        <table>
                            <tr>
                                <td>이름</td>
                                <td><input type="text" className="name" name="name"/></td>
                            </tr>
                            <tr>
                                <td>아이디</td>
                                <td><input type="text" className="id" name="id"/></td>
                            </tr>
                            <tr>
                                <td>비밀번호</td>
                                <td><input type="password" className="pw" name="pw"/></td>
                            </tr>
                            <tr>
                                <td>비밀번호확인</td>
                                <td><input type="password" className="pwCheck" name="pwCheck"/></td>
                                
                            </tr>
                            <tr>
                                <td><p id="pwsame" style={{color:"red"}} name="pwsame"/></td>
                                <td></td>
                            </tr>
                            
                            <tr>
                                <td>계좌번호</td>
                                <td>은행명 : <select className="bankName" name="bankName">
                                        <option selected value="kokmin">국민</option>
                                        <option value="sinhan">신한</option>
                                        <option value="nonghub">농협</option>
                                    </select>
                                    <p>계좌번호 :  <input type="text" className="acNum" name="acNum"/></p></td>
                            </tr>
                        </table>
                        <div className="btn">
                            <input type="submit" value="가입" className="join"/><input type="reset" value="취소"
                                                                                     className="cancel"/>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<Join/>, document.getElementById('join'));
