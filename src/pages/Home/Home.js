import React from 'react';

import HomePageTheme from "../../component/HomePageTheme/HomePageTheme";
import CarouselImageSlider from "../../component/CarouselImageSlider/CarouselImageSlider";
import SliderBrands from "../../component/SliderBrands/SliderBrands";
import SliderCards from "../../component/PerfumeCardsSlider/PerfumeCardsSlider";
import { JobPostServiceIml } from '../../actions/user-actions';
import { useState, useEffect } from 'react';
import HotJobs from "./HotJobs";


const Home = () => {
    const [jobs, setJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    useEffect(() => {
        JobPostServiceIml.getAllJobPosts().then((response) => {
            if (response.data.resp === 1) {
                console.log(response);
                setJobs(response.data.hot_jobs);
                setLoading(false);
            }
        })
            .catch((error) => {
                console.log(error);
            });
    }, [])

    return (
        <div>
            {/* <CarouselImageSlider/> */}
            {/* <SliderBrands /> */}
            {/* <HomePageTheme /> */}
            {/* <SliderCards /> */}
            {/* <JobBoxSm/> */}
            {!loading ? (
                <HotJobs jobs={jobs} />
            ) : (
                <div className="text-center  mt-5">
                    <div className="spinner-grow" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <h6 className="mt-1">Loading... </h6>
                </div>
            )}
        </div >
    );
}

export default Home;
