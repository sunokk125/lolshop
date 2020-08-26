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
            <form action="/users/addCp" method="post" encType="multipart/form-data">
                <table>
                    <tr>
                        <td>이름</td>
                        <td><input type="text" name="name"/></td>
                    </tr>
                    <tr>
                        <td>가격</td>
                        <td>
                            <input type="text" name="price"/>
                        </td>
                    </tr>
                    <tr>
                        <td>종류</td>
                        <td>
                            <input type="radio" name="kind" value="c" selected/>챔피언
                        </td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <textarea name="description"></textarea>
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
                <input type="submit" value="저장"/>
                <input type="reset" value="취소"/>
            </form>
        );
    }
}

class AddCp extends React.Component {

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

ReactDOM.render(<AddCp/>, document.getElementById('addCp'));