class Signin extends React.Component {

   
    render() {
        return (
            <form className="form-signin" action="/users/login" method="post">
                <h4 className="form-signin-heading">로그인</h4>
                <label htmlFor="inputEmail" className="sr-only" >아이디</label>
                <input type="text"  name="id"  className="form-control" placeholder="아이디" />
                <label htmlFor="inputPassword" className="sr-only">비밀번호</label>
                <input type="password"  name="password" className="form-control" placeholder="비밀번호" />
                <input type="submit" className="btn btn-lg btn-block btnLogin"  value="Sign in"/>
            </form>
        );
    }


}

ReactDOM.render(<Signin />, document.getElementById('loginBox'));