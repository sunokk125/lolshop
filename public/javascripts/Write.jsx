class Content extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            imagePreviewUrl: [null]
        };

        this.filePreView = this.filePreView.bind(this);
    }
    filePreView = (event) => {

        let file = event.target.files;
        let fileUrl =[];

        for(var i=0; i<file.length; i++){
            
            let reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);
                fileUrl.push(reader.result.toString());
                this.setState({
                    imagePreviewUrl: fileUrl
                });
            }

            reader.readAsDataURL(file[i]);
        }
        
    }
    
    imagePreview = () => {
        var item = [];
        var imgPreviewArea = [];
        
        console.log(this.state.imagePreviewUrl[0]);
        console.log(this.state);
        
        this.state.imagePreviewUrl.forEach(url =>{
            console.log("1111");
            imgPreviewArea.push(
                <img src={url}/>
            );
        });
        

        item.push(
            <div>
                {imgPreviewArea}
            </div>
        );
        return item;
    }
    
    render() {
        return (
            <form action="/users/write" method="post" encType="multipart/form-data">
                <table>
                    <tr>
                        <td>문의유형</td>
                        <td>
                            <select name="division">
                                <option>선택</option>
                                <option>청약철회 요청</option>
                                <option>결제/환불 문의</option>
                                <option>계정 문의</option>
                                <option>시스템 장애</option>
                                <option>버그 제보</option>
                                <option>건의 문의</option>
                                <option>기타 문의</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>주제</td>
                        <td>
                            <input type="text" name="title"/>
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <textarea name="content"></textarea>
                        </td>
                    </tr>
                    <tr>
                        <td>사진 첨부</td>
                        <td>
                            <input type="file" name="imgFile" multiple onChange={(event) => this.filePreView(event)}/>
                            <div className="imgPreview">
                                {this.imagePreview()}
                            </div>
                        </td>
                    </tr>
                </table>
                    <div>
                    <input type="submit" value="문의"/>
                    <input type="reset" value="취소"/>
                </div>
            </form>
        );
    }
}

class Write extends React.Component {

    render() {
        return (
            <div className="content">
                <Menu/>
                <div className="keyimage">
                    <img src="/images/keyimage1.png"/>
                </div>
                <Content></Content>
            </div>

        );
    }


}

ReactDOM.render(<Write/>, document.getElementById('write'));