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

const saveJob = () => {

}

export { searchJobs, saveJob, getJobByID, getAllJobs } 