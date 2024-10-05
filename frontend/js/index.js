import 'bootstrap/dist/css/bootstrap.min.css'
import { searchJobs } from './api/jobs'

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
    }
})

/**
 * 
 * @param {Array} data Array of data to render
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
//  <li class="job-card card my-1" style="width: 18rem;">
//   <div class="card-header">JOB COMPANY HERE</div>
//   <div class="card-body">
//     <h5 class="card-title">JOB TITLE HERE</h5>
//     <h6 class="card-subtitle mb-2 text-body-secondary">JOB LOCATION HERE</h6>
//     <h6 class="card-subtitle mb-2 text-body-secondary">Posted FORMATTED JOB DATE HERE</h6>
//     <button class="btn btn-primary view-job-button" job-data-id="JOB ID HERE">View Job</button>
//   </div>
// </li>       
}