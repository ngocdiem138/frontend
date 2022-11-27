import {Router} from "@reach/router"
import React from 'react';
import JobDetails from "./job-details"

const Groups = () => (
    <div>
        <Router>
            <JobDetails path="/groups/:id" />
        </Router>
    </div>
)

export default Groups