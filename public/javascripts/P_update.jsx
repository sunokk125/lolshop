class Content extends React.Component{
    render(){
        return(
            <form method="post" action="/users/updateOk">
                <input type="text" name="title" defaultValue={posts.title}/>
                <textarea name="contents">{posts.contents}</textarea>
                <input type="hidden" name="id" value={posts._id}/>
                <input type="submit" value="수정"/>
                <input type="reset" value="취소"/>
            </form>
        );
    }
}


class P_update extends React.Component {
    render() {
        return (
            <div className="join">
                <Menu/>
                <div className="keyimage">
                    <img src="/images/keyimage2.png"/>
                </div>
                <Content></Content>
            </div>
        );
    }
}


ReactDOM.render(<P_update/>, document.getElementById('p_update'));