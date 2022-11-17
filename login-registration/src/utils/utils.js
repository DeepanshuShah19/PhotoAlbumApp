
let API_URL = "http://localhost:12230/"
let TOKEN = window.localStorage.getItem("token")
// let TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImtzaGl0aWpAcGFuZHUucGFuZCIsImlhdCI6MTY2NjU4MTc4N30.sgc_NSNrVCsBkZMP1sYJBTQZUDoOjuKLUMSpCbCfbC0"

export const setActive = async (taskId) => {
    console.log("In SetActive function")
    const requestBody = {
        'task_id': taskId,
        'token': TOKEN,
    };

    console.log('stringified request: ', JSON.stringify(requestBody));

    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    };

    try {
        let response = await fetch(API_URL + "activeTask", options);
        let json = await response.json();
        console.log('Change to active request completed', json);

        if (json.statusCode === 200) {
            return json.data;
        }
    } catch (err) {
        console.error('Error while performing change to Active.', err);
    }
    return null;
}


export const getAllTasks = async () => {

    console.log("In getAllTasks function")
    const requestBody = {
        'token': TOKEN,
    };

    console.log('stringified request: ', JSON.stringify(requestBody));

    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    }; 

    try {
        let response = await fetch(API_URL + "getTasks", options);
        let json = await response.json();
        console.log("Prinitng from getAllTasks \n" , json)
        console.log('printing json body', json.data);
        // return json;
        if (json.status === "ok") {
            return json.data;
        }
    } catch (err) {
        console.error('Error while getting all tasks.', err);
    }
    return null;

}

export const setCompleted = async (taskId) => {
    console.log("In setCompleted function")
    const requestBody = {
        'task_id': taskId,
        'token': TOKEN,
    };

    console.log('stringified request: ', JSON.stringify(requestBody));

    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    };

    try {
        let response = await fetch(API_URL + "completeTask", options);
        let json = await response.json();
        console.log('Change to complete request completed', json);

        if (json.statusCode === 200) {
            return json.data;
        }
    } catch (err) {
        console.error('Error while performing change to Completed.', err);
    }
    return null;
}

export const removeTask = async (taskId) => {
    console.log("In setCompleted function")
    const requestBody = {
        'task_id': taskId,
        'token': TOKEN,
    };

    console.log('stringified request: ', JSON.stringify(requestBody));

    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    };

    try {
        let response = await fetch(API_URL + "deleteTask", options);
        let json = await response.json();
        console.log('Remove Task request completed', json);

        if (json.statusCode === 200) {
            return json.data;
        }
    } catch (err) {
        console.error('Error while removing task.', err);
    }
    return null;
}

export const deleteAllCompleted = async () => {
    console.log("In deleteALlCompleted function")
    const requestBody = {
        'token': TOKEN,
    };

    console.log('stringified request: ', JSON.stringify(requestBody));

    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    };

    try {
        let response = await fetch(API_URL + "deleteAllTasks", options);
        let json = await response.json();
        console.log('Delete all completed tasks request completed', json);

        if (json.statusCode === 200) {
            return json.data;
        }
    } catch (err) {
        console.error('Error while deleting all completed.', err);
    }
    return null;
}

export const addTask = async (name,description,storyPoints) => {
    console.log("In addTask function")
    const requestBody = {
        'task_name' : name, 
        'task_description' : description, 
        'story_points' : storyPoints,
        'token': TOKEN,
    };

    console.log('stringified request: ', JSON.stringify(requestBody));

    const options = {
        method: "POST",
        crossDomain: true,
        mode: 'no-cors',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            // "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    };

    try {
        let response = await fetch(API_URL + "addTask", options);
        let json = await response.json();
        console.log('Added a new task', json);

        if (json.statusCode === 200) {
            return json.data;
        }
    } catch (err) {
        console.error('Error while adding new task.', err);
    }
    return null;
}

export const searchTasks = async (name) => {
    console.log("In searchTasks function")
    const requestBody = {
        'task_name' : name, 
        'token': TOKEN,
    };

    console.log('stringified request: ', JSON.stringify(requestBody));

    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    };

    try {
        let response = await fetch(API_URL + "searchTask", options);
        let json = await response.json();
        console.log('Search complete', json);

        return json.data;
        
    } catch (err) {
        console.error('Error while searching task.', err);
    }
    return null;
}

export const addImage = async (name,category,data) => {
    console.log("In addImage function")
    const requestBody = {
        'imageLabel':name,
        'category':category,
        'token': TOKEN,
        'imageData':data
    };
    console.log('stringified request: ', JSON.stringify(requestBody));
    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    };

    try {
        let response = await fetch(API_URL + "addImage", options);
        let json = await response.json();
        console.log('Image Added', json);
        return json.data;
    } catch (err) {
        console.error('Error while adding new image.', err);
    }
    return null;
}

export const listImages = async () => {
    console.log("In listImage function")
    const requestBody = {
        'token': TOKEN,
    };

    console.log('stringified request: ', JSON.stringify(requestBody));

    const options = {
        method: "POST",
        crossDomain: true,
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(requestBody)
    };

    try {
        let response = await fetch(API_URL + "listImages", options);
        let json = await response.json();
        console.log('Image List', json);
        return json.data;
    } catch (err) {
        console.error('Error while getting image list.', err);
    }
    return null;
}

export const masonryOptions = {
    fitWidth: true,
    columnWidth: 300,
    gutter: 5
  };