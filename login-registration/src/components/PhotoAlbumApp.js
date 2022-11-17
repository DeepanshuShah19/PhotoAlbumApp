import React, { Component } from "react";
import { addImage, listImages, searchImage, groupImage } from "../utils/utils";
import FileBase64 from 'react-file-base64';
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
            imageLabel: '',
            groupName: '',
            hover: false
        };
        this.addImage = this.addImage.bind(this);
        this.listImagesHandler = this.listImagesHandler.bind(this);
        this.searchImageHandler = this.searchImageHandler.bind(this);
        this.groupHandler = this.groupHandler.bind(this);
    }
    async componentDidMount() {
        this.listImagesHandler()
    }

    async listImagesHandler() {
        let imagesList = await listImages();
        this.setState({ userImgData: [] })
        for (let index = imagesList.imageCount - 1; index >= 0; index--) {
            const element = imagesList.images[index];
            this.setState(prev => ({ ...prev, userImgData: [...prev.userImgData, element] }))
        }
        console.log("state: ", this.state.userImgData)
        // console.log("array length: ", this.state.userImgData.length)
    }

    async addImage() {
        console.log("Add Image")
        let addImageResponse = await addImage(this.state.imgName, this.state.imgCategory, this.state.imgFile);
        console.log("AddImageResponse: ", addImageResponse);
        this.listImagesHandler()
    }

    async searchImageHandler() {
        console.log("Search Image")
        let searchImageResponse = await searchImage(this.state.imageLabel);
        console.log("searchImageResponse: ", searchImageResponse);
        // this.listImagesHandler()
        this.setState({ userImgData: [] })
        for (let index = searchImageResponse.imageCount - 1; index >= 0; index--) {
            const element = searchImageResponse.images[index];
            this.setState(prev => ({ ...prev, userImgData: [...prev.userImgData, element] }))
        }
        // console.log("array length: ", this.state.userImgData.length)
    }

    async groupHandler() {
        console.log("Group Display")
        let groupResponse = await groupImage(this.state.groupName);
        console.log("searchImageResponse: ", groupResponse);
        // this.listImagesHandler()
        this.setState({ userImgData: [] })
        for (let index = groupResponse.imageCount - 1; index >= 0; index--) {
            const element = groupResponse.images[index];
            this.setState(prev => ({ ...prev, userImgData: [...prev.userImgData, element] }))
        }
        // console.log("array length: ", this.state.userImgData.length)
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
                <div className="mb-5 searchButtons">
                    <input
                        type="text"
                        className="searchField"
                        placeholder="Enter Label"
                        onChange={(e) => this.setState({ imageLabel: e.target.value })}
                    />
                    <button type="button" class="btn btn-success btn-lg button_d" onClick={this.searchImageHandler}>Search</button>
                    <input
                        type="text"
                        className="searchField"
                        placeholder="Enter Group Name"
                        onChange={(e) => this.setState({ groupName: e.target.value })}
                    />
                    <button type="button" class="btn btn-success btn-lg button_d" onClick={this.groupHandler}>Search</button>
                </div>
                {/* <div style={{ columnCount: 3 }}>
                    {this.state.userImgData.map(item => (
                        <div className="p-1 m-1 border flex justify-center"  >

                            <img className="activator" width="100%" height="auto" src={item.imageData} onMouseEnter={() => this.setState({ hover: true })} onMouseLeave={() => this.setState({ hover: false })} />
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
                </div> */}
                <div style={{ columnCount: 2 }}>
                    {this.state.userImgData.map(item => (
                        <div className="p-1 m-1 border flex justify-center image"  >
                            <img className="activator" width="100%" height="auto" src={item.imageData} onMouseEnter={() => this.setState({ hover: true })} onMouseLeave={() => this.setState({ hover: false })} />
                            <div className="image__overlay">
                                <div className="image__title">
                                    {item.imageLabel}
                                </div>
                                <p className="image__description">{item.category}</p>
                                <button type="button" class="btn btn-success btn-lg button_d" onClick={this.groupHandler}>Delete</button>
                                <br></br>
                                <button type="button" class="btn btn-success btn-lg button_d" onClick={this.groupHandler}>Replace</button>
                            </div>
                        </div>
                    ))}
                </div >

            </>
        );
    }
}