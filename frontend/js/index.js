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
    const searchedJob = searchedJobref.value.toLowerCase().trim()

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
            const job = await getJobByID(j.getAttribute('job-data-id'))
            renderJobView(job)
        })
    })
}

/**
 * 
 * @param {Object} job The job to render on the side view
 */
function renderJobView(job) {
    const jobDetailsCardRef = document.querySelector("#job-details-card")

    jobDetailsCardRef.innerHTML = ''
    jobDetailsCardRef.insertAdjacentHTML('beforeend', `
            <div class="card">
            <div class="card-body">
                <h3 class="card-title">${job.title}</h5>
                <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company}</h6>
                <h6 class="card-subtitle mb-2 text-body-secondary ">${job.location}</h6>
                <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${job.date_posted}</h6>
            
                <h5 class="card-subtitle mb-2">Description</h5>
                <p class="card-text">${job.description}</p>
                <h5 class="card-subtitle mb-2">Qualifications</h5>
                <p class="card-text">${job.qualifications}</p>
                <button class="btn btn-success save-job">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                </svg>
                Save Job
                </button>
            </div>
            </div>`
    )
}
