import 'bootstrap/dist/css/bootstrap.min.css'
import { searchJobs, saveJob, getJobByID } from './api/jobs'

/**
 * @type {HTMLFormElement}
 */
const jobForm = document.querySelector('#search-jobs-form')
/**
 * @type {HTMLTextAreaElement}
 */
const searchedJobref = document.querySelector('#query-input')
/**
 * @type {HTMLUListElement}
 */
const jobResultRef = document.querySelector('#searched-jobs')

jobForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    // Get input value and search
    searchedJob = searchedJobref.value.toLowerCase().trim()

    if (searchedJob !== '') {
        const data = await searchJobs(searchedJob)
        renderCards(data)
    } else {
        jobResultRef.innerHTML = ''
        jobResultRef.insertAdjacentHTML('beforeend', `
            <div class="text-dark">No Results Found</div>
        `)
    }
})

/**
 * 
 * @param {Array} data Array of jobs to display to the user
 */
function renderCards(data) {
    // Clear html and render new data
    jobResultRef.innerHTML = ''

    data.forEach((job) => {
        jobResultRef.insertAdjacentHTML('beforeend', `
        <li class="job-card card my-1" style="width: 18rem;">
        <div class="card-header">${job.company}</div>
        <div class="card-body">
            <h5 class="card-title">${job.title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${job.date_posted}</h6>
            <button class="btn btn-primary view-job-button" job-data-id="${job.id}">View Job</button>
        </div>
        </li>
        `)
    })

    // get list of all the buttons and attach an event listener foreach one
    const job = document.querySelectorAll('.view-job-button')

    job.forEach((j) => {
        j.addEventListener(('click'), async () => {
            test = await getJobByID(j.getAttribute('job-data-id'))
            console.log(test)
        })
    })
}

function renderJobView(job) {

}
