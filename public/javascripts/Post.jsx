class Comment extends React.Component {

    constructor(props) {
        super(props);

        posts.comments.forEach(element => {
            element.modify = false;
        });

        this.state = {
            comments : posts.comments,
        };

        this.deleteComment = this.deleteComment.bind(this);
        this.updateComment = this.updateComment.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleClick(index){
        var allcomments = this.state.comments;
        allcomments[index].modify = !allcomments[index].modify
        this.setState({comments:allcomments});
    }
    handleChange(event, index){
        var allcomments = this.state.comments;
        allcomments[index].content = event.target.value;
        this.setState({comments:allcomments});
    }

    updateComment(commentId,i){
        console.log(commentId);
        axios.post("/users/c_update", {
            content: this.state.comments[i].content, commentId: commentId, postId:posts._id
        }).then((response) => {
            console.log(response.data.comments);
            for(var i = 0; i < response.data.comments.length; i++){
                response.data.comments[i].modify = false;
            }
            if (response.data.success == true) {
                this.setState({comments: response.data.comments});
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    deleteComment(commentId) {
        console.log(commentId);
        axios.post("/users/c_delete", {
            commentId: commentId, postId:posts._id
        }).then((response) => {
            console.log(response.data.comments);
            for(var i = 0; i < response.data.comments.length; i++){
                response.data.comments[i].modify = false;
            }
            if (response.data.success == true) {
                this.setState({comments: response.data.comments});
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    createTable = () => {
        var item = [];
        var modifyArea = [];
        if (this.state.comments) {
            console.log(this.state);
            console.log(typeof(this.state.comments));
            console.log(this.state.comments.length);
            this.state.comments.forEach((comment,index) => {
                if(session.objId==comment.author._id){
                    if(comment.modify==false){
                        modifyArea.push(
                            <div>
                                <h3>작성자 : {comment.author.id}</h3>
                                <h3>내용 : {comment.content}</h3>
                                <button onClick={(event) =>this.handleClick(index)}>수정</button>
                                <button onClick={() =>this.deleteComment(comment._id)}>삭제</button>
                            </div>
                        ); 
                    }else{
                        modifyArea.push(
                            <div>
                                <textarea value={comment.content} onChange={(event) =>this.handleChange(event,index)}></textarea>
                                <button onClick={() =>this.updateComment(comment._id,index)}>완료</button>
                            </div>
                        );
                    }

                }else{
                    modifyArea.push(
                        <div>
                            <h3>작성자 : {comment.author.id}</h3>
                            <h3>내용 : {comment.content}</h3>
                        </div>
                    ); 
                    
                }
                
                    
                
                
            });
            item.push(
                <div>
                    {modifyArea}
                </div>
            );
        }
        return item;
    }

    render() {
        return (
            <div>{this.createTable()}</div>
        );
    }
}
class ImgArea extends React.Component{
    render(){
        if(posts.imgPath=="none"){
            return(
                
                <div>
                    <h3>이미지 없음</h3>
                </div>
            );
        }else{
            var image =[];
            for(var i=0;i<posts.imgPath.length;i++){
                image.push(
                    <img src={posts.imgPath[i]}/>
                );
            }
            return(
                <div>
                    {image}
                </div>
            );
        }
    }
}

class Post extends React.Component {
    render() {
        var updateLink = "/users/post/update/" + posts._id;
        var deleteLink = "/users/post/delete/" + posts._id;
        if(session.objId==posts.author._id){
            return (
                <div className="join">
                    <Menu/>
                    <div className="keyimage">
                        <img src="/images/keyimage2.png"/>
                    </div>
                    <div className="content">
                        <h3>작성자 : {posts.author.id}</h3>
                        <h3>제목 : {posts.title}</h3>
                        <h3>내용 : {posts.contents}</h3>
                        <ImgArea></ImgArea>
                        <button><a href={updateLink}>수정</a></button>
                        <button><a href={deleteLink}>삭제</a></button>
                        <p/>
                        <button><a href="/users/centerPost">목록</a></button>
                        <hr/>
                        <form action="/users/comment" method="post">
                            <h2>댓글</h2>
                            <textarea name="commentContents"></textarea>
                            <input type="hidden" name="id" value={posts._id}/>
                            <input type="submit" value="작성"/>
                        </form>
                        <Comment></Comment>
                    </div>
                </div>
            );
        }else{
            return (
                <div className="join">
                    <Menu/>
                    <div className="keyimage">
                        <img src="/images/keyimage2.png"/>
                    </div>
                    <div className="content">
                        <h3>작성자 : {posts.author.id}</h3>
                        <h3>제목 : {posts.title}</h3>
    
                        <h3>내용 : {posts.contents}</h3>
                        <ImgArea></ImgArea>
                        <p/>
                        <button><a href="/users/centerPost">목록</a></button>
                        <hr/>
                        <form action="/users/comment" method="post">
                            <h2>댓글</h2>
                            <textarea name="commentContents"></textarea>
                            <input type="hidden" name="id" value={posts._id}/>
                            <input type="submit" value="작성"/>
                        </form>
                        <Comment></Comment>
                    </div>
                </div>
            );
        }
        
    }
}


ReactDOM.render(<Post/>, document.getElementById('post'));
