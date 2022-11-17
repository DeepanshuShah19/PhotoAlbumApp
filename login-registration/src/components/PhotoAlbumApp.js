import React, { Component } from "react";
import { addImage, listImages, masonryOptions } from "../utils/utils";
import FileBase64 from 'react-file-base64';
import MultipleGridImages from 'react-multiple-image-grid'
import Masonry from "react-masonry-component";
// import InfiniteScroll from "react-infinite-scroller";
export default class PhotoAlbumApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userImgName: [],
            userImgCategory: [],
            userImgData: [],
            imgName: '',
            imgCategory: '',
            imgFile: '',
            hover: false
        };
        this.addImage = this.addImage.bind(this);
        this.listImages = this.listImages.bind(this);
    }
    async componentDidMount() {
        this.listImages()
    }

    async listImages() {
        let imagesList = await listImages();
        this.setState({ userImgData: [] })
        for (let index = imagesList.imageCount - 1; index >= 0; index--) {
            const element = imagesList.images[index].imageData;
            this.setState(prev => ({ ...prev, userImgData: [...prev.userImgData, element] }))
        }
        console.log("array lenfth: ", this.state.userImgData.length)
    }

    async addImage() {
        console.log("Add Image")
        let addImageResponse = await addImage(this.state.imgName, this.state.imgCategory, this.state.imgFile);
        console.log("AddImageResponse: ", addImageResponse);
        this.listImages()

    }
    render() {
        return (
            <>
                <div className="mb-5 searchButtons">
                    <input
                        type="text"
                        className="searchField"
                        placeholder="Image Name"
                        onChange={(e) => this.setState({ imgName: e.target.value })}
                    />
                    <input
                        type="text"
                        className="searchField"
                        placeholder="Image Category"
                        onChange={(e) => this.setState({ imgCategory: e.target.value })}
                    />
                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => this.setState({ imgFile: base64 })}
                    />
                    <button type="button" class="btn btn-success btn-lg button_d" onClick={this.addImage}>Add Image</button>

                </div>
                <div>
                    {this.state.userImgData.map(item => (
                        <div className="imageContainer" onMouseOver={() => this.setState({ hover: true })}
                            onMouseLeave={() => this.setState({ hover: false })}>
                            <img className="activator" style={{ width: 100, height: 300 }} src={item} />
                            {this.state.hover && (
                                <button
                                    size="sm"
                                    style={{
                                        position: "absolute",
                                        top: "5px",
                                        right: "5px",
                                    }}
                                    variant="primary"
                                >
                                    Delete Image
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </>
        );
    }
}