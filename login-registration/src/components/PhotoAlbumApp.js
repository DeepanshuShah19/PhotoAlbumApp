import React, { Component } from "react";
import addTask from "./addTask";
import { Link } from "react-router-dom";
import { setActive, getAllTasks, setCompleted, removeTask, deleteAllCompleted, searchTasks } from "../utils/utils";
import FileBase64 from 'react-file-base64';
export default class PhotoAlbumApp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // searchField: '',
            // currentDisplay: '',
            // addTaskPopup: false,
            // story_total: 0,
            // data: [],
            imgName: '',
            imgCategory: '',
            imgFile: '',
            
        };
        this.addImage = this.addImage.bind(this);
        // this.displayAll = this.displayAll.bind(this)
        // this.displayActive = this.displayActive.bind(this)
        // this.displayCompleted = this.displayCompleted.bind(this)
        // // this.removeCompleted = this.removeCompleted.bind(this)
        // this.removeAllCompleted = this.removeAllCompleted.bind(this)
        // this.search = this.search.bind(this)
        // this.updateStatus = this.updateStatus.bind(this)
    }
    async componentDidMount() {
        // let data = await getAllTasks()

        // console.log("printing data\n", data.allTasks)

        // let storyTotal = 0

        // for (const task of data.allTasks.entries()) {
        //     console.log(task[1])
        //     storyTotal = storyTotal + parseInt(task[1].story_points)
        // }

        // this.setState({
        //     data: data.allTasks,
        //     story_total: storyTotal
        // })


    }
    async addImage() {
        console.log("Add Image")
        console.log("Category: ",this.state.imgCategory)
        console.log("Name: ",this.state.imgName)
        console.log("Image: ",this.state.imgFile)

    }
    render() {
        return (
            <>
                <div className="mb-5 searchButtons">
                    <input
                        type="text"
                        className="searchField"
                        placeholder="Image Name"
                        // value={this.state.searchField}
                        onChange={(e) => this.setState({ imgName: e.target.value })}
                    />

                    <input
                        type="text"
                        className="searchField"
                        placeholder="Image Category"
                        // value={this.state.searchField}
                        onChange={(e) => this.setState({ imgCategory: e.target.value })}
                    />

                    <FileBase64
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => this.setState({ imgFile: base64 })}
                    />
                    <button type="button" class="btn btn-success btn-lg button_d" onClick={this.addImage}>Add Image</button>
                    {/* <button type="button" class="btn btn-success btn-lg button_d" onClick={this.addTask}>Add task</button>
                    <button type="button" class="btn btn-danger btn-lg button_d" onClick={this.removeAllCompleted}>Remove All Completed</button> */}
                    
                </div>
                <div className="mb-5 searchButtons">
                <img className="activator" style={{ width: '100%', height: 300 }} src={this.state.imgFile} />
                </div>
            </>
        );
    }
}