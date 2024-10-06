// your code goes here.
const endpoint = 'http://localhost:3000'

const searchJobs = async (searchedJob) => {
    // const req = await fetch(`http://localhost:3000/jobs?search=${searchedJob}`)
    let data
    try {
        const req = await fetch(`${endpoint}/jobs?q=${searchedJob}`)
        data = await req.json()
    } catch (e) {
        console.log(e)
    }

    return data
}

const getJobByID = async(jobID) =>  {
    let data
    try {
        const req = await fetch(`${endpoint}/jobs/${jobID}`)
        data = await req.json()
    } catch (e) {
        console.log(e)
    }

    return data
}

const getAllJobs = async() => {
    let data
    try {
        const req = await fetch(`${endpoint}/jobs`)
        data = await req.json()
    } catch (e) {
        console.log(e)
    }

    return data
}

/* Fix */
const saveJob = async (jobID) => {
    let data
    try {
        const req = await fetch(`${endpoint}/saved-jobs`, {
            method: 'POST',
            body: JSON.stringify({
                "jobId": jobID
            })
        })
        data = await req.json()
    } catch (e) {
        console.log(e)
    }
    console.log(data)
}

const getSavedJobs = async () => {
    let data
    /**
     * @type {Array}
     */
    let result
    try {
        const req = await fetch(`${endpoint}/saved-jobs`)
        data = await req.json()
        data.forEach(async (job) => {
            const response = await getJobByID(job.jobId)
            result.push(response)
        })
    } catch (e) {
        console.log(e)
    }

    console.log(data)
    return result
}

export { searchJobs, saveJob, getJobByID, getAllJobs, getSavedJobs } 