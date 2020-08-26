class List extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            posts:posts
        };
        this.searchTitle = this.searchTitle.bind(this);
    }

    searchTitle(event) {
        this.setState({
            title: event.target.value
        });
        axios.post('/users/search', {
            title:this.state.title
        }).then((response) => {
            console.log(response.data.success);
            if (response.data.success == true) {
                this.setState({posts:response.data.posts});
                console.log(this.state.posts);
                this.createTable();
            }
        }).catch((error) => {
            console.log(error);
        });


    }


    createTable = () => {
        var item = [];
        if (this.state.posts) {
            for (var i = 0; i < this.state.posts.length; i++) {
                var linkHref = '/users/post/' + this.state.posts[i]._id;
                item.push(
                    <div>
                        <h3>{i + 1}</h3>
                        <h3><a href={linkHref}>{this.state.posts[i].title}</a></h3>
                    </div>
                );
            }
        } else if (this.state.posts == [] || this.state.posts == null) {
            item.push(
                <div>게시물이 없습니다.</div>
            );
        }
        return item;
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.title} onChange={(e) => this.searchTitle(e)}/>
                <input type="button" value="검색" onClick={this.searchTitle}/>
                {this.createTable()}
            </div>
        );
    }
}

class CenterPost extends React.Component {

    render() {
        return (
            <div className="ServiceCenter">
                <Menu/>
                <div className="keyimage">
                    <img src="/images/keyimage1.png"/>
                </div>
                <div className="content">
                    <List></List>
                    <a href="/users/write">
                        <button>글쓰기</button>
                    </a>
                </div>
            </div>

        );
    }


}

ReactDOM.render(<CenterPost/>, document.getElementById('centerPost'));