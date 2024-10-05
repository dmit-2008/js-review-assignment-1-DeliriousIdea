// your code goes here.

const searchJobs = async (searchedJob) => {
    // const req = await fetch(`http://localhost:3000/jobs?search=${searchedJob}`)
    let data
    try {
        const req = await fetch(`http://localhost:3000/jobs?q=${searchedJob}`)
        data = await req.json()
    } catch (e) {
        console.log(e)
    }

    console.log(data)
    return data
}

export { searchJobs } 